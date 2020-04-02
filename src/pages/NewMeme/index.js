import React, {useEffect, useState} from 'react';
import firebase from 'firebase';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

//styles
import styles from './styles';

Icon.loadFont();

import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

const NewMeme = props => {
  const [tags, setTags] = useState([]);
  const [blockTagField, setBlockTagField] = useState(false);

  useEffect(() => {
    let buscaRef = firebase.database().ref('/teste/');
    buscaRef.on('value', snapshot => {
      console.log(snapshot.val());
      // setTeste(snapshot.val());
    });
  }, []);

  const renderTags = inputTags => {
    let arrayDeTags = inputTags.split(' ');
    if (arrayDeTags.length <= 3 && inputTags.length < 144) {
      setTags(arrayDeTags);
      // setTagField(arrayDeTags.join(' '));
    } else {
      setBlockTagField(true);
    }
  };

  const {container} = styles;

  return (
    <SafeAreaView style={container}>
      <Text>NewMeme</Text>
      <Input
        placeholder="INPUT WITH CUSTOM ICON"
        leftIcon={<Icon name="user" size={24} color="black" />}
      />
      <Input
        onChangeText={text => renderTags(text)}
        placeholder="Tags"
        value={tags.join(' ')}
      />
    </SafeAreaView>
  );
};

export default NewMeme;
