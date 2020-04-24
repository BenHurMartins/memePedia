import React, {Component, useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, Linking} from 'react-native';
import {Divider} from 'react-native-elements';
import ReactionBar from '../components/ReactionBar';
import CachedImage from 'react-native-image-cache-wrapper';

//styles
import styles from './styles';

//constantes
import {Colors, Dimensions} from '../constants/';

const postBorderColor = (date, goodReactions) => {
  let postColor = Colors.white;

  return postColor;
};

export const ListItemAnuncio = (props) => {
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
        marginVertical: 20,
        // height:
        //   contentHeight == 0
        //     ? imageMinHeight + Dimensions.deviceWidth40
        //     : contentHeight + Dimensions.deviceWidth40,
      }}>
      <TouchableOpacity onPress={() => Linking.openURL(props.post.redirectUrl)}>
        {/* <Text style={styles.memeTitle}>{props.post.title}</Text> */}
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
      {/* <ReactionBar
        likes={props.post.likes}
        dislikes={props.post.dislikes}
        postId={props.post._id}
        navigation={() =>
          props.navigation.navigate('ShowMeme', {
            post: props.post,
            testeComponente: this,
          })
        }
      /> */}
    </View>
  );
};

export default ListItemAnuncio;
