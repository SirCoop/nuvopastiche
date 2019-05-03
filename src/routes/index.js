import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import home from './home';
import gallery from './gallery';
import contact from './contact';
import about from './about';

const styles = {
  root: {
    // position: 'absolute',
    // maxHeight: '95vh',
    // overflow: 'auto',
    // backgroundColor: '#fafafa',
  },
};

const RouterComponent = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Switch>
        <Route path={home.path} component={home.Component} />
        <Route path={gallery.path} component={gallery.Component} />
        <Route path={contact.path} component={contact.Component} />
        <Route path={about.path} component={about.Component} />
        <Redirect from="/" to="/home" />
      </Switch>
    </div>
  );
};

RouterComponent.defaultProps = {
};

RouterComponent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(RouterComponent);
