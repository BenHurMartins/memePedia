import React, {Component} from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import ReactionBar from '../../components/ReactionBar';
//styles
import styles from './styles';

//constantes
import {Colors} from '../../constants/';

export const ListItemPost = (props) => {
  const {image, item} = styles;
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ShowMeme', {post: props.post})
        }
        style={item}>
        <Text style={{color: Colors.textColor}}>{props.post.title}</Text>
        <Image
          style={image}
          source={{
            uri: props.post.contentUrl,
          }}
        />
      </TouchableOpacity>
      <ReactionBar
        likes={props.post.likes}
        dislikes={props.post.dislikes}
        postId={props.post._id}
      />
    </>
  );
};

export default ListItemPost;
