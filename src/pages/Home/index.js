import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, FlatList, TouchableOpacity} from 'react-native';
import ListItemPost from '../../components/ListItemPost';
import ListItemAnuncio from '../../components/ListItemAnuncio';
import {connect} from 'react-redux';
import NewMemeButton from '../../components/NewMemeButton';
import firebase from 'firebase';
//actions
import {getPosts, toggleRefreshing} from '../../actions/FeedActions';
import {setUser} from '../../actions/SignInActions';
//styles
import styles from './styles';

//Constantes
import * as Colors from '../../constants/colors';
import {Divider, ListItem} from 'react-native-elements';

const Home = (props) => {
  firebase.auth().onAuthStateChanged((user) => {
    user ? props.setUser(user) : false;
  });

  useEffect(() => {
    props.getPosts(props.lastPostViewed);
  }, []);

  const keyExtractor = (item, index) => index.toString();

  props.mainFeed.forEach((element, index) => {
    console.log(element.title);
    console.log(index);
  });

  const renderItem = ({item}) => {
    if (item.category == 'anuncio') {
      return (
        <>
          <ListItemAnuncio navigation={props.navigation} post={item} />
          <Divider style={styles.divider} />
        </>
      );
    } else {
      return (
        <>
          <ListItemPost navigation={props.navigation} post={item} />
          <Divider style={styles.divider} />
        </>
      );
    }
  };

  const onRefresh = () => {
    // return false;
    props.getPosts('0');
  };

  const {container} = styles;

  return (
    <SafeAreaView style={{container}}>
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

export default connect(mapStateToProps, {getPosts, toggleRefreshing, setUser})(
  Home,
);
