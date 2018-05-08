
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
const apiTwitter = require('../data/twitter.api');
const apiYoutube = require('../data/youtube.api');

const youtubeType =  new GraphQLObjectType({
  name: "youtube",
  fields:()=>({    
    linkId: {type: GraphQLString}, 
    publishedAt: {type: GraphQLString},
    channelId: {type: GraphQLString},
    channelTitle: {type: GraphQLString},
    title: {type: GraphQLString},
    desc: {type: GraphQLString},
    thumb120x90: {type: GraphQLString},
    thumb320x180: {type: GraphQLString},
  })
})

const tweetType = new GraphQLObjectType({
  name: "tweet",
  fields:()=>({    
    createdAt: {type: GraphQLString},
    id: {type: GraphQLString},
    text:{type: GraphQLString},
    userName:{type: GraphQLString},
    userLocation: {type: GraphQLString},
    followers: {type: GraphQLInt}  
  })
})

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
    marketValue: {type: GraphQLString },
    tweets:{
      type: new GraphQLList (tweetType),      
      resolve(parent){        
        return apiTwitter.search(parent.name);
      }
    },
    youtube: {
      type: new GraphQLList (youtubeType),      
      resolve(parent){        
        return apiYoutube.searchVideos(parent.name);
      }
    }
  })
});

const teamType = new GraphQLObjectType({
  name: "team",
  fields:()=>({
    id: { type: GraphQLInt },  
    code: {type: GraphQLString },   
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
    },
    tweets:{
      type: new GraphQLList (tweetType),      
      resolve(parent){        
        return apiTwitter.search(parent.name);
      }
    },
    youtube:{
      type: new GraphQLList (youtubeType),      
      resolve(parent){        
        return apiYoutube.searchVideos(parent.name);
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
        let pos = parent.caption.indexOf(parent.year)
          //remove year from bane
          n = parent.caption.slice(0, pos-1);
        return n;
      }
    },
    wiki:{
      type: competitionWiki,
      resolve(parent){
        //find year in caption
        let pos = parent.caption.indexOf(parent.year)
          //remove year from bane
          name = parent.caption.slice(0, pos-1);
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

const teamStat = new GraphQLObjectType({
  name:'teamStat',
  fields:()=>({
    goals: { type: GraphQLInt },    
    goalsAgainst: { type: GraphQLInt },    
    wins: { type: GraphQLInt },    
    draws: { type: GraphQLInt },    
    losses: { type: GraphQLInt }
  })
})

const standingType = new GraphQLObjectType({
  name:"standing",
  fields:()=>({
    position:{ type: GraphQLInt },    
    teamId: { type: GraphQLInt },
    teamName: { type: GraphQLString },    
    playedGames: { type: GraphQLInt },
    crestURI: { type: GraphQLString },
    points: { type: GraphQLInt },
    goals: { type: GraphQLInt },
    goalsAgainst: { type: GraphQLInt },
    goalDifference: { type: GraphQLInt }, 
    wins: { type: GraphQLInt },   
    draws: { type: GraphQLInt }, 
    losses: { type: GraphQLInt },
    home: {type: teamStat},
    away: {type: teamStat}
  })
});

const leagueTableType = new GraphQLObjectType({
  name:"leagueTable",
  fields:()=>({
    league: { type: GraphQLString },
    matchday: { type: GraphQLInt },
    standing: {
      type: new GraphQLList(standingType)      
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
    }
  }  
})


module.exports = {
  rootQuery: new GraphQLSchema({
    query: rootQuery
  })
}


