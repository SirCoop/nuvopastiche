import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = {
  root: {
    bottom: '0',
    left: 'auto',
    right: 'auto',
    position: 'fixed',
    width: '100%',
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
        <BottomNavigationAction label="" value="recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="" value="favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="" value="nearby" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="" value="folder" icon={<Icon>folder</Icon>} />
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);
