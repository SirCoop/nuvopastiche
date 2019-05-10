import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import {
  AppBar,
  CssBaseline,
  Link,
  Toolbar,
  withStyles,
} from '@material-ui/core';
import dialogActionCreators from '../../redux/actions/dialog/dialogActionCreators';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    color: 'rgba(0, 0, 0, 0.54)',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: '44px',
  },
  definitions: {
    textAlign: 'center',
  },
  headerInfo: {
    marginTop: '.5rem',
  },
  navigationLink: {
    textDecoration: 'none',
  },
  title: {
    color: '#000',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  toolbar: {
    minHeight: '48px',
  },
});

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  showHelp = () => {
    const { toggleDialog } = this.props;
    toggleDialog(true);
  };

  goToRoute = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <Link component={RouterLink} to="/" className={classes.title} underline="none" variant="h6" color="inherit" noWrap>
              {'Nuvo Pastiche'}
            </Link>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

PrimarySearchAppBar.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  toggleDialog: PropTypes.func.isRequired,
};

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
  theme: PropTypes.shape({}),
  toggleDialog: PropTypes.func,
};

const mapStateToProps = ({
  activateDialog,
}) => ({
  activateDialog,
});

const mapDispatchToProps = dispatch => ({
  toggleDialog: (activateDialog) => {
    dispatch(dialogActionCreators.toggleDialog(activateDialog));
  },
});

const ConnetedPrimarySearchAppBar = fp.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
)(PrimarySearchAppBar);

export default ConnetedPrimarySearchAppBar;
