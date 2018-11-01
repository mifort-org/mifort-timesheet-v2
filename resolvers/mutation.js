const { isEmpty } = require('lodash');

const {
    User,
    Company,
    CompanyRole,
    Project,
    ProjectAssignment,
    Client,
    TimesheetRecord,
    sequelize
} = require('../data/models');
const Role = require('../data/constants/roles');

module.exports = {
    async signUp(_, data) {
        const user = await User.create(data);
        user.token = user.generateToken();
        return user;
    },
    async logIn(_, { email, password }) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return new Error('User not found');
        }
        if (!(await user.comparePassword(password))) {
            return new Error('Invalid credentials');
        }

        user.token = user.generateToken();
        return user;
    },
    async createCompany(_, data, { user }) {
        return sequelize.transaction(async transaction => {
            const company = await Company.create(data, { transaction });
            await CompanyRole.create(
                {
                    userId: user.id,
                    companyId: company.id,
                    role: Role.OWNER
                },
                { transaction }
            );
            for (let owner of data.owners) {
                const user = await User.findOne({ where: { email: owner.email } });

                if (!isEmpty(user)) {
                    await CompanyRole.findOrCreate({
                        where: {
                            userId: user.id,
                            companyId: company.id
                        },
                        defaults: {
                            role: Role.OWNER
                        },
                        transaction
                    });
                } else {
                    // TODO: handle email invites
                }
            }

            return company;
        });
    },
    async createProject(_, data) {
        return sequelize.transaction(async transaction => {
            const [client] = await Client.findOrCreate({ where: data.client, transaction });

            data.clientId = client.id;

            const project = await Project.create(data, { transaction });

            for (let member of data.team) {
                const user = await User.findOne({ where: { email: member.email } });
                const companyUser = await CompanyRole.findOne({
                    where: { userId: user.id, companyId: data.companyId }
                });

                if (!isEmpty(companyUser)) {
                    await ProjectAssignment.findOrCreate({
                        where: {
                            userId: user.id,
                            projectId: project.id
                        },
                        defaults: {
                            hours: member.hours
                        },
                        transaction
                    });
                } else {
                    // TODO: handle email invites
                }
            }

            return project;
        });
    },
    createTimesheetRecord(_, data, { user }) {
        data.userId = user.id;
        return TimesheetRecord.create(data);
    }
};
