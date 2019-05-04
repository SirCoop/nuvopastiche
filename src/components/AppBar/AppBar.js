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
import { fade } from '@material-ui/core/styles/colorManipulator';
import ConnectedDialogContainer from '../Dialog/DialogContainer';
import dialogActionCreators from '../../redux/actions/dialog/dialogActionCreators';
import ConnectedHelpContainer from '../Help';

const drawerWidth = 240;

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
  },
  definitions: {
    textAlign: 'center',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  headerInfo: {
    marginTop: '.5rem',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  navigationLink: {
    textDecoration: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  title: {
    display: 'none',
    fontFamily: 'Snell Roundhand Script',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  titleMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    paddingRight: '1.5rem',
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

    const dialogContent = {
      cancelButton: '',
      confirmButton: {
        text: 'Got it!',
      },
      contentText: '',
      dialogContent: <ConnectedHelpContainer />,
      title: 'How does it work?',
    };

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <Link component={RouterLink} to="/" className={classes.title} underline="none" variant="h4" color="inherit" noWrap>
              {'Nuvo Pastiche'}
            </Link>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
        <ConnectedDialogContainer content={dialogContent} />
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
