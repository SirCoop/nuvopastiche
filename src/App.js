import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import './styles/index.css';
import Router from './routes';
import CustomizedSnackbars from './components/Snackbar/CustomizedSnackbars';
import ConnectedSpinnerContainer from './components/Spinner/SpinnerContainer';

const styles = {
  sidebarIsOpen: {
    // transition: 'all .2s',
    // paddingLeft: 225,
  },
  sidebarIsClosed: {
    // transition: 'all .2s',
    // paddingLeft: 75,
  },
};

const App = () => {
  return (
    <div>
      <React.Fragment>
        <Router />
        <CustomizedSnackbars />
        <ConnectedSpinnerContainer />
      </React.Fragment>
    </div>
  );
};

App.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
};

App.propTypes = {
  classes: PropTypes.shape({}),
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

const ConnectedApp = fp.compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(App);

export default ConnectedApp;
