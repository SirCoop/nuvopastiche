import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Step,
  StepLabel,
  Stepper,
  Typography,
  withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DragHandleIcon from '@material-ui/icons/DragHandle';

const styles = () => ({
  root: {
  },
  icon: {
    marginBottom: '4rem',
  },
  iconContainer: {
    display: 'inline-block',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  imageContainer: {
    display: 'inline-block',
  },
  completedStep: {
    color: '#3f51b5',
  },
});

const steps = ['Cute pic of Belle', 'Your favorite art', 'Intensity', 'Send'];

const isStepOptional = step => step === 2;

const Help = (props) => {
  const { classes, images } = props;
  const [belle, cezanne, pastiche] = images;
  return (
    <React.Fragment>
      {/* {generateImageDivs(images)} */}
      <div key={_.uniqueId(belle.name)} className={classes.imageContainer}>
        <img src={belle.src} alt={belle.name} />
      </div>
      <div className={classes.iconContainer}>
        <AddIcon className={classes.icon} />
      </div>
      <div key={_.uniqueId(cezanne.name)} className={classes.imageContainer}>
        <img src={cezanne.src} alt={cezanne.name} />
      </div>
      <div className={classes.iconContainer}>
        <DragHandleIcon className={classes.icon} />
      </div>
      <div key={_.uniqueId(pastiche.name)} className={classes.imageContainer}>
        <img src={pastiche.src} alt={pastiche.name} />
      </div>
      <Stepper>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </React.Fragment>
  );
};

Help.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

Help.propTypes = {
  classes: PropTypes.shape({}),
  images: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withStyles(styles)(Help);
