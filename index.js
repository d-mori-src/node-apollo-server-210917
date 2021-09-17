const { ApolloServer, gql } = require("apollo-server");

// スキーマを定義する
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String
        posts: [Post!]
    }

    type Post {
        postId: ID!
        title: String!
        published: Boolean!
        url: String
        author: User!
    }

    type Query {
        users: [User!]!,
        user(id: Int!): User!
    }
`;

// クエリで取得するデータを定数で置いておく
const users = [
    {
        id: 0,
        name: 'Daisuke Mori',
        email: 'let__it__be@hb.tp1.jp',
        posts: [
            { postId: 0, title: 'Hello GraphQL', published: true, url: 'https://example.com' },
            { postId: 1, title: 'Hello Express', published: true, url: 'https://example.com' },
        ]
    },
    {
        id: 1,
        name: 'Taro Yamada',
        email: 'example@example.com',
        posts: [
            { postId: 2, title: 'Hello World', published: true, url: 'https://example.com' },
        ]
    },
];

// booksクエリ発行時の処理を指定する
const resolvers = {
    Query: {
        users: () => users,
        user: (parent, { id }) => users[id] || null,
    }
};

// サーバーを起動する
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});