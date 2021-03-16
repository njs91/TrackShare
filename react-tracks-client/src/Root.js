import React from 'react';
import withRoot from './withRoot';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { App } from './pages/App';
import { Profile } from './pages/Profile';
import Header from './components/Shared/Header'

const Root = () => (
  <Query query={ME_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <div>loading</div>;
      if (error) return <div>error</div>;
      const user = data.me;

      return (
      <Router>
         <>
            <Header user={user}/>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/profile/:id" component={Profile} />
            </Switch>
         </>
      </Router>
      );
    }}
  </Query>
);

const ME_QUERY = gql`
  {
    me {
      id
      username
      email
    }
  }
`;

//const GET_TRACKS_QUERY = gql`
//  {
//    tracks {
//      id
//      title
//      description
//      url
//    }
//  }
//`;

export default withRoot(Root);
