import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import fp from 'lodash/fp';
import {
  withStyles,
} from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CollectionsIcon from '@material-ui/icons/Collections';
import BrushIcon from '@material-ui/icons/Brush';
import HelpIcon from '@material-ui/icons/HelpOutline';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  root: {
    bottom: '0',
    position: 'fixed',
    width: '100%',
    backgroundColor: '#f5f5f5',
    zIndex: '2',
  },
  activeNav: {
    color: '#01c2ff',
  },
  icon: {
    color: '#000',
  },
};

class LabelBottomNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleChange = (event, value) => {
    const { history } = this.props;
    const url = `/${value}`;
    history.push(url);
  };

  render() {
    const { classes, location: { pathname } } = this.props;
    const { value } = this.state;
    const currentPath = pathname.split('/').pop();

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction label="" value="home" icon={<BrushIcon className={currentPath === 'home' ? classes.activeNav : classes.icon} />} />
        <BottomNavigationAction label="" value="search" icon={<SearchIcon className={currentPath === 'search' ? classes.activeNav : classes.icon} />} />
        <BottomNavigationAction label="" value="gallery" icon={<CollectionsIcon className={currentPath === 'gallery' ? classes.activeNav : classes.icon} />} />
        <BottomNavigationAction label="" value="help" icon={<HelpIcon className={currentPath === 'help' ? classes.activeNav : classes.icon} />} />
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default fp.compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
)(LabelBottomNavigation);
