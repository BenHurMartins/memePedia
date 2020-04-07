import React, {useEffect, useState} from 'react';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';

//actions
import {newPost} from '../../actions/PostActions';
//styles
import styles from './styles';
import BackButton from '../../components/BackButton';
import {Colors} from '../../constants';

Icon.loadFont();

const NewMeme = (props) => {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(null);

  const renderTags = (inputTags) => {
    let arrayDeTags = inputTags.split(' ');
    if (arrayDeTags.length <= 3 && tags.join(' ').length < 144) {
      setTags(arrayDeTags);
      // setTagField(arrayDeTags.join(' '));
    }
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
      quality: Platform.OS == 'ios' ? 0.1 : 0.3,
      mediaType: 'photo',
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setContent(response);
      }
    });
  };

  const postContent = () => {
    props.newPost(title, tags, content, props.navigation);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        // visible={props.posting}
        visible={props.posting}
        transparent={true}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color={Colors.white} />
          <Text style={styles.textProgress}>{props.progress}/100</Text>
        </View>
      </Modal>

      <BackButton navigation={props.navigation} />
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
          onChangeText={(text) => renderTags(text)}
          label={'Tags'}
          labelStyle={styles.labelInput}
          placeholder="Tags para identificar sua postagem"
          inputStyle={styles.textInput}
          inputContainerStyle={styles.inputContainer}
          value={tags.join(' ')}
          maxLength={60}
        />
      </View>
      {content == null ? (
        <TouchableOpacity
          style={styles.uploadContentButton}
          onPress={() => handleChoosePhoto()}>
          <Icon name={'camera'} color={'black'} size={30} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.uploadContentImageView}
          onPress={() => handleChoosePhoto()}>
          <Image
            source={{
              uri: content.uri,
            }}
            style={styles.uploadContentImageView}
            // style={{width: 300, height: 300}}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.uploadContentButton}
        onPress={() => postContent()}>
        <Text style={styles.textButton}>Vai!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

mapStateToProps = (state) => {
  const {progress, posting} = state.PostReducer;
  return {progress, posting};
};

export default connect(mapStateToProps, {newPost})(NewMeme);
