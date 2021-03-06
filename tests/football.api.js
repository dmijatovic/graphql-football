
const axios = require ('axios');
const { URL, URLSearchParams } = require('url');

const football={
  header:{
    "X-Auth-Token": ""
  },
  api:{
    competitions:"http://api.football-data.org/v1/competitions/",
    teams: "http://api.football-data.org/v1/teams/"
  }  
}

const apiFb = {  

  getCompetions: (season)=> {    
    //let url = new URL(football.api.competitions);
    let url = football.api.competitions;
    //console.log( url )    
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: football.header,
        params:{
          season: season 
        } 
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
    })    
  },

  getCompetion: (id)=> {    
    //let url = new URL(football.api.competitions);
    let url = football.api.competitions + id + "/";
    //console.log( url )    
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: football.header
      })
      .then((resp)=>{
        let item=resp.data;              
        res(resp.data);
      })
      .catch((e)=>{
        rej(e);
      });        
    })    
  },

  getLeagueTable: (id, matchday = null )=> {            
    let url = football.api.competitions + id + "/leagueTable";
    //console.log( url )    
    let headers={
      headers: football.header,      
    }
    //add matchday to headers
    if (matchday){
      headers['params'] = {
        matchday: matchday
      }     
    }
    //return new promise
    return new Promise((res,rej)=>{
      axios.get(url, headers)
      .then((resp)=>{        
        //console.log(resp.data);              
        res(resp.data);
      })
      .catch((e)=>{
        rej(e);
      });        
    })    
  },


  getTeams: (id)=> {    
    //let url = new URL(football.api.competitions);
    let url = football.api.competitions + id + "/teams";
    //console.log( url )    
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: football.header
      })
      .then((resp)=>{
        let item=resp.data;              
        res({
          competition: id,
          count: resp.data.count, 
          team: resp.data.teams          
        });
      })
      .catch((e)=>{
        rej(e);
      });        
    })    
  },

  getTeam: (tid)=>{    
    let url = football.api.teams + tid;
    
    //console.log( url )    
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: football.header
      })
      .then((resp)=>{        
        //console.log(resp.data)
        res(resp.data);
      })
      .catch((e)=>{
        rej(e);
      });        
    })    
  },

  getFixturesByTeam: (tid)=>{    
    let url = football.api.teams + tid + "/fixtures";
    
    //console.log( url )    
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: football.header
      })
      .then((resp)=>{        
        //console.log(resp.data)
        res(resp.data);
      })
      .catch((e)=>{
        rej(e);
      });        
    })    
  },

  getPlayersByTeam: (tid)=>{    
    let url = football.api.teams + tid + "/players";
    
    //console.log( url )    
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: football.header
      })
      .then((resp)=>{        
        //console.log(resp.data)
        res(resp.data);
      })
      .catch((e)=>{
        rej(e);
      });        
    })    
  }

}

module.exports = apiFb; 
/*
apiFb.getCompetions("2017").then((d)=>{
  console.log(d);
});

apiFb.getCompetion(445).then((d)=>{
  console.log(d);
})

apiFb.getLeagueTable(445).then((d)=>{
  console.log(d);
})
apiFb.getTeam(6).then((d)=>{
  console.log(d);
})
apiFb.getPlayersByTeam(6).then((d)=>{
  console.log(d);
})
*/

