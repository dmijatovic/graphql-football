const { 
  buildSchema,
  GraphQLSchema, 
  GraphQLObjectType,
  GraphQLList, 
  GraphQLInt,
  GraphQLString,  
} = require('graphql');



const RootQuery = 



/**
 * Export graphQL schema
 */
module.exports = new GraphQLSchema({
  query: RootQuery 
});
