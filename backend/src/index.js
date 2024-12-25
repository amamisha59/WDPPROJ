const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Local module imports
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { default: mongoose } = require('mongoose');

const app = express();

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;

// Connect to MongoDB Atlas
const url = process.env.URI;
const connectDB = async () => {
    try {
        await mongoose.connect(url, {
           
        });
        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

connectDB();

// get the user info from a JWT
const getUser = token => {
    if (token) {
        try {
            // Remove 'Bearer ' from token
            const tokenWithoutBearer = token.replace('Bearer ', '');
            return jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        } catch (err) {
            console.error('Token verification error:', err);
            return null;
        }
    }
    return null;
};

// Apollo Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Get the user token from the headers
        const token = req.headers.authorization || '';
        // Try to retrieve a user with the token
        const user = getUser(token);
        // Add the user to the context
        return { models, user };
    }
});

async function startServer() {
    await server.start();
    // Apply the Apollo GraphQL middleware and set the path to /api
    server.applyMiddleware({ app, path: '/api' });
    app.listen({ port }, () =>
        console.log(
            `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
        )
    );
}

// Start server
startServer().catch(error => {
    console.error('Error starting server:', error);
});