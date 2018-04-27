
import fetch from 'node-fetch';

const header={
  "X-Auth-Token": "17f7832838f1432b809895e3c6b352a9"
}

module.exports = {
  baseApi:'http://api.football-data.org/v1/',
  competitions: 'competitions',
  
  getCompetition:(cid)=>{
    let url = this.baseApi + "competitions"
    return fetch(url,{
      method:"GET",
      headers: header
    }).then((resp)=>{
      return resp.json();
    });
  }
}; 

