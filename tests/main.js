
/**
 * Require express and graphQL infra
 */
var express = require('express');
var graphqlHTTP = require('express-graphql');

/**
 * Requre specific schema and root resolver
 */
//var { schema, root } = require('./input');
var { schema, root } = require('./football.ql');

/**
 * Set up express server 
 */
var app = express();
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
/**
 * root path at the END otherwise will not let other match
 */
app.use('/',(req,res)=>{
  res.send(`
    <h1>It works...</h1>
    <p>
      But you probably want to go to <a href="/api">GraphiQL</a>
    </p>
  `);
});

app.listen(4001,()=>{
  console.log("Api listens on port...4001");
});
