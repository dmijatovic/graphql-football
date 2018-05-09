
const {   
  GraphQLObjectType,  
  GraphQLInt,  
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType
} = require('graphql');

const apiFb =  require('../../data/football.api');
const apiTwitter = require('../../data/twitter.api');

const playerType = require('./playerType');
const tweetType = require('./tweetType');
const youtubeQL = require("./youtubeQL");

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
    youtube: youtubeQL
  })
})
module.exports = teamType;