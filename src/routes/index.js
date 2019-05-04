import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import home from './home';
import gallery from './gallery';
import contact from './contact';
import about from './about';

const styles = {
  contentContainer: {
    // app content positioned absolutely between header and footer
    overflow: 'auto',
    position: 'absolute',
    top: '56px', // appBar height
    bottom: '35px', // footer height = 56 but this works for now
  },
};

const RouterComponent = (props) => {
  const { classes } = props;
  return (
    <div className={classes.contentContainer}>
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
