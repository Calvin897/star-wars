import React from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PeopleList from "../PeopleList";
import PersonDetail from "../PersonDetail";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([errorLink, new HttpLink({ uri: "/graphql" })]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/" component={PeopleList} />
        <Route exact path="/people/:page/:name" component={PersonDetail} />
      </Router>
    </ApolloProvider>
  );
};

export default App;
