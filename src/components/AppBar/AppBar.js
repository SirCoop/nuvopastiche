import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import classNames from 'classnames';
import {
  AppBar,
  CssBaseline,
  IconButton,
  InputBase,
  Link,
  Toolbar,
  withStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
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
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    // my custom preference for responsive drawer height
    // minHeight: '10px',
    // my custom preference for responsive drawer height
    // [theme.breakpoints.up('sm')]: {
    //   minHeight: '64px',
    // },
  },
  headerInfo: {
    marginTop: '.5rem',
  },
  content: {
    flexGrow: 1,
    // my custom preference for responsive content padding
    // padding: '2px',
    // my custom preference for responsive content padding
    // [theme.breakpoints.up('sm')]: {
    //   padding: theme.spacing.unit * 3,
    // },
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
    [theme.breakpoints.up('sm')]: {
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
            <Link component={RouterLink} to="/" className={classes.title} underline="none" variant="h6" color="inherit" noWrap>
              {'Nuvo Pastiche'}
            </Link>
            <Link component={RouterLink} to="/" className={classes.titleMobile} underline="none" variant="h6" color="inherit">
              {'NP'}
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Monet..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
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
