import React, {useEffect, useState} from 'react';
import firebase from 'firebase';
import {GoogleSignin} from '@react-native-community/google-signin';
import {signIn, signOut} from '../../actions/SignInActions';
import {connect} from 'react-redux';
//styles
import styles from './styles';

import {SafeAreaView, View, Text} from 'react-native';

const SignIn = (props) => {
  const {container} = styles;

  return (
    <SafeAreaView style={container}>
      <Text onPress={() => props.signIn()}>SignIn</Text>
      <Text onPress={() => props.signOut()}>Sign out</Text>
    </SafeAreaView>
  );
};

mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {signIn, signOut})(SignIn);
