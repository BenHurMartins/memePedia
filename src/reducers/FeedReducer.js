import * as types from '../actions/types';

//mock for tests
import {posts} from '../../mock/mockPosts';

const INITIAL_STATE = {
  mainFeed: [...posts],
  lastPostViewed: '0',
  endOfFeed: false,
  refreshing: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_POSTS:
      return {...state, mainFeed: action.payload};
      break;
    case types.SET_MORE_POSTS:
      let newPosts = [...state.mainFeed, ...action.payload];
      return {...state, mainFeed: newPosts};
      break;
    case types.SET_LAST_VIEWED_POST:
      return {...state, lastPostViewed: action.payload};
      break;
    case types.TOGGLE_REFRESHING:
      return {...state, refreshing: action.payload};
      break;
    case types.SET_END_OF_FEED:
      return {...state, endOfFeed: action.payload};
    default:
      return state;
      break;
  }
};
