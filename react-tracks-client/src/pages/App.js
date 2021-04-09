import React, { useContext, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import SearchTracks from "../components/Track/SearchTracks";
import TrackList from "../components/Track/TrackList";
import CreateTrack from "../components/Track/CreateTrack";
import { Query } from 'react-apollo'
import { Loading } from '../components/Shared/Loading'
import { GET_TRACKS } from "../gql/queries";
import { Link } from "react-router-dom";
import { UserContext } from "../Root";

export const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const currentUser = useContext(UserContext);

  return (
    <div className={styles.container}>
      <h1 style={{'marginLeft': '1em'}}>Home</h1>
      <SearchTracks setSearchResults={setSearchResults}/>
      <CreateTrack/>
      {
        <Query query={GET_TRACKS}>
          {({data, loading}) => {
            if (loading) return <Loading/>
            const tracks = searchResults.length > 0 ? searchResults : data.tracks // data variable overridden by search results if any
            return <TrackList tracks={tracks}/>
          }}
        </Query>}
      {currentUser &&
      <Link to={`/profile/${currentUser.id}`} style={{
        'margin': '1em',
        'display': 'inline-block',
        'background': '#303f9f',
        'padding': '.5em 1.5em',
        'textDecoration': 'none',
        'color': '#fff',
        'borderRadius': '.5em'
      }}>View Profile</Link>}
    </div>
  )
};

const styles = (theme) => ({
  container: {
    margin: '0 auto',
    maxWidth: 960,
    padding: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(App);
