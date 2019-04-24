const deviceReducers = {
  screenDimensions: (state = {}, action) => {
    switch (action.type) {
      case 'SET_SCREEN_DIMENSIONS':
        return action.screenDimensions;
      default:
        return state;
    }
  },
};

export default deviceReducers;
