import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import marvelImages from './marvel';
import ForceLayout from './ForceLayout';

const styles = () => ({
  root: {},
});

class ForceLayoutContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { classes, screenDimensions: { height, width } } = this.props;
    const data = marvelImages;
    return (
      <React.Fragment>
        <ForceLayout height={height} width={width} data={data} className={classes.root} />
      </React.Fragment>
    );
  }
}

ForceLayoutContainer.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  screenDimensions: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}),
};

ForceLayoutContainer.propTypes = {
  classes: PropTypes.shape({}),
  screenDimensions: PropTypes.shape({}),
  theme: PropTypes.shape({}),
};

const mapStateToProps = ({
  screenDimensions,
}) => ({
  screenDimensions,
});

const mapDispatchToProps = () => ({});

const ConnectedForceLayoutContainer = fp.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
)(ForceLayoutContainer);

export default ConnectedForceLayoutContainer;
