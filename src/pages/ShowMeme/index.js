import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {Divider, Input, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from '../../constants';
import firebase from 'firebase';
import axios from 'axios';

//api
import {POST_NEW_COMMENT, POST_NEW_USER} from '../../api/api';
//actions
import {getPosts} from '../../actions/FeedActions';
//styles
import styles from './styles';

//Constantes
import * as Colors from '../../constants/colors';

import {mockComments} from '../../../mock/mockComments';

const ShowMeme = (props) => {
  const {post} = props.route.params;
  const behavior = Platform.OS === 'ios' ? 'position' : '';

  //State
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const commentInput = () => {
    return showCommentInput ? (
      <View style={styles.viewInputContainer}>
        <Input
          label={'Comentário'}
          labelStyle={styles.labelInput}
          placeholder="Comente!"
          inputStyle={styles.textInput}
          inputContainerStyle={styles.inputContainer}
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity
          onPress={() => sendComment()}
          style={styles.floatingButton}>
          <Icon
            name={'send'}
            color={Colors.black}
            size={Dimensions.deviceWidth7}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity
        onPress={() => setShowCommentInput(true)}
        style={styles.floatingButton}>
        <Icon
          name={'comment'}
          color={Colors.black}
          size={Dimensions.deviceWidth7}
        />
      </TouchableOpacity>
    );
  };

  const sendComment = () => {
    const {userId, userName, userPhotoURL} = props.user;

    if (userId && userId != '') {
      const date = new Date();

      axios
        .post(POST_NEW_COMMENT, {
          postId: post._id,
          comment: comment,
          userId: userId,
          userName: userName,
          userPhotoURL: userPhotoURL,
          date: date,
        })
        .then((response) => {
          Alert.alert('Sucesso', 'Comentário enviado');
          setComment('');
          setShowCommentInput(false);
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Erro', 'Algo deu errado, tente comentar daqui a pouco ');
          setComment('');
          setShowCommentInput(false);
        });
    } else {
      Alert.alert(
        'Erro',
        'Usuário não autenticado, favor se autenticar na área de Usuário',
      );
    }
  };

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => {
    return (
      // <View>
      //   <Divider style={styles.divider} />

      //   <View style={styles.commentView}>
      //     <Text style={styles.commentText}>{item.comment}</Text>
      //   </View>
      // </View>
      <ListItem
        leftAvatar={{
          source: {uri: item.userPhotoURL},
          containerStyle: styles.avatarStyle,
        }}
        title={item.userName}
        subtitle={item.comment}
        containerStyle={styles.commentView}
        titleStyle={styles.userNameText}
        subtitleStyle={styles.commentText}
        topDivider
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={behavior}
        enabled
        keyboardVerticalOffset={80}>
        <ScrollView contentContainerStyle={styles.containerScrollView}>
          <Image
            style={styles.image}
            source={{
              uri: post.contentUrl,
            }}
          />
          <View style={styles.likesBar}>
            <Text style={styles.commentText}>Gostei: {post.likes}</Text>
            <Text style={styles.commentText}>Não gostei: {post.dislikes}</Text>
          </View>
          {/* <Text>ShowMeme</Text>
        <Text>{post._id}</Text> */}
          <FlatList
            //   style={{backgroundColor: Colors.background}}
            keyExtractor={keyExtractor}
            data={mockComments}
            refreshing={refreshing}
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
        </ScrollView>
        {commentInput()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

mapStateToProps = (state) => {
  const {user} = state.SignInReducer;
  return {user};
};

export default connect(mapStateToProps, {getPosts})(ShowMeme);
