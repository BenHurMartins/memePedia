import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {Dimensions, Colors} from '../constants';
import {connect} from 'react-redux';

const NewMemeButton = (props) => {
  const {userId} = props.user;

  const handleNewMeme = () => {
    if (userId && userId != '') {
      props.navigation.navigate('NewMeme');
    } else {
      Alert.alert('', 'Para postar um meme você precisa estar logado');
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleNewMeme()}
      style={styles.floatingButton}>
      <Icon name={'plus'} color={Colors.black} size={Dimensions.deviceWidth7} />
    </TouchableOpacity>
  );
};

mapStateToProps = (state) => {
  const {user} = state.SignInReducer;
  return {user};
};

export default connect(mapStateToProps, {})(NewMemeButton);
