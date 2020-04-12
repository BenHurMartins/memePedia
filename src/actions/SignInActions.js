import firebase from 'firebase';
import {GoogleSignin} from '@react-native-community/google-signin';
import * as types from './types';
import axios from 'axios';
import {POST_NEW_USER} from '../api/api';
import {Alert} from 'react-native';

export const setUser = (user) => {
  const {displayName, photoURL, uid} = user;
  return {
    type: types.SET_USER,
    payload: {
      userId: uid,
      userPhotoURL: photoURL,
      userName: displayName,
    },
  };
};

export const signOut = () => {
  return async (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Alert.alert('Sucesso', 'Você desconectou com sucesso :)');
        dispatch({
          type: types.SET_USER,
          payload: {userId: '', userPhotoURL: '', userName: ''},
        });
      });
  };
};

export const signIn = () => {
  return async (dispatch) => {
    configureGoogle();
    await GoogleSignin.hasPlayServices();
    GoogleSignin.signIn()
      .then((data) => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken,
        );
        // Login with the credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then((user) => {
        const {displayName, photoURL, uid} = user.user;
        axios
          .post(POST_NEW_USER, {
            userId: uid,
            userPhotoURL: photoURL,
            userName: displayName,
          })
          .then((response) => {
            Alert.alert('Sucesso', 'Você conectou com sucesso :)');

            dispatch({
              type: types.SET_USER,
              payload: {
                userId: uid,
                userPhotoURL: photoURL,
                userName: displayName,
              },
            });
          })
          .catch((error) => {
            console.log(error);
            Alert.alert(
              'Erro',
              'Algo deu errado, tenta de novo mais tarde / ToT ',
            );
          });
      })
      .catch((error) => {
        const {code, message} = error;
        console.log(error);
        Alert.alert(
          'Erro ao realizar o login',
          'Houve um erro ao tentar realizar o login, fazer tentar mais tarde.',
        );
      });
  };
};

const configureGoogle = () => {
  GoogleSignin.configure({
    iosClientId:
      '324554633935-d14adufhgj8uj389ui9kc8sol3rptcs6.apps.googleusercontent.com', // only for iOS
    webClientId:
      '324554633935-3km9mn4ssei6gscji5cnokamk55fjldm.apps.googleusercontent.com',
  });
};
