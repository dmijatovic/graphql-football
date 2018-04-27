
//import fetch from 'node-fetch';
//import graphql from 'graphql';

//import football from './schemas/football.org';

/*
let url = 'http://api.football-data.org/v1/competitions';

//footbal.baseApi + football.competitions;

let c = fetch(url).then((resp)=>{
  //console.log(resp.json());
  return resp.json();
},(e)=>{
  console.error(e);
})
*/

const { 
  GraphQLSchema, 
  GraphQLObjectType,
  GraphQLList, 
  GraphQLInt,
  GraphQLString  
} = require('graphql');


/**
 * Competition graphQL object type definitions
 */

const CompetitionType = new GraphQLObjectType({
  name:'Competition',
  description:'Description of competition object type',
  fields: () => ({
    id: { GraphQLInt }, 
    name: { GraphQLString }
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'This is query description',    
  fields:{
    competitions:{
      type: new GraphQLList(CompetitionType),
      resolve(parent, args){
        return dummyCompetitions
      }
    },
    competition: {
      type: CompetitionType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args){
        //filter competition
        ({
          id: 1,
          name: "This is my name"
        })
      }
    } 
  }
});

/**
 * Export graphQL schema
 */
module.exports = new GraphQLSchema({
  query: RootQuery 
});


const dummyCompetitions=[{
  id: 123,
  name: "This is my name of 123"
},{
  id: 345,
  name: "This is my name of 345 "
},{
  id: 678,
  name: "This is my name 678"
}]