
const {   
  GraphQLEnumType
} = require('graphql');

const youtubeOrderType = new GraphQLEnumType({
  name:"YoutubeSearchOrder",
  values:{
    mostRecent5: {
      description:"show 5 most recent youtube videos about subject",
      value: "date"
    },
    mostViewed5: {
      description:"show 5 most viewed youtube videos about subject",
      value: "viewCount"
    }
  }
})
module.exports = youtubeOrderType;
