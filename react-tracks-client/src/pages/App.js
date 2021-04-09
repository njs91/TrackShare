import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import SearchTracks from "../components/Track/SearchTracks";
import TrackList from "../components/Track/TrackList";
import CreateTrack from "../components/Track/CreateTrack";
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Loading } from '../components/Shared/Loading'

export const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className={styles.container}>
      <h1 style={{'marginLeft': '1em'}}>Home</h1>
      <SearchTracks setSearchResults={setSearchResults}/>
      <CreateTrack/>
      {
        <Query query={GET_TRACKS}>
          {({data, loading, error}) => {
            if (loading) return <Loading/>
            const tracks = searchResults.length > 0 ? searchResults : data.tracks // data variable overridden by search results if any
            return <TrackList tracks={tracks}/>
          }}
        </Query>}
    </div>
  )
};

export const GET_TRACKS = gql`
    query getTracks {
        tracks {
            id
            title
            description
            artist
            url
            likes {
                id
            }
            postedBy {
                id
                username
            }
        }
    }
`

const styles = (theme) => ({
  container: {
    margin: '0 auto',
    maxWidth: 960,
    padding: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(App);
