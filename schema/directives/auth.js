const { SchemaDirectiveVisitor } = require('graphql-tools');
const { User } = require('../../data/models');

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
        field._requiredAuthRoles = this.args.requires;
        field._companyIdField = this.args.companyIdField;
        field._projectIdField = this.args.projectIdField;
        field._searchPath = this.args.searchPath;

        const { resolve } = field;

        field.resolve = async function(...args) {
            const requiredRoles = field._requiredAuthRoles;
            const companyIdField = field._companyIdField;
            const projectIdField = field._projectIdField;
            const searchPath = field._searchPath;
            const [root, payload, context] = args;
            const source = {
                payload,
                root
            };

            if (context && !context.user) {
                throw new Error('Not authorized');
            }

            if (companyIdField) {
                const companyId = source[searchPath][companyIdField];
                const user = await User.findById(context.user.id);
                if (!(await user.checkCompanyConnection(companyId, requiredRoles))) {
                    throw new Error('Not authorized');
                }
            }

            if (projectIdField) {
                const projectId = source[searchPath][projectIdField];
                const user = await User.findById(context.user.id);
                if (!(await user.checkProjectConnection(projectId))) {
                    throw new Error('Not authorized');
                }
            }

            return resolve.apply(this, args);
        };
    }
}

module.exports = AuthDirective;
