module.exports = `
    directive @auth(
        companyIdField: String
        projectIdField: String
        requires: [Role]
    ) on OBJECT | FIELD_DEFINITION
`;
