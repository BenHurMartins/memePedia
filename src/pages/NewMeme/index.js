import React, {useEffect, useState} from 'react';
import firebase from 'firebase';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

//styles
import styles from './styles';

Icon.loadFont();

const NewMeme = props => {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    let buscaRef = firebase.database().ref('/teste/');
    buscaRef.on('value', snapshot => {
      console.log(snapshot.val());
      // setTeste(snapshot.val());
    });
  }, []);

  const renderTags = inputTags => {
    let arrayDeTags = inputTags.split(' ');
    if (arrayDeTags.length <= 3 && tags.join(' ').length < 144) {
      setTags(arrayDeTags);
      // setTagField(arrayDeTags.join(' '));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>NewMeme</Text>
      <View style={styles.viewInputContainer}>
        <Input
          label={'Título'}
          labelStyle={styles.labelInput}
          placeholder="Título aqui, seja criativo!"
          inputStyle={styles.textInput}
          inputContainerStyle={styles.inputContainer}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.viewInputContainer}>
        <Input
          onChangeText={text => renderTags(text)}
          label={'Tags'}
          labelStyle={styles.labelInput}
          placeholder="Tags para identificar sua postagem"
          inputStyle={styles.textInput}
          inputContainerStyle={styles.inputContainer}
          value={tags.join(' ')}
          maxLength={60}
        />
      </View>
      <TouchableOpacity
        style={styles.uploadContentButton}
        onPress={() => false}>
        <Icon name={'camera'} color={'black'} size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NewMeme;
