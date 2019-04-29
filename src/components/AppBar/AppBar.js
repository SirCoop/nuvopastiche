import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import Collections from '@material-ui/icons/Collections';
import HelpIcon from '@material-ui/icons/HelpOutline';
import Info from '@material-ui/icons/Info';
import Home from '@material-ui/icons/Home';
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
  helpIcon: {
    marginRight: '.5rem',
  },
});

class PrimarySearchAppBar extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {}

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  showHelp = () => {
    const { toggleDialog } = this.props;
    toggleDialog(true);
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    const items = [
      {
        text: 'Home',
        icon: <Home />,
        link: '/home',
      },
      {
        text: 'Gallery',
        icon: <Collections />,
        link: '/gallery',
      },
      {
        text: 'About',
        icon: <Info />,
        link: '/about',
      },
      {
        text: 'Contact',
        icon: <MailIcon />,
        link: '/contact',
      },
    ];

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {items.map(item => (
            <Link component={RouterLink} to={item.link} key={item.text} underline="none" onClick={this.handleDrawerClose}>
              <ListItem button key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} className={classes.navigationLink} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );

    const dialogContent = {
      cancelButton: '',
      confirmButton: {
        text: 'Got it!',
      },
      contentText: 'How does it work?',
      dialogContent: <ConnectedHelpContainer />,
      title: 'No͞oˈvō PaˈstēSH',
    };

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Link component={RouterLink} to="/" className={classNames(classes.title)} underline="none" variant="h6" color="inherit" noWrap>
              {'Nuvo Pastiche'}
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
            <IconButton
              color="inherit"
              aria-label="Help"
              onClick={this.showHelp}
              className={classNames(classes.helpIcon)}
            >
              <HelpIcon />
            </IconButton>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {drawer}
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

        </main>
        <ConnectedDialogContainer content={dialogContent} />
      </div>
    );
  }
}

PrimarySearchAppBar.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  toggleDialog: PropTypes.func.isRequired,
};

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.shape({}),
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
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
)(PrimarySearchAppBar);

export default ConnetedPrimarySearchAppBar;
