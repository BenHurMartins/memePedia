import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {setUser} from '../actions/SignInActions';

//Telas
import Home from '../pages/Home';
import NewMeme from '../pages/NewMeme';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import ShowMeme from '../pages/ShowMeme';

//syles
import {Colors} from '../constants';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const headerGlobalStyles = () => {
  return {
    headerStyle: {
      backgroundColor: Colors.headerColor,
    },
    headerTintColor: Colors.textColor,
  };
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{...headerGlobalStyles(), headerTitle: 'Hora dos Memes'}}
      />
      <HomeStack.Screen
        name="NewMeme"
        component={NewMeme}
        options={{headerTitle: 'Novo Meme', ...headerGlobalStyles()}}
        // options={{headerTitle: 'Novo Meme', headerShown: false}}
      />
      <HomeStack.Screen
        name="ShowMeme"
        component={ShowMeme}
        options={{...headerGlobalStyles()}}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{...headerGlobalStyles()}}
      />
      <ProfileStack.Screen
        name="SignIn"
        component={SignIn}
        options={{...headerGlobalStyles()}}
      />
    </ProfileStack.Navigator>
  );
};

const Routes = (props) => {
  firebase.auth().onAuthStateChanged((user) => {
    user ? props.setUser(user) : false;
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {color: Colors.textColor},
          activeBackgroundColor: Colors.navigationBarSelected,
          inactiveBackgroundColor: Colors.navigationBar,
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
mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {setUser})(Routes);
