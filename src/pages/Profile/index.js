import React, {useEffect, useState} from 'react';
import firebase from 'firebase';

//styles
import styles from './styles';

import {SafeAreaView, View, Text} from 'react-native';

const Profile = props => {
  console.log(props);
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

  const {container} = styles;

  return (
    <SafeAreaView style={container}>
      <Text>Profile</Text>
      <Text onPress={() => props.navigation.navigate('SignIn')}>
        Go to Signin
      </Text>
    </SafeAreaView>
  );
};

export default Profile;
