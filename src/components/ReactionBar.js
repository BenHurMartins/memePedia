import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {Dimensions, Colors} from '../constants';
import {REACT} from '../api/api';
import axios from 'axios';

const ReactionBar = (props) => {
  const [updatedLikes, setUpdatedLikes] = useState(0);
  const [updatedDislikes, setUpdatedDislikes] = useState(0);
  let {postId, likes, dislikes} = props;
  const {userId} = props.user;

  const react = (reactType) => {
    if (userId && userId != '') {
      const date = new Date();
      axios
        .post(REACT, {
          react: reactType,
          postId: postId,
          userId: userId,
          date: date,
        })
        .then((response) => {
          if (response.status == 204) {
            alert('Você já reagiu a essa postagem ');
          } else if (response.status == 202) {
            alert('Essa postagem foi considerada ofensiva e removida do feed');
          } else {
            switch (reactType) {
              case 'like':
                setUpdatedLikes(likes + 1);
                break;
              case 'dislike':
                setUpdatedDislikes(dislikes + 1);
                break;
              default:
                break;
            }
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(
            'Erro',
            'Algo deu errado, não foi possível reagir agora ',
          );
        });
    } else {
      Alert.alert(
        'Erro',
        'Usuário não autenticado, favor se autenticar na área de Usuário',
      );
    }
  };
  return (
    <View style={styles.reactionBar}>
      <TouchableOpacity style={styles.reaction} onPress={() => react('like')}>
        <Icon
          name={'thumbs-up'}
          color={Colors.white}
          size={Dimensions.deviceWidth7}
        />
        <Text style={styles.reactionText}>
          {updatedLikes > 0 ? updatedLikes : likes}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reaction}
        onPress={() => react('dislike')}>
        <Icon
          name={'thumbs-down'}
          color={Colors.white}
          size={Dimensions.deviceWidth7}
        />
        <Text style={styles.reactionText}>
          {updatedDislikes > 0 ? updatedDislikes : dislikes}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

mapStateToProps = (state) => {
  const {user} = state.SignInReducer;
  return {user};
};

export default connect(mapStateToProps, {})(ReactionBar);
