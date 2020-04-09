import * as types from './types';
import firebase from 'firebase';
import {Platform, Alert} from 'react-native';
import axios from 'axios';
import {NEW_POST, GET_POSTS} from '../api/api';

export const getPosts = (lastViewedPost) => {
  return async (dispatch) => {
    dispatch({type: types.TOGGLE_REFRESHING, payload: true});

    axios
      .get(GET_POSTS, {lastViewedPost})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          'Erro',
          'Algo deu errado, atualizar as postagens mais tarde ou verifique a sua conexão com a internet ',
        );
      });
  };
};

export const newPost = (title, tags, content, navigation) => {
  return async (dispatch) => {
    dispatch({type: types.TOGGLE_POSTING, payload: true});

    let downloadURL = await uploadContent(content, dispatch);
    let date = getNumericDate();
    let userID = firebase.auth().currentUser.uid;
    const post = {
      title: title,
      contentUrl: downloadURL,
      views: 0,
      tags: tags,
      category: 'beta_posts',
      date: date,
      user: userID,
      likes: 0,
      dislikes: 0,
    };
    axios
      .post(NEW_POST, {
        post,
      })
      .then((response) => {
        console.log(response);
        dispatch({type: types.TOGGLE_POSTING, payload: false});
        dispatch({type: types.SET_PROGRESS, payload: 0});
        navigation.popToTop();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Erro', 'Algo deu errado, tenta de novo mais tarde / ToT ');
      });
  };
};

// Internal methods

const uploadContent = async (content, dispatch) => {
  return new Promise(async (resolve, reject) => {
    let url = '';
    uriToBlob(content.uri).then((blob) => {
      const storageRef = firebase
        .storage()
        .ref(`/images/${randomFileName()}.jpg`);

      let uploadTask = storageRef.put(blob);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          dispatch({type: types.SET_PROGRESS, payload: progress});
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            url = downloadURL;
            resolve(url);
          });
        },
      );
    });
  });
};

const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      // something went wrong
      reject(new Error('uriToBlob failed'));
    };
    // this helps us get a blob
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);

    xhr.send(null);
  });
};

const randomFileName = () => {
  const USABLE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
    '',
  );

  return new Array(16)
    .fill(null)
    .map(() => {
      return USABLE_CHARACTERS[
        Math.floor(Math.random() * USABLE_CHARACTERS.length)
      ];
    })
    .join('');
};

const getNumericDate = () => {
  const datinha = new Date();
  const year = datinha.getFullYear();
  const month =
    datinha.getMonth().toString().length < 2
      ? '0' + (datinha.getMonth() + 1).toString()
      : datinha.getMonth() + 1;
  const day =
    datinha.getDate().toString().length < 2
      ? '0' + datinha.getDate().toString()
      : datinha.getDate();

  return year.toString() + month.toString() + day.toString();
};
