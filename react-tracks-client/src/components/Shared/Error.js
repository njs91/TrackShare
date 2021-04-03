import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  snackbar: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(Error);
