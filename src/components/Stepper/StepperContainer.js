/* eslint no-console: 0 */ // --> OFF
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Button,
  Paper,
  Step,
  Stepper,
  StepContent,
  StepLabel,
  Typography,
  withStyles,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  pastiche: {
    display: 'block',
  },
});

class NPVerticalStepper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
    };
  }

  componentDidMount() {}

  getSteps = () => {
    return ['Upload cute pic of Belle', 'Upload favorite art', 'Choose style intensity', 'Send & Wait'];
  };

  getBelleContainer = () => {
    const { classes, images } = this.props;
    const belle = images[0];

    return (
      <span key={_.uniqueId(belle.name)} className={classes.imageContainer}>
        <img src={belle.src} alt={belle.name} />
      </span>
    );
  };

  getCezanneContainer = () => {
    const { classes, images } = this.props;
    const cezanne = images[1];

    return (
      <span key={_.uniqueId(cezanne.name)} className={classes.imageContainer}>
        <img src={cezanne.src} alt={cezanne.name} />
      </span>
    );
  };

  getPasticheContainer = () => {
    const { classes, images } = this.props;
    const pastiche = images[2];

    return (
      <span key={_.uniqueId(pastiche.name)} className={classes.imageContainer}>
        <img src={pastiche.src} alt={pastiche.name} className={classes.pastiche} />
        {'Your pastiche will be emailed upon completion.'}
      </span>
    );
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return this.getBelleContainer();
      case 1:
        return this.getCezanneContainer();
      case 2:
        return 'Style';
      case 3:
        return this.getPasticheContainer();
      default:
        return '';
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{this.getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      {'Back'}
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>
              {''}
            </Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              {'Reset'}
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

NPVerticalStepper.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
};

NPVerticalStepper.propTypes = {
  classes: PropTypes.shape({}),
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withStyles(styles)(NPVerticalStepper);
