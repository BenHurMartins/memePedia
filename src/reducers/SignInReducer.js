import * as types from '../actions/types';

const INITIAL_STATE = {
  user: {
    userPhotoURL: '',
    userId: '',
    userName: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {...state, user: action.payload};
      break;
    default:
      return state;
      break;
  }
};
