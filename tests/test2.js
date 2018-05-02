
const express = require('express');
const graphqlHTTP = require('express-graphql');

const { buildSchema } = require('graphql');


//GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
    random: Int
    dice: [Int]
    decimals: Float
    toggle(preVal:Boolean!): Boolean
  }
`);

//GraphQL resolver
const root = {
  hello: ()=>{
    return 'Hello world'
  },
  random: ()=>{
    return Math.round (Math.random() * 100);
  },
  dice: ()=>{
    return [1,2,3,4,5,6];
  },
  decimals: ()=>{
    return Math.random();
  },
  // use destructuring of args
  // to catch param more clearly
  toggle: ({preVal}) => {
    if (preVal){
      return !preVal 
    }else{
      return true;
    }    
  }
}


//const schema = require('./schemas/rootQL');
const api = express();
/**
 * GraphQL api route
 */
api.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql:true
}));

/**
 * root path at the END otherwise will not let other match
 */
api.use('/',(req,res)=>{
  res.send(`
    <h1>It works...</h1>
    <p>
      But you probably want to go to <a href="/api">GraphiQL</a>
    </p>
  `);
});


api.listen(4001,()=>{
  console.log("Api listens on port...4001");
});
