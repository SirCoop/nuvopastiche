import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  withStyles,
} from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';

const styles = () => ({
  root: {
  },
  carousel: {
    maxHeight: '60%',
  },
});

class NPCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  generateImageDivs = () => {
    const { images } = this.props;
    const imageHTML = images.map(item => (
      <div key={_.uniqueId(item.name)}>
        <img src={item.src} alt={item.name} />
        {/* <p className="legend">{item.description}</p> */}
      </div>
    ));
    return imageHTML;
  };

  render() {
    const { classes } = this.props;

    return (
      <Carousel infiniteLoop autoPlay swipeable width="100%" className={classes.carousel}>
        {this.generateImageDivs()}
      </Carousel>
    );
  }
}

NPCarousel.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

NPCarousel.propTypes = {
  classes: PropTypes.shape({}),
  images: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withStyles(styles)(NPCarousel);
