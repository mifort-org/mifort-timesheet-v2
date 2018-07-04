const { SchemaDirectiveVisitor } = require('graphql-tools');
const { get } = require('lodash');
const { User } = require('../../data/models');

class AuthDirective extends SchemaDirectiveVisitor {
    visitObject(type) {
        this.ensureFieldsWrapped(type);
        type._requiredAuthRoles = this.args.requires;
        type._companyIdField = this.args.companyIdField;
        type._projectIdField = this.args.projectIdField;
        type._searchPath = this.args.searchPath;
    }

    visitFieldDefinition(field, details) {
        this.ensureFieldsWrapped(details.objectType);
        field._requiredAuthRoles = this.args.requires;
        field._companyIdField = this.args.companyIdField;
        field._projectIdField = this.args.projectIdField;
        field._searchPath = this.args.searchPath;
    }

    ensureFieldsWrapped(objectType) {
        if (objectType._authFieldsWrapped) return;
        objectType._authFieldsWrapped = true;

        const fields = objectType.getFields();

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const { resolve } = field;
            field.resolve = async function(...args) {
                const requiredRoles = field._requiredAuthRoles || objectType._requiredAuthRoles;
                const companyIdField = field._companyIdField || objectType._companyIdField;
                const projectIdField = field._projectIdField || objectType._projectIdField;
                const searchPath = field._searchPath || objectType._searchPath;
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
        });
    }
}

module.exports = AuthDirective;
