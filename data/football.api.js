
const axios = require ('axios');
//const { URL, URLSearchParams } = require('url');
const football = require('./.football');

const apiFb = {  

  getCompetions: (season, select=[])=> {    
    //let url = new URL(football.api.competitions);
    let url = football.api.competitions;
    //console.log("apiFb.getCompetitions...url...", url );
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
        //console.log("select...", select);             
        //resolve data
        if (select.length==0){
          //return all
          data = resp.data;
        } else {
          //return selection
          resp.data.map((item)=>{
            if (select.includes(item.id)){
              data.push(item);
            }
          });
        }
        res(data);
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

  getLeagueTable2: (id, matchday = null )=> {            
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
        let teams=[];
        resp.data.standing.map((item)=>{          
          //console.log("item...", item);              
          //we need to extract id from links object!        
          let url = item._links.team.href.split("/");
          let id = url[url.length-1];          
          //console.log("teamId...", id);              
          teams.push({
            position: item.position,
            teamId: id,
            teamName: item.teamName,
            crestURI: item.crestURI,
            playedGames: item.playedGames,
            points: item.points,
            goals: item.goals,
            goalsAgainst: item.goalsAgainst,
            goalDifference: item.goalDifference,
            wins: item.wins,
            draws: item.draws,
            losses: item.losses,
            home: item.home,
            away: item.away
          });
        })
        //console.log(resp.data);              
        res({
          league: resp.data.leagueCaption,
          matchday: resp.data.matchday,
          standing: teams 
        });
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

  getTeams2: (id)=> {    
    //let url = new URL(football.api.competitions);
    let url = football.api.competitions + id + "/teams";
    //console.log( url )    
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: football.header
      })
      .then((resp)=>{        
        //console.log("getTeams2...", resp.data)        
        let teams=[];
        resp.data.teams.map((team)=>{
          //we need to extract id from links object!        
          let url = team._links.self.href.split("/");
          let id = url[url.length-1];
          //console.log("teamid...", id);
          teams.push({
            id: id,
            shortName: team.shortName,
            name: team.name,
            squadMarketValue: team.squadMarketValue,
            crestUrl: team.crestUrl
          });
        });  
        //resolve teams 
        res( teams );
      })
      .catch((e)=>{
        rej(e);
      });        
    });
  },

  getTeam: (tid)=>{    
    let url = football.api.teams + tid;
    
    //console.log( url )    
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: football.header
      })
      .then((resp)=>{        
        //add team id
        resp.data['id'] = tid;
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
  },

  getPlayersByTeam2: (tid)=>{    
    let url = football.api.teams + tid + "/players";
    
    //console.log( url )    
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: football.header
      })
      .then((resp)=>{        
        //console.log(resp.data)
        res(resp.data.players);
      })
      .catch((e)=>{
        rej(e);
      });        
    })    
  },
  /**
   * Get fixtures by team id (tid)
   * note! default parameter values are empty strings - required by football.org api
   * @param season:number
   * @param nday:string number of days from today, n1=today, n7=next 7 days, p3=past 3 days
   * @param venue:string home | away 
   */
  getFixturesByTeam: (tid, season="", nday="n7", venue="")=>{    
    let url = football.api.teams + tid + "/fixtures";
    
    //console.log( url )    
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: football.header,
        params:{
          season: season,
          timeFrame: nday,
          venue: venue 
        }
      })
      .then((resp)=>{        
        //console.log(resp.data);
        res(resp.data);
      })
      .catch((e)=>{
        rej(e);
      });        
    })    
  },
  /**
   * Get fixtures by days from today for all leagues
   * @param nday:string number of days from today, n1=today, n7=next 7 days, p3=past 3 days
   * @param league:string prop -> competition.league -> filter fixtures
   */
  getFixturesByPeriod: (nday="n7",league="")=>{    
    let url = football.api.fixtures;    
    //console.log( url )    
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: football.header,
        params:{
          timeFrame: nday,
          league: league  
        }
      })
      .then((resp)=>{        
        //console.log(resp.data);
        res(resp.data);
      })
      .catch((e)=>{
        rej(e);
      });        
    })    
  },
  /**
   * Get head2head stat for n 
   * @param fix:number fixtureId
   * @param h2h: number of historical games to analyse, default=5
   */
  getHead2Head: (fid, h2h=5)=>{
    let url = football.api.fixtures + fid;
    //console.log("Head2Head...url...", url);    
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: football.header,
        params:{
          head2head: h2h
        }
      })
      .then((resp)=>{        
        //console.log(resp.data.head2head);
        res(resp.data.head2head);
      })
      .catch((e)=>{
        rej(e);
      });        
    })
  }

}

module.exports = apiFb; 

