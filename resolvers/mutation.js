const { User, Company, Project, TimesheetRecord, Notification } = require('../data/models');

module.exports = {
    async signUp(_, data, ctx) {
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
    }
};
