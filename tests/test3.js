var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

// This class implements the RandomDie GraphQL type
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// The root provides the top-level API endpoints
var root = {
  getDie: function ({numSides}) {
    return new RandomDie(numSides || 6);
  }
}

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
