import React, {Component} from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';

//styles
import styles from './styles';

//constantes
import {Colors} from '../../constants/';

export const ListItemPost = props => {
  const {image, item} = styles;

  return (
    <TouchableOpacity onPress={() => false} style={item}>
      <Text style={{color: Colors.textColor}}>{props.title}</Text>
      <Image
        style={image}
        source={{
          uri: props.content,
        }}
      />
    </TouchableOpacity>
  );
};

export default ListItemPost;
