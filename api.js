const express = require('express');

const graphqlHTTP = require('express-graphql');
const schema = require('./schemas/schemaQL');

const api = express();


/**
 * GraphQL api route
 */
api.use('/api', graphqlHTTP({
  schema: schema,
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
