const { User, Company, CompanyRole, Project, TimesheetRecord, Notification } = require('../data/models');
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
        const company = await Company.create(data);
        await CompanyRole.create({
            userId: user.id,
            companyId: company.id,
            role: Role.OWNER
        });

        return company;
    }
};
