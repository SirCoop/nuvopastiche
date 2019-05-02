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
import PrimarySearchAppBar from './components/AppBar';
import LabelBottomNavigation from './components/BottomNavigation';
// Redux
import deviceActionCreators from './redux/actions/device/deviceActionCreators';

const styles = {
  root: {
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.setScreenSize();
  }

  setScreenSize = () => {
    const { setScreenDimensions } = this.props;
    const screenDimensions = {
      height: window.screen.availHeight,
      width: window.screen.availWidth,
    };
    setScreenDimensions(screenDimensions);
  };

  render() {
    return (
      <React.Fragment>
        <PrimarySearchAppBar />
        <Router />
        <CustomizedSnackbars />
        <ConnectedSpinnerContainer />
        <LabelBottomNavigation />
      </React.Fragment>
    );
  }
}

App.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  setScreenDimensions: PropTypes.func.isRequired,
};

App.propTypes = {
  classes: PropTypes.shape({}),
  setScreenDimensions: PropTypes.func,
};

const mapStateToProps = ({
  screenDimensions,
}) => ({
  screenDimensions,
});

const mapDispatchToProps = dispatch => ({
  setScreenDimensions: (screenDimensions) => {
    dispatch(deviceActionCreators.setScreenDimensions(screenDimensions));
  },
});

const ConnectedApp = fp.compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(App);

export default ConnectedApp;
