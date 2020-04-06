import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const BackButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.uploadContentButton}
        onPress={() => props.navigation.goBack()}>
        <Text style={styles.textButton}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
