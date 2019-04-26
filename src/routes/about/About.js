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

const styles = () => ({
  root: {
  },
});

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        {'About this app...'}
      </React.Fragment>
    );
  }
}

About.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
};

About.propTypes = {
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

const ConnectedAbout = fp.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(About);

export default ConnectedAbout;
