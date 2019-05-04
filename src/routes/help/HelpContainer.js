/* eslint no-console: 0 */ // --> OFF
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
import imageService from '../../services/image.service';

const styles = theme => ({
  root: {
  },
  imageContainer: {
    display: 'inline-block',
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      width: '100px',
      height: 'auto,',
    },
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

  generateImageDivs = () => {
    const { classes } = this.props;
    const { helpImages } = this.state;
    const stepOne = helpImages[0];
    const stepTwo = helpImages[1];
    const stepThree = helpImages[2];

    const html = (
      <React.Fragment>
        <div key={_.uniqueId(stepOne.name)} className={classes.imageContainer}>
          <img src={stepOne.src} alt={stepOne.name} className={classes.image} />
          {/* <p className="legend">{item.description}</p> */}
        </div>

        <div key={_.uniqueId(stepTwo.name)} className={classes.imageContainer}>
          <img src={stepTwo.src} alt={stepTwo.name} className={classes.image} />
          {/* <p className="legend">{item.description}</p> */}
        </div>

        <div key={_.uniqueId(stepThree.name)} className={classes.imageContainer}>
          <img src={stepThree.src} alt={stepThree.name} className={classes.image} />
          {/* <p className="legend">{item.description}</p> */}
        </div>
      </React.Fragment>
    );

    return html;
  };

  render() {
    const { classes } = this.props;
    const { helpImages } = this.state;

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
        {/* first row */}
        <Grid container className={classes.root}>
          <Grid item sm={4} />
          <Grid item sm={4}>
            {
              helpImages.length
                ? this.generateImageDivs()
                : ''
            }
          </Grid>
          <Grid item sm={4} />
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
