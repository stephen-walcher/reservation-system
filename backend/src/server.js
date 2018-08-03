// Import base Express & Node packages
import express from 'express';
import path from 'path';
import chalk from 'chalk';
import cors from 'cors';
import bodyParser from 'body-parser';

// Import Apollo packages
import { ApolloServer, gql } from 'apollo-server-express';

// Import Reservation db connector
import { Reservation } from './graphql/schema/connectors';

// Import GraphQL schema
import schema from './graphql/schema';

// Create base-level Express server
const app = express();

// Apply basic middleware
app.use(cors());
app.use(bodyParser.json());

// Create the Apollo Server
const server = new ApolloServer({ schema });

// Apply the Apollo Server to Express
server.applyMiddleware({ app });

// GET route for grabbing all reservations
// BONUS: Filtering is enabled by all possible returned fields if added to the query string
app.get('/reservations', async (req, res) => {
    // Initialize some variables
    let queryParams = {},
        reservations;

    // Merge some query variables in
    // (Setting this up to allow for merging if the initialized queryParams variable has items hard-coded in the future)
    queryParams = Object.assign(req.query, queryParams);

    // Format the Mongo query if "arrivalDate" is added as a filter
    if ("arrivalDate" in queryParams) {
        let arrivalDate = new Date(queryParams["arrivalDate"]);

        queryParams["arrivalDate"] = { "$gte": arrivalDate, '$lte': arrivalDate };
    }

    // Format the Mongo query if "departureDate" is added as a filter
    if ("departureDate" in queryParams) {
        let departureDate = new Date(queryParams["departureDate"]);

        queryParams["departureDate"] = { "$gte": departureDate, '$lte': departureDate };
    }

    // Get all reservations based on the provided filter
    try {
        reservations = await Reservation.find(queryParams).exec();

    } catch (error) {
        return res.status(500).json(error.message || error);
    }

    // Return the resultset
    return res.status(200).json(reservations);
});

// Get a reservation record based on an ID provided
app.get('/reservation/:reservationId', async (req, res) => {
    // Get the reservation record
    let reservation = await Reservation.findById(req.params.reservationId).exec();

    // Return the result
    return res.status(200).json(reservation);
});

// Create a new reservation record with information provided
app.post('/reservation', async (req, res) => {
    // Send the create request
    let newReservation = await Reservation.create(req.body);

    // Return the new Reservation object
    return res.status(200).json(newReservation);
});

// Start the Express server
app.listen({ port: 3000 }, () => {
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
});
