module.exports = `
    enum InvitationStatus {
        pending
        accepted
        declined
    }
  
    type Invitation {
        id: ID!
        email: String!
        status: InvitationStatus!
        role: Role
        company: Company
    }
`;
