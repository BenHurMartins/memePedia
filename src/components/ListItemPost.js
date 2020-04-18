import React, {Component, useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-elements';
import ReactionBar from '../components/ReactionBar';
import CachedImage from 'react-native-image-cache-wrapper';

//styles
import styles from './styles';

//constantes
import {Colors, Dimensions} from '../constants/';

const diferenceBetweenDays = (date) => {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  const postDate = new Date(year, month - 1, day);
  const today = new Date();
  const differenceInMs = today - postDate;

  return Math.floor(differenceInMs / (1000 * 3600 * 24));
};

const postBorderColor = (date, goodReactions) => {
  const countingDays = diferenceBetweenDays(date);
  const popularity = goodReactions / countingDays;
  let postColor = Colors.white;

  switch (true) {
    case popularity > 10 && popularity <= 100:
      postColor = Colors.green;
      break;
    case popularity > 100 && popularity <= 1000:
      postColor = Colors.blue;
      break;
    case popularity > 1000 && popularity <= 10000:
      postColor = Colors.purple;
      break;
    case popularity > 10000 && popularity <= 100000:
      postColor = Colors.orange;
      break;
    case popularity > 100000:
      postColor = Colors.red;
      break;
    default:
      postColor = Colors.white;
      break;
  }
  return postColor;
};
export const ListItemPost = (props) => {
  // Só muda quando for redefinir o componente
  const [imageWidth, setImageWidth] = useState(Dimensions.deviceWidth90);
  const [postWidth, setPostWidth] = useState(Dimensions.deviceWidth);

  // Calculado para cada imagem
  const [imageMinHeight, setImageMinHeight] = useState(
    Dimensions.deviceWidth80,
  );
  const {image, item} = styles;

  let contentHeight = 0;
  let contentWidth = 0;

  if (props.post.contentDimensions) {
    const widthDividen = imageWidth / props.post.contentDimensions.width;

    contentHeight = widthDividen * props.post.contentDimensions.height;
    contentWidth = props.post.contentDimensions.width;
  }
  return (
    <View
      style={{
        ...item,
        width: postWidth,
        // height:
        //   contentHeight == 0
        //     ? imageMinHeight + Dimensions.deviceWidth40
        //     : contentHeight + Dimensions.deviceWidth40,
      }}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ShowMeme', {
            post: props.post,
            testeComponente: this,
          })
        }>
        <Text style={styles.memeTitle}>{props.post.title}</Text>
        <CachedImage
          resizeMode={'contain'}
          style={{
            ...image,
            width: imageWidth,
            height: contentHeight == 0 ? imageMinHeight : contentHeight,
            minHeight: contentHeight == 0 ? imageMinHeight : 0,
            borderColor: postBorderColor(props.post.date, props.post.likes),
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
        navigation={() =>
          props.navigation.navigate('ShowMeme', {
            post: props.post,
            testeComponente: this,
          })
        }
      />
    </View>
  );
};

export default ListItemPost;
