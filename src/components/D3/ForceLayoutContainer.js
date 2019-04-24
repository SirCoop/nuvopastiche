import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import marvelImages from './marvel';
import ForceLayout from './ForceLayout';

const styles = theme => ({
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
    const { classes, theme } = this.props;

    return (
      <React.Fragment>
        <ForceLayout height={height} width={width} />
      </React.Fragment>
    );
  }
}

ForceLayoutContainer.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}),
};

ForceLayoutContainer.propTypes = {
  classes: PropTypes.shape({}),
  theme: PropTypes.shape({}),
};

export default withStyles(styles, { withTheme: true })(ForceLayoutContainer);
