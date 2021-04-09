import React, { createContext, useContext } from 'react';
import withRoot from './withRoot';
import { Query } from 'react-apollo';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { App } from './pages/App';
import { Profile } from './pages/Profile';
import Header from './components/Shared/Header'
import Loading from './components/Shared/Loading'
import Error from './components/Shared/Error'
import { ME_QUERY } from "./gql/queries";

export const UserContext = createContext();

const AuthedRoute = (props) => {
  const account = useContext(UserContext);
  if (!account) {
    return <Redirect to="/login"/>;
  }
  return <Route {...props} />;
};

const Root = () => (
  <Query query={ME_QUERY} fetchPolicy="cache-and-network">
    {({data, loading, error}) => {
      if (loading) return <Loading/>;
      if (error) return <Error error={error}/>;
      const currentUser = data.me;

      return (
        <Router>
          <UserContext.Provider value={currentUser}>
            <Header currentUser={currentUser}/>
            <Switch>
              <AuthedRoute exact path="/" component={App}/>
              <AuthedRoute path="/profile/:id" component={Profile}/>
            </Switch>
          </UserContext.Provider>
        </Router>
      );
    }}
  </Query>
);

export default withRoot(Root);
