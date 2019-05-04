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
import notify from '../../components/Snackbar/notify';
import spinnerActionCreators from '../../redux/actions/spinner/spinnerActionCreators';
import imageService from '../../services/image.service';
import MobileStepperContainer from '../../components/MobileStepper';

const styles = () => ({
  root: {
  },
  definitions: {
    marginTop: '1rem',
  },
});

class Help extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpImages: [],
    };
  }

  componentDidMount() {
    this.fetchHelpImages();
  }

  fetchHelpImages = () => {
    const { toggleSpinner } = this.props;
    toggleSpinner(true);
    imageService.getHelpImageUrls()
      .then((data) => {
        this.setHelpImages(data);
        toggleSpinner(false);
      })
      .catch(() => {
        notify({
          message: 'Could not retrieve help images.',
          variant: 'error',
          duration: 3000,
        });
        this.setHelpImages();
        toggleSpinner(false);
      });
  };

  // TODO: Make text defaults in stepper if no images available
  setHelpImages = (helpImages = []) => {
    this.setState({
      helpImages,
    });
  };

  render() {
    const { classes } = this.props;
    const { helpImages } = this.state;

    return (
      <React.Fragment>
        <Grid container className={classes.root} spacing={0} align="center" justify="center" direction="column">
          <Grid item sm={4} />
          <Grid item sm={4}>
            <Typography variant="subtitle1">
              {'How does it work?'}
            </Typography>
            {helpImages.length ? <MobileStepperContainer images={helpImages} maxWidth={300} /> : ''}
          </Grid>
          <Grid item sm={4} />
        </Grid>
        {/* first row */}
        <Divider />
        <Grid container className={classes.definitions}>
          <Grid item sm={2} />
          <Grid item sm={4}>
            <Typography variant="subtitle1">
              <b>nu·vo&nbsp;</b>
              {'(no͞oˈvō) - modern or up to date.'}
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography variant="subtitle1">
              <b>pas·tiche&nbsp;</b>
              {'(paˈstēSH) - an artistic work imitating the style of another.'}
            </Typography>
          </Grid>
          <Grid item sm={2} />
        </Grid>
        {/* second row */}
      </React.Fragment>
    );
  }
}

Help.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
};

Help.propTypes = {
  classes: PropTypes.shape({}),
  toggleSpinner: PropTypes.func.isRequired,
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
