
const { buildSchema } = require('graphql');
// Maps username to content
var fakeDatabase = {};

// If Message had any complex fields, we'd put them on this object.
class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

module.exports = {
  /**
   * GraphQL schema
   */
  schema: buildSchema(`
    input MessageInput {
      content: String
      author: String
    }

    type Message {
      id: ID!
      content: String
      author: String
    }

    type Query {
      getMessage(id: ID!): Message
    }

    type Mutation {
      createMessage(input: MessageInput): Message
      updateMessage(id: ID!, input: MessageInput): Message
    }
  `),
  /**
   * GrpahQL root resolver
   */
  root:{
    getMessage: function ({id}) {
      if (!fakeDatabase[id]) {
        throw new Error('no message exists with id ' + id);
      }
      return new Message(id, fakeDatabase[id]);
    },
    createMessage: function ({input}) {
      // Create a random id for our "database".
      var id = require('crypto').randomBytes(10).toString('hex');
  
      fakeDatabase[id] = input;
      return new Message(id, input);
    },
    updateMessage: function ({id, input}) {
      if (!fakeDatabase[id]) {
        throw new Error('no message exists with id ' + id);
      }
      // This replaces all old data, but some apps might want partial update.
      fakeDatabase[id] = input;
      return new Message(id, input);
    },   
  }
}

/* 
  GraphiQL syntax for this example 

# mutation {
#	createMessage(input:{
#      content:"This is my message"
#      author:"I am the author"
#  }){
#    id
#  }
#}
#
# query{
#  getMessage(id:"a2d9e22ecfaa307cf452"){
#    author 
#    content    
#  }
#}

*/
