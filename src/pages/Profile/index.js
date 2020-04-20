import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import CachedImage from 'react-native-image-cache-wrapper';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Divider} from 'react-native-elements';
import ListItemPost from '../../components/ListItemPost';
import {Colors, Typography} from '../../constants';
import {getUserPosts} from '../../actions/FeedActions';
import {signOut, signIn} from '../../actions/SignInActions';
import Icon from 'react-native-vector-icons/MaterialIcons';

//styles
import styles from './styles';
Icon.loadFont();

const Profile = (props) => {
  const {userId, userName, userPhotoURL} = props.user;

  props.navigation.setOptions({
    headerRight: () =>
      userId && userId != '' ? (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginRight: 10,
            alignItems: 'center',
          }}
          onPress={() => props.signOut()}>
          <Text
            style={{
              color: Colors.textColor,
              fontSize: Typography.smallFontSize,
              marginRight: 5,
            }}>
            Sair
          </Text>
          <Icon
            name={'exit-to-app'}
            size={Typography.mediumFontSize}
            color={Colors.textColor}
          />
        </TouchableOpacity>
      ) : (
        false
      ),
  });

  useEffect(() => {
    if (userId && userId != '') {
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
            // onEndReached={({distanceFromEnd}) => {
            //   props.endOfFeed
            //     ? false
            //     : props.refreshing
            //     ? false
            //     : props.getUserPosts(props.lastUserPostViewed);
            // }}
          />
        </>
      ) : (
        <>
          <Text onPress={() => props.signIn()}>SignIn</Text>
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

export default connect(mapStateToProps, {getUserPosts, signOut, signIn})(
  Profile,
);
