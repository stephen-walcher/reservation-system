// Import some GraphQl tools
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

// Import Reservation db connector
import { Reservation } from '../connectors';

const resolvers = {
    Query: {
        // Resolver function to get all reservations
        // TODO: Create controller to combine this call with the REST endpoint call to de-dupe code
        reservations: async () => {
            return await Reservation.find({}).exec();;
        },
        // Resolver function to get a reservation record by ID
        // TODO: Create controller to combine this call with the REST endpoint call to de-dupe code
        reservation: async (parent, { _id }) => {
            return await Reservation.findOne({ _id: _id }).exec();
        }
    },
    Mutation: {
        // Resolver function to create a new reservation
        // TODO: Create controller to combine this call with the REST endpoint call to de-dupe code
        createReservation: async (parent, fields) => {
            if ("arrivalDate" in fields) {
                fields["arrivalDate"] = new Date(fields["arrivalDate"]);
            }

            if ("departureDate" in fields) {
                fields["departureDate"] = new Date(fields["departureDate"]);
            }

            return await Reservation.create(fields);
        }
    },
    // Custom scalar type for Dates in MongoDB
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value; // value sent to the client
        },
        parseLiteral(ast) {
            return new Date(ast.value);
        }
    })
}

export default resolvers;
