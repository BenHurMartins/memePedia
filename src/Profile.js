import React, {useEffect, useState} from 'react';
import firebase from 'firebase';

import {SafeAreaView, View, Text} from 'react-native';

const Profile = () => {
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
  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>Profile</Text>
      <Text>{teste}</Text>
    </SafeAreaView>
  );
};

export default Profile;
