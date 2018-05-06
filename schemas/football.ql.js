
const { 
  GraphQLSchema, 
  GraphQLObjectType,
  GraphQLList, 
  GraphQLInt,
  GraphQLString  
} = require('graphql');




const competition = new GraphQLObjectType({
  name: "competition",
  fields:{
    id: { type: GraphQLInt },
    caption: { type: GraphQLString },
    league: { type: GraphQLString },
    year: { type: GraphQLString },
    currentMatchday: { type: GraphQLInt }, 
    numberOfMatchdays: { type: GraphQLInt },
    numberOfTeams: { type: GraphQLInt },
    numberOfGames: { type: GraphQLInt },
    lastUpdated: { type: GraphQLString }
  }
});

const competitionsType = new GraphQLObjectType({
  name: 'competitions',
  fields:{
    competitions:{
      type: new GraphQLList (competition)      
    }
  }
});


const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields:{ competitionsType }  
})


module.exports = {
  rootQuery: new GraphQLSchema({
    query: rootQuery
  })
}


