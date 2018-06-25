const { SchemaDirectiveVisitor } = require('graphql-tools');
const { get } = require('lodash');
const { User } = require('../../data/models');

class AuthDirective extends SchemaDirectiveVisitor {
    visitObject(type) {
        this.ensureFieldsWrapped(type);
        type._requiredAuthRole = this.args.requires;
    }

    visitFieldDefinition(field, details) {
        this.ensureFieldsWrapped(details.objectType);
        field._requiredAuthRole = this.args.requires;
    }

    ensureFieldsWrapped(objectType) {
        if (objectType._authFieldsWrapped) return;
        objectType._authFieldsWrapped = true;

        const fields = objectType.getFields();

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const { resolve } = field;
            field.resolve = async function(...args) {
                const requiredRole = field._requiredAuthRole || objectType._requiredAuthRole;
                const [, payload, context] = args;

                if (context && !context.user) {
                    throw new Error('Not authorized');
                }

                if (requiredRole) {
                    const companyId = payload.companyId;
                    const user = User.findById(context.user.id);
                    if (!(await user.compareRole(companyId, requiredRole))){
                        throw new Error('Not authorized');
                    }
                }

                return resolve.apply(this, args);
            };
        });
    }
}

module.exports = AuthDirective;
