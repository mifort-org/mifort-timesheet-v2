module.exports = {
    company(client) {
        return client.getCompany();
    },
    projects(client) {
        return client.getProjects();
    }
};
