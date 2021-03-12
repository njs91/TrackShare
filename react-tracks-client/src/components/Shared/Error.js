import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Snackbar } from '@material-ui/core';
// import Button from "@material-ui/core/Button";
// import Snackbar from "@material-ui/core/Snackbar";

const styles = (theme) => ({
  snackbar: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(Error);
