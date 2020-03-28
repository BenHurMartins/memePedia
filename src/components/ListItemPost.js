import React, {Component} from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';

//constantes
import * as Colors from '../constants/colors';
import * as Dimensions from '../constants/dimensions';

export const ListItemPost = props => {
  console.log(props);
  return (
    <TouchableOpacity
      onPress={() => false}
      style={{
        width: Dimensions.deviceWidth,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.deviceWidth90,
      }}>
      <Text style={{color: Colors.textColor}}>{props.title}</Text>
      <Image
        style={{
          width: Dimensions.deviceWidth80,
          height: Dimensions.deviceWidth80,
          borderWidth: 10,
          borderColor: 'white',
        }}
        source={{
          uri: props.content,
        }}
      />
    </TouchableOpacity>
  );
};

export default ListItemPost;
