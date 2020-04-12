import {combineReducers} from 'redux';

import PostReducer from './PostReducer';
import FeedReducer from './FeedReducer';
import SignInReducer from './SignInReducer';

export default combineReducers({
  PostReducer,
  FeedReducer,
  SignInReducer,
});
