module.exports = `
    enum SearchPath {
        payload
        root
    }
    
    directive @auth(
        companyIdField: String
        projectIdField: String
        searchPath: SearchPath = payload
        requires: [Role]
    ) on OBJECT | FIELD_DEFINITION
`;
