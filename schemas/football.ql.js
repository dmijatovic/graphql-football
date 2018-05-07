
const { 
  GraphQLSchema, 
  GraphQLObjectType,
  GraphQLList, 
  GraphQLInt,
  GraphQLFloat,
  GraphQLString  
} = require('graphql');

const apiFb = require('../data/football.api');
const apiWiki = require('../data/wikipedia.api');


const competitionWiki = new GraphQLObjectType({
  name: "wikipediaCompetitionInfo",
  fields:()=>({    
    title: {type: GraphQLString},
    desc: {type: GraphQLString},
    url:{type: GraphQLString}
  })
})

const playerType = new GraphQLObjectType({
  name: "player",
  fields:()=>({    
    name: {type: GraphQLString },
    position: {type: GraphQLString },
    jerseyNumber: {type: GraphQLInt },
    dateOfBirth: {type: GraphQLString },
    nationality: {type: GraphQLString },
    contractUntil: {type: GraphQLString },
    marketValue: {type: GraphQLString }
  })
});

const teamType = new GraphQLObjectType({
  name: "team",
  fields:()=>({
    id: { type: GraphQLInt },    
    shortName: {type: GraphQLString },
    name: {type: GraphQLString },
    squadMarketValue: {type: GraphQLFloat },
    crestUrl: {type: GraphQLString },
    players:{
      type: new GraphQLList (playerType),      
      resolve(parent){
        //console.log("parent...", parent);
        //console.log("args...", args);
        return apiFb.getPlayersByTeam2(parent.id);
      }
    }
  })
});

const competitionType = new GraphQLObjectType({
  name: "competition",
  fields:()=>({
    id: { type: GraphQLInt },
    caption: { type: GraphQLString },
    league: { type: GraphQLString },
    year: { type: GraphQLString },
    currentMatchday: { type: GraphQLInt }, 
    numberOfMatchdays: { type: GraphQLInt },
    numberOfTeams: { type: GraphQLInt },
    numberOfGames: { type: GraphQLInt },
    lastUpdated: { type: GraphQLString },
    name: {
      type: GraphQLString,
      resolve(parent){
        
      }
    },
    wiki:{
      type: competitionWiki,
      resolve(parent){
        //find year in caption
        let pos = parent.caption.indexOf(parent.year)
          //remove year from bane
          name = parent.caption.slice(0, pos);
        //console.log("Year in caption at...", pos);
        //console.log("Name...", name);
        //return name;
        return apiWiki.openSearch(name);
      }
    },
    teams: {
      type: new GraphQLList (teamType),      
      resolve(parent){
        //console.log("parent...", parent, args);
        //console.log("args...", args);
        return apiFb.getTeams2(parent.id);
      }
    }
  })
});


const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields:{ 
    competitions:{
      type: new GraphQLList(competitionType),
      args:{
        season: { type: GraphQLInt }
      },
      resolve(parent, args){
        return apiFb.getCompetions(args.season);
      }
    },
    competition: {
      type: competitionType,
      args:{
        id: { type: GraphQLInt }
      },
      resolve(parent, args){
        return apiFb.getCompetion(args.id);
      }
    } 
  }  
})


module.exports = {
  rootQuery: new GraphQLSchema({
    query: rootQuery
  })
}


