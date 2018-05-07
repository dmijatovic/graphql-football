

const Twitter = require('twitter-node-client').Twitter;
const config = require('./twitter_config');
const twitter = new Twitter(config);

/*
const twitter={
  cred:{
    basic: "cDYxN2lMZlJxRWhMdkZTS1RRTURsTVdnZjp6SFRPbEFSb2U5S2pXMWxmUzhKYjBoWkdGaGNnZmM4NmVMc3IyQ1dOYlp5T3lXN0hKTw=="
  },
  header:{
    "Api-User-Agent": "dv4all.com footbal demo",    
    "Authorization": null  
  },  
  api:{    
    oauth: 'https://api.twitter.com/oauth/access_token',
    search: "https://api.twitter.com/1.1/search/tweets.json" 
  }  
}*/

const apiTwitter = {  
  getToken: ()=>{
    let url = twitter.api.oauth;

    axios.post(url,{
      headers: {
        "Api-User-Agent": "dv4all.com footbal demo",    
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": "Basic " + twitter.cred.basic
      },
      data: "grant_type=client_credentials"
    })
    .then((resp)=>{
      let data=[];      
      //console.log(res.data);             
      //resolve data
      res(resp.data);
    })
    .catch((e)=>{
      rej(e);
    });        
  },  
  getTweets: (search)=>{
    return new Promise((res,rej)=>{         
      console.log("Find tweets...", search);
      res([{
        createdAt:'Now',
        id:"22343242",
        text: "This is tweet text",
        userName:"Mighty user",
        followers: 123123
      }])
    });
  },
  search: (search)=>{        
    //console.log( url );
    return new Promise((res,rej)=>{          

      let query = {'q':'#' + search,'count': 10}
      // Get 10 tweets containing the hashtag haiku
      twitter.getSearch( query, 
        (err)=>{          
          rej(err);
        }, 
        (data)=>{          
          let tweets=[], raw = JSON.parse(data);

          console.log("Tweets...", raw.statuses);
          
          raw.statuses.map((item)=>{              
            tweets.push({
              createdAt: item.created_at,
              id: item.id,
              text: item.text,
              userName: item.user.name,
              userLocation: item.user.location,
              followers: item.user.followers_count 
            })
          });
          
          console.log("Tweets...", tweets);
          res(tweets);
        }
      );
      /*
      axios.get(url,{
        headers: twitter.header
      })
      .then((resp)=>{        
        console.log("wiki search...", resp.data);
        let found=[], desc=[], url=[];
        //resolve data
        if (resp.data[1]){
          found = resp.data[1];
          desc = resp.data[2];
          url = resp.data[3];
        }        
        res({          
          title: found[0],
          desc: desc[0], 
          url: url[0]
        });
      })
      .catch((e)=>{
        rej(e);
      });*/
    })    
  }
}


module.exports = apiTwitter; 

