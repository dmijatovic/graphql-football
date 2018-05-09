
const {   
  GraphQLObjectType,  
  GraphQLInt,  
  GraphQLString,
  GraphQLList
} = require('graphql');

const apiTwitter = require('../../data/twitter.api');
const apiYoutube = require('../../data/youtube.api');

const tweetType = require('./tweetType');
//const youtubeType = require('./youtubeType');
const youtubeQL = require("./youtubeQL");

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
    youtube: youtubeQL
  })
})
module.exports = playerType;