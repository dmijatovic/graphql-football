
const {   
  GraphQLObjectType,  
  GraphQLInt,  
  GraphQLString  
} = require('graphql');

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
module.exports = youtubeType;