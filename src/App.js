import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import './styles/index.css';
import Sidebar from './components/Sidebar';
import Router from './routes';
import CustomizedSnackbars from './components/Snackbar/CustomizedSnackbars';
import handleToggleIsSidebarOpen from './redux/actions/toggleSidebar';

const styles = {
  sidebarIsOpen: {
    transition: 'all .2s',
    paddingLeft: 225,
  },
  sidebarIsClosed: {
    transition: 'all .2s',
    paddingLeft: 75,
  },
};

const App = (props) => {
  const {
    onToggleIsSidebarOpen, isSidebarOpen, classes,
  } = props;

  return (
    <div>
      <React.Fragment>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={onToggleIsSidebarOpen(isSidebarOpen)}
        />
        <div className={classnames({
          [classes.sidebarIsOpen]: isSidebarOpen,
          [classes.sidebarIsClosed]: !isSidebarOpen,
        })}
        >
          <Router />
          <CustomizedSnackbars />
        </div>
      </React.Fragment>
    </div>
  );
};

App.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  onToggleIsSidebarOpen: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

App.propTypes = {
  classes: PropTypes.shape({}),
  onToggleIsSidebarOpen: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

const mapStateToProps = ({ isSidebarOpen }) => ({
  isSidebarOpen,
});

const mapDispatchToProps = dispatch => ({
  onToggleIsSidebarOpen: currentState => () => dispatch(handleToggleIsSidebarOpen(!currentState)),
});

export default fp.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(App);
