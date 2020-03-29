import React, {useEffect, useState} from 'react';
import firebase from 'firebase';
import {GoogleSignin} from '@react-native-community/google-signin';

import {SafeAreaView, View, Text} from 'react-native';

const SignIn = () => {
  const [teste, setTeste] = useState('teste2');
  useEffect(() => {
    console.log('Teste');
    let buscaRef = firebase.database().ref('/teste/');
    buscaRef.on('value', snapshot => {
      console.log(snapshot.val());
      setTeste(snapshot.val());
    });
  }, []);
  //   useEffect(() => {
  //     setTeste('teste');
  //   }, []);

  const handleSignIn = async () => {
    configureGoogle();
    await GoogleSignin.hasPlayServices();
    GoogleSignin.signIn()
      .then(data => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken,
        );
        // Login with the credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then(user => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch(error => {
        const {code, message} = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  };

  const configureGoogle = () => {
    GoogleSignin.configure({
      iosClientId:
        '324554633935-d14adufhgj8uj389ui9kc8sol3rptcs6.apps.googleusercontent.com', // only for iOS
      webClientId:
        '324554633935-3km9mn4ssei6gscji5cnokamk55fjldm.apps.googleusercontent.com',
    });
    // handleSignIn2();
  };

  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text onPress={() => handleSignIn()}>SignIn</Text>
      <Text>{teste}</Text>
    </SafeAreaView>
  );
};

export default SignIn;
