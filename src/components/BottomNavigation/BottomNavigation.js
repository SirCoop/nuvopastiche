import React from 'react';
import PropTypes from 'prop-types';
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
  },
};

class LabelBottomNavigation extends React.Component {
  state = {
    value: 'recents',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction label="" value="home" icon={<BrushIcon />} />
        <BottomNavigationAction label="" value="search" icon={<SearchIcon />} />
        <BottomNavigationAction label="" value="gallery" icon={<CollectionsIcon />} />
        <BottomNavigationAction label="" value="folder" icon={<HelpIcon />} />
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);
