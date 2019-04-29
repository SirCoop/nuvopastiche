import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import fp from 'lodash/fp';
import {
  withStyles,
} from '@material-ui/core';

const styles = () => ({
  root: {
  },
});

const Help = (props) => {
  const { images } = props;
  return (
    <div>
      {images}
    </div>
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
