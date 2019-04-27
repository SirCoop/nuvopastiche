/* eslint no-console: 0 */ // --> OFF
import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import notify from '../../components/Snackbar/notify';
import spinnerActionCreators from '../../redux/actions/spinner/spinnerActionCreators';
import ConnectedForceLayoutContainer from '../../components/D3/ForceLayoutContainer';

const styles = () => ({
  root: {
  },
});

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={12}>
            <ConnectedForceLayoutContainer />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Gallery.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
};

Gallery.propTypes = {
  classes: PropTypes.shape({}),
};

const mapStateToProps = ({
  activateSpinner,
}) => ({
  activateSpinner,
});

const mapDispatchToProps = dispatch => ({
  toggleSpinner: (activateSpinner) => {
    dispatch(spinnerActionCreators.toggleSpinner(activateSpinner));
  },
});

const ConnectedGallery = fp.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(Gallery);

export default ConnectedGallery;
