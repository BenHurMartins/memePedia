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
import ReactionBar from '../../components/ReactionBar';
import ListItemPost from '../../components//ListItemPost';
//api
import {POST_NEW_COMMENT, GET_COMMENTS} from '../../api/api';
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
  const {userId, userName, userPhotoURL} = props.user;

  //State
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    getComments();
  }, []);

  const getComments = () => {
    axios
      .get(GET_COMMENTS, {params: {postId: post._id}})
      .then((response) => {
        let comments = response.data;
        setComments(comments);
        setRefreshing(false);
      })
      .catch((error) => {
        dispatch({type: types.TOGGLE_REFRESHING, payload: false});
        console.log(error);
        setRefreshing(false);
        Alert.alert(
          'Erro',
          'Algo deu errado, Não foi possível carregar os comentários para essa página ',
        );
      });
  };

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
          onBlur={() => setShowCommentInput(false)}
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
    if (comment.length == 0) {
      alert('Você precisa comentar alguma coisa para enviar');
      setShowCommentInput(false);
      return false;
    }
    if (userId && userId != '') {
      const date = new Date();
      setComment('');
      setShowCommentInput(false);

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
          setRefreshing(true);
          getComments();
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
          {/* <Image
            style={styles.image}
            source={{
              uri: post.contentUrl,
            }}
          />
          <ReactionBar
            likes={post.likes}
            dislikes={post.dislikes}
            postId={post._id}
            userId={userId}
          /> */}
          {
            //hlc = high level component, or father component}
          }
          <ListItemPost
            navigation={props.navigation}
            post={post}
            hlc={'ShowMeme'}
          />
          {comments.length > 0 ? (
            <FlatList
              //   style={{backgroundColor: Colors.background}}
              keyExtractor={keyExtractor}
              data={comments}
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              renderItem={renderItem}
            />
          ) : (
            <Text style={styles.commentText}>
              Não há comentários para essa postagem, seja o primeiro a comentar!
            </Text>
          )}
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
