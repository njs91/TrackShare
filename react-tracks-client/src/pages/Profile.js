import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import ThumbUpIcon from "@material-ui/icons/ThumbUpTwoTone";
import AudiotrackIcon from "@material-ui/icons/AudiotrackTwoTone";
import format from "date-fns/format";
import AudioPlayer from "../components/Shared/AudioPlayer";
import Error from "../components/Shared/Error";
import Loading from "../components/Shared/Loading";

export const Profile = ({ classes, match }) => {
  const id = match.params.id;

  return (
    <Query query={PROFILE_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error} />;

        return (
          <div style={{'maxWidth': '1200px', 'margin': '1rem auto 0 auto'}}>
            {/* User Info Card */}
            {<Card className={styles.card}>
              <CardHeader
                avatar={<Avatar>{data.user.username[0]}</Avatar>}
                title={data.user.username}
                subheader={`Joined ${format(
                  data.user.dateJoined,
                  "MMM Do, YYYY"
                )}`}
              />
            </Card>}

            <div style={{'margin': '2rem 0', 'boxShadow': '0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%)', 'padding': '1.5em', 'borderRadius': '.5em'}}>
                <span style={{'padding': '0 .5em', 'fontWeight': '700'}}>User Info:</span>
                <ul>
                    <li>ID: {data.user.id}</li>
                    <li>Username: {data.user.username}</li>
                    <li>Joined: {format(data.user.dateJoined, 'MMM Do, YYYY')}</li>
                </ul>
            </div>

            {/* Created Tracks */}
            <div style={{'boxShadow': '0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%)', 'padding': '1.5em', 'borderRadius': '.5em'}}>
              <div style={{'padding': '0 0 1em 0'}}>
                <AudiotrackIcon className={styles.audioIcon} />
                <span style={{'padding': '0 .5em', 'fontWeight': '700'}}>Created Tracks:</span>
              </div>
              {data.user.trackSet.length ? data.user.trackSet.map(track => (
                <div key={track.id}>
                  <div>
                    {track.title} · {track.likes.length} Likes
                  </div>
                  <div style={{'padding': '.5rem 0'}} />
                  <AudioPlayer url={track.url} />
                  <div style={{'padding': '.5rem 0'}} />
                </div>
              )) : 'None'}
            </div>

            {/* Liked Tracks */}
            <div style={{'boxShadow': '0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%)', 'padding': '1.5em', 'borderRadius': '.5em', 'margin': '2rem 0'}}>
              <div style={{'padding': '0 0 1em 0'}}>
                <ThumbUpIcon />
                <span style={{'padding': '0 .5em', 'fontWeight': '700'}}>Liked Tracks:</span>
              </div>
              {data.user.likeSet.length ? data.user.likeSet.map(({ track }) => (
                <div key={track.id}>
                  <div>
                    {track.title} · {track.likes.length} Likes ·{" "}
                    {track.postedBy.username}
                  </div>
                  <div style={{'padding': '.5rem 0'}} />
                  <AudioPlayer url={track.url} />
                  <div style={{'padding': '.5rem 0'}} />
                </div>
              )): 'None'}
            </div>
          </div>
        );
      }}
    </Query>
  );
};

const PROFILE_QUERY = gql`
  query($id: Int!) {
    user(id: $id) {
      id
      username
      dateJoined
      likeSet {
        id
        track {
          id
          title
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
      trackSet {
        id
        title
        url
        likes {
          id
        }
      }
    }
  }
`;

const styles = theme => ({
  paper: {
    width: "auto",
    display: "block",
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up("md")]: {
      width: 650,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  card: {
    display: "flex",
    justifyContent: "center"
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 2
  },
  audioIcon: {
    color: "purple",
    fontSize: 30,
    marginRight: theme.spacing.unit
  },
  thumbIcon: {
    color: "green",
    marginRight: theme.spacing.unit
  },
  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

export default withStyles(styles)(Profile);
