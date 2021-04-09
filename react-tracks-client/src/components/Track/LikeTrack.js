import React, { useContext } from "react";
import { Mutation } from "react-apollo";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { UserContext } from "../../Root";
import { CREATE_LIKE_MUTATION } from "../../gql/mutations";
import { ME_QUERY } from "../../gql/queries";

const LikeTrack = ({classes, trackId, likeCount}) => {
  const currentUser = useContext(UserContext);

  const handleDisableLikedTrack = () => {
    const userLikes = currentUser.likeSet;
    const isTrackLiked =
      userLikes.findIndex(({track}) => track.id === trackId) > -1;
    return isTrackLiked;
  };

  return (
    <Mutation
      mutation={CREATE_LIKE_MUTATION}
      variables={{trackId}}
      onCompleted={data => {
        console.log({data});
      }}
      refetchQueries={() => [{query: ME_QUERY}]}
    >
      {createLike => (
        <IconButton
          onClick={event => {
            event.stopPropagation();
            createLike();
          }}
          className={classes.iconButton}
          disabled={handleDisableLikedTrack()}
        >
          {likeCount}
          <ThumbUpIcon className={classes.icon}/>
        </IconButton>
      )}
    </Mutation>
  );
};

const styles = theme => ({
  iconButton: {
    color: "deeppink"
  },
  icon: {
    marginLeft: theme.spacing.unit / 2
  }
});

export default withStyles(styles)(LikeTrack);
