const {
    User,
    Company,
    CompanyRole,
    Project,
    ProjectAssignment,
    Client,
    TimesheetRecord,
    Notification
} = require('../data/models');

const Role = require('../data/constants/roles');
const { Op } = require('sequelize');
const lodash = require('lodash');
const json2csv = require('json2csv').parse;
const S3 = require('../lib/S3');

const preferToCVS = function(records) {
    return records.map(val => {
        return lodash.mapKeys(val, (value, key) => {
            if (key === 'user.name') return 'employee name';
            if (key === 'project.name') return 'project name';
            return key;
        });
    });
};

const toCSVAndUploadToS3 = async function(records) {
    const fields = ['date', 'employee name', 'project name', 'hours', 'comment'];
    const opts = { fields };

    try {
        const csv = json2csv(records, opts);
        const result = await S3.uploadToS3(csv);
        return result.Location;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    me(_, args, { user }) {
        return User.findById(user.id);
    },
    companies(_, payload, { user }) {
        return Company.findAll({
            include: {
                model: CompanyRole,
                as: 'companyRoles',
                attributes: [],
                where: {
                    userId: user.id
                }
            }
        });
    },
    projects(_, { companyId }, { user }) {
        return Project.findAll({
            where: {
                companyId
            },
            include: {
                model: ProjectAssignment,
                as: 'projectAssignments',
                attributes: [],
                where: {
                    userId: user.id
                }
            }
        });
    },
    async users(_, { companyId }, { user }) {
        const { role } = await CompanyRole.findOne({
            where: {
                companyId,
                userId: user.id
            }
        });

        if (role === Role.OWNER || role === Role.RESOURCE_MANAGER) {
            return User.findAll({
                include: {
                    model: CompanyRole,
                    as: 'companyRoles',
                    attributes: [],
                    where: {
                        companyId
                    }
                }
            });
        } else if (role === Role.PROJECT_MANAGER) {
            const projectAssignments = await ProjectAssignment.findAll({
                where: {
                    userId: user.id
                }
            });
            const projectIds = projectAssignments.map(e => e.id);

            return User.findAll({
                where: {
                    id: {
                        [Op.ne]: user.id
                    }
                },
                include: {
                    model: ProjectAssignment,
                    as: 'projectAssignments',
                    attributes: [],
                    where: {
                        projectId: {
                            [Op.in]: projectIds
                        }
                    }
                }
            });
        }
    },
    clients(_, { companyId }) {
        return Client.findAll({ where: { companyId } });
    },
    timesheetRecords(_, { companyId }, { user }) {
        return TimesheetRecord.findAll({
            where: {
                companyId,
                userId: user.id
            }
        });
    },
    notifications(_, { companyId }) {
        return Notification.findAll({ where: { companyId } });
    },
    company(_, { id }) {
        return Company.findById(id);
    },
    project(_, { id }) {
        return Project.findById(id);
    },
    user(_, { id }) {
        return User.findById(id);
    },
    async timeSheetRecordsToCSV(_, { userId, projectId, startDate, endDate }) {
        const records = await TimesheetRecord.findAll({
            raw: true,
            where: {
                userId: userId,
                projectId: projectId,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [
                {
                    model: Project,
                    as: 'project',
                    attributes: ['name'],
                    where: {
                        id: projectId
                    }
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                    where: {
                        id: userId
                    }
                }
            ]
        });
        return toCSVAndUploadToS3(await preferToCVS(records));
    }
};
