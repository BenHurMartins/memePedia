import React, {useEffect, useState} from 'react';
import firebase from 'firebase';

import {SafeAreaView, View, Text, FlatList} from 'react-native';
import ListItemPost from './components/ListItemPost';

//Constantes
import * as Colors from './constants/colors';

//Mock
import {posts} from '../mock/mockPosts';

const Home = () => {
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
    </SafeAreaView>
  );
};

export default Home;
