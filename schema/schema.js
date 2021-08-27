const graphql = require("graphql");
const axios = require("axios");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = graphql;

//planet type
const PlanetType = new GraphQLObjectType({
  name: "Planets",
  fields: {
    name: { type: GraphQLString },
    climate: { type: GraphQLString },
    terrain: { type: GraphQLString }
  }
});

//people Type
const PeopleType = new GraphQLObjectType({
  name: "People",
  fields: {
    name: { type: GraphQLString },
    height: { type: GraphQLString },
    mass: { type: GraphQLString },
    gender: { type: GraphQLString },
    homeworld: {
      type: PlanetType,
      resolve(parentValue, args) {
        return axios.get(parentValue.homeworld).then(res => {
          return res.data;
        });
      }
    }
  }
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    people: {
      type: GraphQLList(PeopleType),
      args: { page: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return (
          axios
            // .get(`http://swapi.dev/api/people`)
            .get(`https://swapi.dev/api/people/?page=${args.page}`)
            .then(res => res.data.results)
        );
      }
    },
    person: {
      type: PeopleType,
      args: { name: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://swapi.dev/api/people/?search=${args.name}`)
          .then(res => {
            return res.data.results[0];
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
