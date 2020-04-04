import * as types from '../actions/types';

const INITIAL_STATE = {
  content: {},
  title: '',
  tags: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.NEW_POST:
      return {...state};
      break;

    default:
      return state;
      break;
  }
};
