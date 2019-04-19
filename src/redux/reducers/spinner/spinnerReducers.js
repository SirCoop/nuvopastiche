const spinnerReducers = {
  activateSpinner: (state = false, action) => {
    switch (action.type) {
      case 'TOGGLE_LOADING_SPINNER':
        return action.activateSpinner;
      default:
        return state;
    }
  },
};

export default spinnerReducers;
