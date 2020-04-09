import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {Dimensions, Colors} from '../constants';

const NewMemeButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('NewMeme')}
      style={styles.floatingButton}>
      <Icon name={'plus'} color={Colors.black} size={Dimensions.deviceWidth7} />
    </TouchableOpacity>
  );
};

export default NewMemeButton;
