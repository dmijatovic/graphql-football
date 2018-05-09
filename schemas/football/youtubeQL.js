
const {     
  GraphQLList  
} = require('graphql');

const apiYoutube = require('../../data/youtube.api');
const youtubeType = require('./youtubeType');
const youtubeOrderType = require('./youtubeOrderType');

const youtubeQL = {
  type: new GraphQLList (youtubeType),   
  args:{
    order:{ type: youtubeOrderType }
  },   
  resolve(parent, args){
    //console.log("youtube...args...", args);        
    return apiYoutube.searchVideos(parent.name, args.order);
  }
}
module.exports = youtubeQL;
