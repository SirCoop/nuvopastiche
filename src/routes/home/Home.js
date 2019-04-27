/* eslint no-console: 0 */ // --> OFF
import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import notify from '../../components/Snackbar/notify';
import spinnerActionCreators from '../../redux/actions/spinner/spinnerActionCreators';
import ConnectedIntroduction from '../../components/Introduction';
import ConnectedFormContainer from '../../components/Form';

const styles = () => ({
  root: {
    marginTop: '1rem',
  },
  quote: {
    marginTop: '3rem',
  },
});

class HomeContainer extends React.Component {
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
          <Grid item sm={3} />
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              <CardContent>
                <Grid container className={classes.root}>
                  <Grid item xs={12} sm={6}><ConnectedIntroduction /></Grid>
                  <Grid item xs={12} sm={6}>
                    <ConnectedFormContainer />
                    <div className={classes.quote}>
                      <Typography variant="body1" align="center">
                        {'"Good artists copy. Great artists steal."'}
                      </Typography>
                      <Typography variant="body1" align="center">
                        {'-- Picasso'}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={3} />
        </Grid>
      </React.Fragment>
    );
  }
}

HomeContainer.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
};

HomeContainer.propTypes = {
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

const ConnectedHomeContainer = fp.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(HomeContainer);

export default ConnectedHomeContainer;
