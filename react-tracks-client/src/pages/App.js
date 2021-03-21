import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import SearchTracks from "../components/Track/SearchTracks";
import TrackList from "../components/Track/TrackList";
import CreateTrack from "../components/Track/CreateTrack";
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Loading } from  '../components/Shared/Loading'

export const App = ({ classes }) => {
  return (
    <div className={styles.container}>
	    <SearchTracks />
	    <CreateTrack />
{
        <Query query={GET_TRACKS}>
            {({ data, loading, error }) => {
                  if (loading) return <Loading />
                  return <TrackList tracks={data.tracks} />
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
