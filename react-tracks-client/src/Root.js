import React from 'react';
import withRoot from './withRoot';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const Root = () => (
  <Query query={ME_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <div>loading</div>;
      if (error) return <div>error</div>;

      return <div>{JSON.stringify(data)}</div>;
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
