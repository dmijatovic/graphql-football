
const { 
  GraphQLSchema, 
  GraphQLObjectType,
  GraphQLList, 
  GraphQLInt,
  GraphQLFloat,
  GraphQLString  
} = require('graphql');

//api scripts
const apiFb = require('../data/football.api');
const apiWiki = require('../data/wikipedia.api');
const apiTwitter = require('../data/twitter.api');
const apiYoutube = require('../data/youtube.api');

//GraphQL defs

const competitionType = require('./football/competitionType');
const teamType = require('./football/teamType');
const playerType = require('./football/playerType');
const leagueTableType = require('./football/leagueTableType');
const fixtureListType = require('./football/fixtureListType');

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
    },
    teams:{
      type: new GraphQLList(teamType),
      args:{
        id: {type: GraphQLInt}  
      },
      resolve(parent,args){       
        return apiFb.getTeams2(args.id);      
      }
    },
    team:{
      type: teamType,
      args:{
        tid: {type: GraphQLInt}  
      },
      resolve(parent,args){       
        return apiFb.getTeam(args.tid);      
      }
    },
    players:{
      type:  new GraphQLList(playerType),
      args:{
        tid: {type: GraphQLInt}  
      },
      resolve(parent,args){       
        return apiFb.getPlayersByTeam2(args.tid);      
      }
    },
    leagueTable:{
      type: leagueTableType,
      args:{
        id: {type: GraphQLInt}  
      },
      resolve(parent, args){
        return apiFb.getLeagueTable2(args.id);
      }
    },
    fixturesByPeriod:{
      type: fixtureListType,
      args:{
        nday:{type: GraphQLString},    
        league:{type: GraphQLString}        
      },
      resolve(parent,args){
        return apiFb.getFixturesByPeriod(
          args.nday,args.league
        );
      }
    },
    fixturesByTeam:{
      type: fixtureListType,
      args:{
        //teamId
        tid: {type: GraphQLInt},    
        season:{type: GraphQLInt},    
        nday:{type: GraphQLString},
        venue:{type: GraphQLString}        
      },
      resolve(parent,args){
        return apiFb.getFixturesByTeam(
          args.tid, args.season,
          args.nday,args.venue
        );
      }
    }
  }  
})

module.exports = {
  rootQuery: new GraphQLSchema({
    query: rootQuery
  })
}


