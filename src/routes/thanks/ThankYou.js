/* eslint no-console: 0 */ // --> OFF
import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Divider,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import spinnerActionCreators from '../../redux/actions/spinner/spinnerActionCreators';

const styles = () => ({
  root: {
  },
  divider: {
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  message: {
    marginTop: '10%',
  },
  paragraph: {
    marginBottom: '.5rem',
  },
});

class ThankYou extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    const systemDescription = `
      NST has given Athena the ability to learn any artistic style and then draw, pixel-by-pixel, any image in that style. 
      Think of it like an Instagram filter that can do anything. 
      However, no one can guarantee the result will be aesthetically pleasing.
    `;
    return (
      <React.Fragment>
        <Grid container className={classes.root}>
          <Grid item xs={1} />
          <Grid item xs={10} className={classes.message}>
            <Typography variant="h3" align="center">
              {'Thank You!'}
            </Typography>
            <Typography variant="subtitle1" align="center">
              {'Your pastiche will be emailed upon completion.'}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="body2" align="left" className={classes.paragraph}>
              {'Nuvo Pastiche is powered by an artificially intelligent sytem that we like to call Athena.'}
            </Typography>
            <Typography variant="body2" align="left" className={classes.paragraph}>
              {'Athena was born from an A.I. concept called neural style transfer.'}
            </Typography>
            <Typography variant="body2" align="left" className={classes.paragraph}>
              {systemDescription}
            </Typography>
            <Typography variant="body2" align="left">
              {'For this reason, we like to say Athena has style, but not taste.'}
              <b>We need you for that!</b>
            </Typography>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </React.Fragment>
    );
  }
}

ThankYou.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
};

ThankYou.propTypes = {
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

const ConnectedThankYou = fp.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(ThankYou);

export default ConnectedThankYou;
