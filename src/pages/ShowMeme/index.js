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
import {Divider, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from '../../constants';
import firebase from 'firebase';
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
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');

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
    const userId = firebase.auth().currentUser;

    if (userId) {
      //fetch api
      setComment('');
      setShowCommentInput('false');
    } else {
      Alert.alert(
        'Erro',
        'Usuário não autenticado, favor se autenticar na área de Usuário',
      );
    }
  };

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => {
    console.log(item);
    return (
      <View>
        <Divider style={styles.divider} />

        <View style={styles.commentView}>
          <Text style={styles.commentText}>{item.comment}</Text>
        </View>
      </View>
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
        </ScrollView>
        {commentInput()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

mapStateToProps = (state) => {
  const {mainFeed, lastPostViewed, endOfFeed, refreshing} = state.FeedReducer;
  return {mainFeed, lastPostViewed, endOfFeed, refreshing};
};

export default connect(mapStateToProps, {getPosts})(ShowMeme);
