import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
//actions
import {getPosts} from '../../actions/FeedActions';
//styles
import styles from './styles';

//Constantes
import * as Colors from '../../constants/colors';

const ShowMeme = (props) => {
  const {post} = props.route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: post.contentUrl,
        }}
      />
      <Text>ShowMeme</Text>
      <Text>{post._id}</Text>
    </SafeAreaView>
  );
};

mapStateToProps = (state) => {
  const {mainFeed, lastPostViewed, endOfFeed, refreshing} = state.FeedReducer;
  return {mainFeed, lastPostViewed, endOfFeed, refreshing};
};

export default connect(mapStateToProps, {getPosts})(ShowMeme);
