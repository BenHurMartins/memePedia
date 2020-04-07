import * as types from '../actions/types';

const INITIAL_STATE = {
  content: {},
  title: '',
  tags: [],
  posting: false,
  progress: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.NEW_POST:
      return {...state};
      break;
    case types.TOGGLE_POSTING:
      return {...state, posting: action.payload};
      break;
    case types.SET_PROGRESS:
      return {...state, progress: action.payload > 0 ? action.payload : 0};
    default:
      return state;
      break;
  }
};
