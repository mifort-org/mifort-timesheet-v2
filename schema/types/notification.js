module.exports = `
    enum NotificationLevel {
        info
        warning
        error
    }

    type Notification {
        id: ID!,
        message: String!
        level: NotificationLevel!
        isNew: Boolean!
    }
`;
