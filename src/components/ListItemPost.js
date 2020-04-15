import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
// import {Image} from 'react-native-elements';
import ReactionBar from '../components/ReactionBar';

//styles
import styles from './styles';

//constantes
import {Colors, Dimensions} from '../constants/';

export const ListItemPost = (props) => {
  // Só muda quando for redefinir o componente
  const [imageWidth, setImageWidth] = useState(Dimensions.deviceWidth80);
  const [postWidth, setPostWidth] = useState(Dimensions.deviceWidth);

  // Calculado para cada imagem
  const [imageHeight, setImageHeight] = useState(0);
  const [imageMinHeight, setImageMinHeight] = useState(
    Dimensions.deviceWidth80,
  );
  const [postHeight, setPostHeight] = useState(Dimensions.deviceWidth90);
  const [borderColor, setBorderColor] = useState(Colors.white);
  const [imageURL, setImageURL] = useState('');
  const {image, item} = styles;

  let contentHeight = 0;
  let contentWidth = 0;

  if (props.post.contentDimensions) {
    const widthDividen = imageWidth / props.post.contentDimensions.width;

    contentHeight = widthDividen * props.post.contentDimensions.height;
    contentWidth = props.post.contentDimensions.width;
  }
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ShowMeme', {
            post: props.post,
            testeComponente: this,
          })
        }
        style={{
          ...item,
          width: postWidth,
          height:
            contentHeight == 0
              ? imageMinHeight + Dimensions.deviceWidth20
              : contentHeight + Dimensions.deviceWidth20,
        }}>
        <Text style={{color: Colors.textColor}}>{props.post.title}</Text>
        <Image
          resizeMode={'contain'}
          style={{
            ...image,
            width: imageWidth,
            height: contentHeight == 0 ? imageMinHeight : contentHeight,
            minHeight: contentHeight == 0 ? imageMinHeight : 0,
            borderColor: borderColor,
          }}
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
