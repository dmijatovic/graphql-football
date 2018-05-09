
const {   
  GraphQLObjectType,  
  GraphQLInt,  
  GraphQLFloat,
  GraphQLString,
  GraphQLList
} = require('graphql');

const apiFb =  require('../../data/football.api');
const apiTwitter = require('../../data/twitter.api');
const apiYoutube = require('../../data/youtube.api');

const playerType = require('./playerType');
const tweetType = require('./tweetType');
const youtubeType = require('./youtubeType');

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
})
module.exports = teamType;