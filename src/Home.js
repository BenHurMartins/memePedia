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
import ListItemPost from './components/ListItemPost';

//Constantes
import * as Colors from './constants/colors';

//Mock
import {posts} from '../mock/mockPosts';
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
  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
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
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'red',
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 2,
          right: 10,
          bottom: 10,
        }}>
        <Text style={{color: 'white', fontSize: 25}}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
