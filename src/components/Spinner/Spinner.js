import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Loader from 'react-loader-spinner';

const styles = () => ({
  root: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    background: 'black',
    opacity: '.5',
  },
  loader: {
    position: 'relative',
    left: '25%',
    top: '25%',
  },
});

function Spinner(props) {
  const { classes, loading } = props;
  return (
    <React.Fragment>
      {
        loading
          ? (
            <div className={classes.root}>
              <div className={classes.loader}>
                <Loader
                  type="Plane"
                  color="#00BFFF"
                  height="50"
                  width="50"
                />
              </div>
            </div>
          ) : '' }
    </React.Fragment>
  );
}

Spinner.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Spinner);
