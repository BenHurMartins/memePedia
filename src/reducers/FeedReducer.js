import * as types from '../actions/types';

//mock for tests
import {posts} from '../../mock/mockPosts';

const INITIAL_STATE = {
  mainFeed: [],
  userFeed: [],
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
    case types.SET_USER_FEED:
      return {...state, userFeed: action.payload};
      break;
    case types.TOGGLE_REFRESHING:
      return {...state, refreshing: action.payload};
      break;
    case types.SET_END_OF_FEED:
      return {...state, endOfFeed: action.payload};
    // case types.REMOVE_POST:
    //   let filteredMainFeed = state.mainFeed.filter((element) => {
    //     return element._id != action.payload;
    //   });
    //   let filteredUserFeed = state.mainFeed.filter((element) => {
    //     return element._id != action.payload;
    //   });
    //   return {...state, mainFeed: filteredMainFeed, userFeed: filteredUserFeed};
    default:
      return state;
      break;
  }
};
