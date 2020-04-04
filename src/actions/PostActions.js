import * as types from './types';
import firebase from 'firebase';
import {Platform} from 'react-native';

export const newPost = (title, tags, content) => {
  return async (dispatch) => {
    console.log(content, title, tags);

    let downloadURL = await uploadContent(content, dispatch);
    console.log('downaload url' + downloadURL);
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
          console.log(snapshot);
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
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
