import * as types from '../actions/types';

//mock for tests
import {posts} from '../../mock/mockPosts';

const INITIAL_STATE = {
  mainFeed: [...posts],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_MAIN_FEED:
      return {...state, mainFeed: action.payload};
      break;

    default:
      return state;
      break;
  }
};
