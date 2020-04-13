import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, FlatList, TouchableOpacity} from 'react-native';
import ListItemPost from '../ListItemPost';
import {connect} from 'react-redux';
import NewMemeButton from '../../components/NewMemeButton';
//actions
import {getPosts} from '../../actions/FeedActions';
//styles
import styles from './styles';

//Constantes
import * as Colors from '../../constants/colors';

const Home = (props) => {
  console.log(props);

  useEffect(() => {
    props.getPosts(props.lastPostViewed);
  }, []);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => {
    return <ListItemPost navigation={props.navigation} post={item} />;
  };

  const onRefresh = () => {
    props.getPosts('0');
  };

  const {container} = styles;

  return (
    <SafeAreaView style={container}>
      <FlatList
        style={{backgroundColor: Colors.background}}
        keyExtractor={keyExtractor}
        data={props.mainFeed}
        refreshing={props.refreshing}
        onRefresh={() => onRefresh()}
        renderItem={renderItem}
        onEndReached={({distanceFromEnd}) => {
          props.endOfFeed
            ? false
            : props.refreshing
            ? false
            : props.getPosts(props.lastPostViewed);
        }}
      />
      <NewMemeButton navigation={props.navigation} />
    </SafeAreaView>
  );
};

mapStateToProps = (state) => {
  const {mainFeed, lastPostViewed, endOfFeed, refreshing} = state.FeedReducer;
  return {mainFeed, lastPostViewed, endOfFeed, refreshing};
};

export default connect(mapStateToProps, {getPosts})(Home);
