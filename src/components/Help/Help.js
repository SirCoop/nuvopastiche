import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';
import NPVerticalStepper from '../Stepper';

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

const Help = (props) => {
  const { images } = props;
  return (
    <React.Fragment>
      <NPVerticalStepper images={images} />
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
