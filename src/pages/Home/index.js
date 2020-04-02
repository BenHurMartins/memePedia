import React, {useEffect, useState} from 'react';
import firebase from 'firebase';

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ShadowPropTypesIOS,
} from 'react-native';
import ListItemPost from '../ListItemPost';

//styles

import styles from './styles';

//Constantes
import * as Colors from '../../constants/colors';

//Mock
import {posts} from '../../../mock/mockPosts';
import {color} from 'react-native-reanimated';

const Home = props => {
  const [teste, setTeste] = useState('teste2');
  useEffect(() => {
    console.log('Teste');
    let buscaRef = firebase.database().ref('/teste/');
    buscaRef.on('value', snapshot => {
      console.log(snapshot.val());
      setTeste(snapshot.val());
    });
  }, []);
  //   useEffect(() => {
  //     setTeste('teste');
  //   }, []);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => {
    return <ListItemPost title={item.title} content={item.content} />;
  };

  const getMaisPosts = () => {
    return false;
  };

  const {container, floatingButton, floatingButtonText} = styles;

  return (
    <SafeAreaView style={container}>
      <FlatList
        style={{backgroundColor: Colors.background}}
        keyExtractor={keyExtractor}
        data={posts}
        refreshing={false /* incluri depois */}
        onRefresh={() => this.onRefresh()}
        renderItem={renderItem}
        onEndReached={({distanceFromEnd}) => {
          getMaisPosts();
        }}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('NewMeme')}
        style={floatingButton}>
        <Text style={floatingButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
