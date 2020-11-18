const typeDefs = `
type Token {
    originalToken: String
    token: String
    message: String
}

type Query {
    getCustomerToken: Token
}

type RevokeCustomerTokenOutput {
    result: Boolean
}

input internalCreateCustomerTokenInput {
    firstname: String
    lastname: String
    email: String
    password: String
    phonenumber: String
    is_subscribed: Boolean
    otp: String
    whatsapp_number: String
}

type internalGenerateSessionOutput {
    result: Boolean
    isLogin: Boolean
    cartId: String
    redirect_path: String
}

type internalDeleteSessionOutput {
    result: Boolean
}

type Mutation {
    internalGenerateCustomerToken(username: String!, password: String!): Token
    internalCreateCustomerToken(input: internalCreateCustomerTokenInput): Token
    internalGenerateCustomerTokenOtp(username: String!, otp: String!): Token
    internalDeleteCustomerToken: RevokeCustomerTokenOutput
    internalGenerateSession(state: String!): internalGenerateSessionOutput
    internalDeleteSession: internalDeleteSessionOutput
}
`;

module.exports = typeDefs;
