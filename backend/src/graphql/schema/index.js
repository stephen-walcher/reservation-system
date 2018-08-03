// Import some GraphQl tools
import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes }           from 'merge-graphql-schemas';

// Import the Resolvers object
import resolvers from './resolvers';

// Import the base-level queries
import query from './types/query.gql';

// Merge query schema(s)
const typeDefs = mergeTypes([query]);

// Generate an executable schema object for use in Apollo Server
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
