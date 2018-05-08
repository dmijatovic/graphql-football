
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
    },
    nextRound:{
      type: fixtureListType,      
      resolve(parent,args){
        return apiFb.getFixturesByPeriod(
          null, parent.league
        );
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

const head2headType = new GraphQLObjectType({
  name:"head2head",
  fields:()=>({
    count: { type: GraphQLInt },
    timeFrameStart: { type: GraphQLString },
    timeFrameEnd: { type: GraphQLString },
    homeTeamWins: { type: GraphQLInt },
    awayTeamWins: { type: GraphQLInt },
    draws: { type: GraphQLInt },
  })
})

const fixtureResult=new GraphQLObjectType({
  name:"fixtureResult",
  fields:()=>({
    goalsHomeTeam: { type: GraphQLInt },
    goalsAwayTeam: { type: GraphQLInt }        
  })
})

const fixtureType = new GraphQLObjectType({
  name:"fixture",
  fields:()=>({
    fixtureId: { type: GraphQLInt },
    competitionId: { type: GraphQLInt },        
    date: { type: GraphQLString },
    status: { type: GraphQLString },
    matchday: { type: GraphQLInt },        
    homeTeamId: { type: GraphQLInt },
    homeTeamName: { type: GraphQLString },
    awayTeamId: { type: GraphQLInt },
    awayTeamName: { type: GraphQLString },
    result: { type: fixtureResult },
    head2head: {
      type: head2headType,
      args:{
        count:{type: GraphQLInt}  
      },
      resolve(parent, args){
        return apiFb.getHead2Head(
          parent.fixtureId, args.count 
        )
      }
    }
  })
});

const fixtureListType = new GraphQLObjectType({
  name:"fixtureList",
  fields:()=>({
    timeFrameStart: { type: GraphQLString },
    timeFrameEnd: { type: GraphQLString },
    count: { type: GraphQLInt },
    fixtures: {
      type: new GraphQLList (fixtureType),
      resolve(parent){
        //console.log("extract parent", parent);
        let games=[];
        parent.fixtures.map((item)=>{
          //console.log("fixtures...", item);
          let url,fid,cid,hid,aid;
          //we need to extract id from links object!        
          url = item._links.self.href.split("/");
          fid = url[url.length-1];
          if (item._links.competition){
            url = item._links.competition.href.split("/");
            cid = url[url.length-1];
          }
          if (item._links.homeTeam){
            url = item._links.homeTeam.href.split("/");
            hid = url[url.length-1];
          }
          if (item._links.awayTeam){
            url = item._links.awayTeam.href.split("/");
            aid = url[url.length-1];
          }          
          games.push({
            ...item,
            fixtureId: fid,
            competitionId: cid,
            homeTeamId: hid,
            awayTeamId: aid 
          });
        });
        return games;
      }
    }
  })
})

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


