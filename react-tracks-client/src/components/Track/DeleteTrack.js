import React, { useContext } from "react";
import { Mutation } from "react-apollo";
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";
import { UserContext } from "../../Root";
import { GET_TRACKS } from "../../gql/queries";
import { DELETE_TRACK_MUTATION } from "../../gql/mutations";

const DeleteTrack = ({track}) => {
  const currentUser = useContext(UserContext);
  const isCurrentUser = currentUser.id === track.postedBy.id;

  const handleUpdateCache = (cache, {data: {deleteTrack}}) => {
    const data = cache.readQuery({query: GET_TRACKS});
    const index = data.tracks.findIndex(
      track => Number(track.id) === deleteTrack.trackId
    );
    const tracks = [
      ...data.tracks.slice(0, index),
      ...data.tracks.slice(index + 1)
    ];
    cache.writeQuery({query: GET_TRACKS, data: {tracks}});
  };

  return (
    isCurrentUser && (
      <Mutation
        mutation={DELETE_TRACK_MUTATION}
        variables={{trackId: track.id}}
        onCompleted={data => {
          console.log({data});
        }}
        update={handleUpdateCache}
        // refetchQueries={() => [{ query: GET_TRACKS }]}
      >
        {deleteTrack => (
          <IconButton onClick={deleteTrack}>
            <TrashIcon/>
          </IconButton>
        )}
      </Mutation>
    )
  );
};

export default DeleteTrack;
