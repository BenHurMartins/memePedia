import React, {useEffect, useState} from 'react';

import {SafeAreaView, Text, FlatList, TouchableOpacity} from 'react-native';
import ListItemPost from '../ListItemPost';
import {connect} from 'react-redux';
//styles

import styles from './styles';

//Constantes
import * as Colors from '../../constants/colors';

const Home = (props) => {
  const [teste, setTeste] = useState('teste2');
  // useEffect(() => {
  //   let buscaRef = firebase.database().ref('/teste/');
  //   buscaRef.on('value', (snapshot) => {
  //     console.log(snapshot.val());
  //     setTeste(snapshot.val());
  //   });
  // }, []);
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

  const onRefresh = () => {
    return false;
  };

  const {container, floatingButton, floatingButtonText} = styles;

  return (
    <SafeAreaView style={container}>
      <FlatList
        style={{backgroundColor: Colors.background}}
        keyExtractor={keyExtractor}
        data={props.mainFeed}
        refreshing={false /* incluri depois */}
        onRefresh={() => onRefresh()}
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

mapStateToProps = (state) => {
  const {mainFeed} = state.FeedReducer;
  return {mainFeed};
};

export default connect(mapStateToProps, {})(Home);
