const deviceActionCreators = {
  setScreenDimensions: screenDimensions => dispatch => dispatch({
    type: 'SET_SCREEN_DIMENSIONS',
    screenDimensions,
  }),
};

export default deviceActionCreators;
