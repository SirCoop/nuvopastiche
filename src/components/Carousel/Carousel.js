import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const styles = () => ({
  root: {
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
        <p className="legend">{item.description}</p>
      </div>
    ));
    return imageHTML;
  };

  render() {
    return (
      <Carousel infiniteLoop autoPlay swipeable>
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
