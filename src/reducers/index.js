import {combineReducers} from 'redux';

import PostReducer from './PostReducer';
import FeedReducer from './FeedReducer';

export default combineReducers({
  PostReducer,
  FeedReducer,
});
