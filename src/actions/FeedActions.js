import * as types from './types';
import firebase from 'firebase';
import {Platform, Alert} from 'react-native';
import axios from 'axios';
import {NEW_POST, GET_POSTS} from '../api/api';

export const getPosts = (lastPostViewed) => {
  return async (dispatch) => {
    dispatch({type: types.TOGGLE_REFRESHING, payload: true});

    axios
      .get(GET_POSTS, {params: {lastPostViewed: lastPostViewed}})
      .then((response) => {
        let posts = response.data;
        dispatch({type: types.TOGGLE_REFRESHING, payload: false});
        let newLastViewdPost = posts[posts.length - 1]._id;
        dispatch({type: types.SET_LAST_VIEWED_POST, payload: newLastViewdPost});
        if (lastPostViewed != 0) {
          //The first element is the same passed as parameter, so we need to shift the array
          if (posts.length == 0 || posts.length == 1)
            dispatch({type: types.SET_END_OF_FEED, payload: true});
          posts.shift();
          dispatch({type: types.SET_MORE_POSTS, payload: posts});
        } else {
          dispatch({type: types.SET_END_OF_FEED, payload: false});
          dispatch({type: types.SET_POSTS, payload: posts});
        }
      })
      .catch((error) => {
        dispatch({type: types.TOGGLE_REFRESHING, payload: false});
        console.log(error);
        Alert.alert(
          'Erro',
          'Algo deu errado, atualize as postagens mais tarde ou verifique a sua conexão com a internet ',
        );
      });
  };
};
