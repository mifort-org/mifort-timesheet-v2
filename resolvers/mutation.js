const { isEmpty } = require('lodash');
const crypto = require('crypto');
const mailer = require('../lib/mailer');
const config = require('../config');
const TOKEN_EXPIRSE = 1000 * 60 * 60;

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

        if (!(await user.comparePassword(password))) {
            return new Error('Invalid credentials');
        }

        user.token = user.generateToken();
        return user;
    },
    async createCompany(_, data, { user }) {
        return sequelize.transaction(async transaction => {
            const company = await Company.create(data);
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
    },

    async resetPassword(_, { email }) {
        let user = await User.findOne({ where: { email } });
        if (user) {
            const token = crypto.randomBytes(64).toString('hex');
            await User.update({
                where: {
                    token,
                    tokenExpiresAdd: Date.now() + TOKEN_EXPIRSE
                }
            });
            let mailOptions = {
                from: config.mailer.address,
                to: user.email,
                subject: 'Password reset',
                text: `Сlick to reset your password: ${config.url}+/restore/password?token=+${token}`
            };
            mailer.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return new Error(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', mailer.getTestMessageUrl(info));
                return 'Please, check your email';
            });
        }
        return new Error('User not found');
    }
};
