import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class ProgressBar extends React.Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      this.setState({ completed: 0 });
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };

  render() {
    const { classes, loading } = this.props;
    const { completed } = this.state;
    return (
      <div className={classes.root}>
        { loading ? <LinearProgress variant="determinate" value={completed} /> : '' }
      </div>
    );
  }
}

ProgressBar.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
};

ProgressBar.propTypes = {
  classes: PropTypes.shape({}),
  loading: PropTypes.bool,
};

export default withStyles(styles)(ProgressBar);
