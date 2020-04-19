import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import CachedImage from 'react-native-image-cache-wrapper';
import {SafeAreaView, View, Text, FlatList} from 'react-native';
import {Divider} from 'react-native-elements';
import ListItemPost from '../../components/ListItemPost';
import {Colors} from '../../constants';
import {getUserPosts, teste} from '../../actions/FeedActions';
//styles
import styles from './styles';

const Profile = (props) => {
  const {userId, userName, userPhotoURL} = props.user;

  useEffect(() => {
    if (userId) {
      // teste(userId);
      props.getUserPosts(userId);
    }
  }, []);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => {
    return (
      <>
        <Divider style={styles.divider} />
        <ListItemPost navigation={props.navigation} post={item} />
      </>
    );
  };
  const onRefresh = () => {
    props.getUserPosts(userId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {userId && userId != '' ? (
        <>
          <View style={styles.userInfoView}>
            <CachedImage
              resizeMode={'contain'}
              style={styles.avatar}
              source={{
                uri: userPhotoURL,
              }}
            />
            <Text style={styles.userNameText}>{userName}</Text>
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.text}>Minha Obra</Text>
          <FlatList
            style={{backgroundColor: Colors.background}}
            keyExtractor={keyExtractor}
            data={props.userFeed}
            refreshing={props.refreshing}
            onRefresh={() => onRefresh()}
            renderItem={renderItem}
            onEndReached={({distanceFromEnd}) => {
              props.endOfFeed
                ? false
                : props.refreshing
                ? false
                : props.getUserPosts(props.lastUserPostViewed);
            }}
          />
        </>
      ) : (
        <>
          <Text>Realizar Login</Text>
          <Text onPress={() => props.navigation.navigate('SignIn')}>
            Go to Signin
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

mapStateToProps = (state) => {
  const {user} = state.SignInReducer;
  const {userFeed, refreshing} = state.FeedReducer;
  return {user, userFeed, refreshing};
};

export default connect(mapStateToProps, {getUserPosts})(Profile);
