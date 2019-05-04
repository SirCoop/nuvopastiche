/* eslint no-console: 0 */ // --> OFF
import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import notify from '../../components/Snackbar/notify';
import spinnerActionCreators from '../../redux/actions/spinner/spinnerActionCreators';

const styles = () => ({
  root: {
  },
});

class Help extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container className={classes.root}>
          <Grid item sm={2} />
          <Grid item sm={4}>
            <Typography variant="h6">
              <b>nu·vo&nbsp;</b>
              {'(no͞oˈvō) - modern or up to date.'}
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography variant="h6">
              <b>pas·tiche&nbsp;</b>
              {'(paˈstēSH) - an artistic work imitating the style of another.'}
            </Typography>
          </Grid>
          <Grid item sm={2} />
        </Grid>
      </React.Fragment>
    );
  }
}

Help.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
};

Help.propTypes = {
  classes: PropTypes.shape({}),
};

const mapStateToProps = ({
  activateSpinner,
}) => ({
  activateSpinner,
});

const mapDispatchToProps = dispatch => ({
  toggleSpinner: (activateSpinner) => {
    dispatch(spinnerActionCreators.toggleSpinner(activateSpinner));
  },
});

const HelpContainer = fp.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(Help);

export default HelpContainer;
