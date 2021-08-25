const graphql = require("graphql");
const axios = require("axios");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;

//people Type

const PeopleType = new GraphQLObjectType({
  name: "People",
  fields: {
    name: { type: GraphQLString },
    height: { type: GraphQLString },
    mass: { type: GraphQLString },
    gender: { type: GraphQLString },
    homeworld: { type: GraphQLString }
  }
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    people: {
      type: GraphQLList(PeopleType),
      resolve(parentValue, args) {
        return axios
          .get(`http://swapi.dev/api/people`)
          .then(res => res.data.results);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
