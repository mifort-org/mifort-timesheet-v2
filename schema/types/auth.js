module.exports = `
    directive @auth(
        requires: Role,
    ) on OBJECT | FIELD_DEFINITION
`;
