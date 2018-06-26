module.exports = `
    directive @auth(
        companyIdField: String
        requires: [Role]
    ) on OBJECT | FIELD_DEFINITION
`;
