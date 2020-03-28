/**
 * @format
 */

// import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from 'firebase';
import {firebaseConfig} from './firebase.config';

firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
