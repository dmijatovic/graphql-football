

const { buildSchema } = require('graphql');

const apiFb = require('./football.api');

module.exports = {
  /**
   * GraphQL schema
   */
  schema: buildSchema(`

  type Player {
    id: Int
    name: String
    position: String
    jerseyNumber: Int
    dateOfBirth: String
    nationality: String
    contractUntil: String
    marketValue: String
  }

  type Players {    
    count: Int
    players: [Player] 
  }
  
  type Result {
    goalsHomeTeam: Int
    goalsAwayTeam: Int
  }  

  type Fixture {
    date: String
    status: String
    matchday: Int
    homeTeamName: String
    awayTeamName: String    
    odds: Float
    result: Result
  }

  type Fixtures {
    season: String
    count: Int
    fixtures: [Fixture] 
  }

  type Standing {
    position: Int!
    teamName: String    
    playedGames: Int
    points: Int!
    goals: Int!
    goalsAgainst: Int
    goalDifference: Int
    wins: Int!
    draws: Int!
    losses: Int!
  }

  type Standings {
    leagueCaption: String
    matchday: Int
    standing: [ Standing ]
  }
    
  type Team {
    code: String
    shortName: String
    name: String
    squadMarketValue: Float
    crestUrl: String
  }

  type Teams {
    competition: Int!
    count: Int
    team: [ Team ]
  }

  type Competition {
    id: Int!
    caption: String 
    league: String
    year: String
    currentMatchday: Int
    numberOfMatchdays: Int
    numberOfTeams: Int
    numberOfGames: Int
    lastUpdated: String     
  }

  type Query {
    getCompetitions: [ Competition ]     
    getCompetition (id: Int!): Competition 
    getLeagueTable (id: Int!, matchday: Int): Standings
    getTeams (id: Int!): Teams    
    getTeam (tid: Int!): Team 
    getFixturesByTeam (tid: Int!): Fixtures
    getPlayersByTeam (tid: Int!): Players
  }`),
  /**
   * GrpahQL root resolver
   */
  root:{ 

    getCompetitions: ({season}) => {
      return apiFb.getCompetions(season);
    },

    getCompetition: ({id})=>{
      return apiFb.getCompetion(id);
    },

    getLeagueTable ({id, matchday}){
      return apiFb.getLeagueTable(id, matchday);
    },

    getTeams: ({id})=>{
      return apiFb.getTeams(id);
    },
    
    getTeam: ({tid})=>{
      return apiFb.getTeam(tid);
    },

    getFixturesByTeam: ({tid}) =>{
      return apiFb.getFixturesByTeam(tid);
    },

    getPlayersByTeam: ({tid}) =>{
      return apiFb.getPlayersByTeam(tid);
    }


  }
}
