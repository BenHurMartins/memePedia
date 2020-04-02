//Sempre deixar em primeiro
import 'react-native-gesture-handler';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import {Ionicons} from '@expo/vector-icons';
//Constantes
import * as Colors from './src/constants/colors';

//Telas
import Home from './src/Home';
import NewMeme from './src/NewMeme';
import Profile from './src/Profile';
import SignIn from './src/user/SignIn';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
    // screenOptions={ ({route}) => {
    //   route.name == 'NewMeme'?
    // }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="NewMeme"
        component={NewMeme}
        options={{title: 'Novo Meme'}}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="SignIn" component={SignIn} />
    </ProfileStack.Navigator>
  );
};

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {color: Colors.textColor},
          activeBackgroundColor: '#000',
          inactiveBackgroundColor: '#111',
        }}
        // screenOptions={ ({route}) => {

        //   }
        // }
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Usuário" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
