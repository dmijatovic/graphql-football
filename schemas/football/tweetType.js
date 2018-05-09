
const {   
  GraphQLObjectType,  
  GraphQLInt,  
  GraphQLString  
} = require('graphql');


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
module.exports = tweetType;