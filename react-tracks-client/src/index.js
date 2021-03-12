import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider, Query } from 'react-apollo'; // Query makes client query, not network query
import ApolloClient, { gql } from 'apollo-boost';
import Auth from './components/Auth'; //imports index.js from Auth folder

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/', //connects to back-end API
  fetchOptions: { // “We’re including an auth header on our request”
    credentials: "include"
  },
  request: operation => { // set headers
    const token = localStorage.getItem('authToken') || ""; // get token or ""
    operation.setContext({
        headers: {
            Authorization: `JWT ${token}` // set in header
        }
    })
  },
  clientState: {
    defaults: {
        isLoggedIn: !!localStorage.getItem('authToken') // true/false if they're logged in or not; !! = to bool
    }
  }
});

const IS_LOGGED_IN_QUERY = gql`
    query {
        isLoggedIn @client
    }
`

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN_QUERY}>
        {({ data }) => data.isLoggedIn ? <Root /> : <Auth />}
    </Query>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
