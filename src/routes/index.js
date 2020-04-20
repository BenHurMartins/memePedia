import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {setUser, signOut} from '../actions/SignInActions';

//Telas
import Home from '../pages/Home';
import NewMeme from '../pages/NewMeme';
import Profile from '../pages/Profile';
import ShowMeme from '../pages/ShowMeme';

//syles
import {Colors, Typography, Dimensions} from '../constants';

Icon.loadFont();

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
        options={({navigation, route}) => ({
          headerTitle: 'Novo Meme',
          ...headerGlobalStyles(),
          headerLeftContainerStyle: {
            width: Dimensions.deviceWidth50,
            marginLeft: 10,
          },
          headerLeft: () => (
            <Icon
              onPress={() => navigation.goBack()}
              name={'chevron-left'}
              size={Typography.bigFontSize}
              color={Colors.textColor}
            />
          ),
        })}
        // options={{headerTitle: 'Novo Meme', headerShown: false}}
      />
      <HomeStack.Screen
        name="ShowMeme"
        component={ShowMeme}
        options={({navigation, route}) => ({
          headerTitle: 'Novo Meme',
          ...headerGlobalStyles(),
          headerLeftContainerStyle: {
            // width: Dimensions.deviceWidth50,
            marginLeft: 10,
          },
          headerLeft: () => (
            <Icon
              onPress={() => navigation.goBack()}
              name={'chevron-left'}
              size={Typography.bigFontSize}
              color={Colors.textColor}
            />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  // const {userId} = props.user;

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={({navigation, route}) => ({
          headerTitle: 'Perfil',
          ...headerGlobalStyles(),
          headerRightContainerStyle: {
            // width: Dimensions.deviceWidth50,
            marginLeft: 10,
          },
        })}
      />
    </ProfileStack.Navigator>
  );
};

const Routes = (props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {color: Colors.textColor},
          activeBackgroundColor: Colors.navigationBarSelected,
          inactiveBackgroundColor: Colors.navigationBar,
          style: {backgroundColor: Colors.headerColor},
          showLabel: false,
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'sentiment-satisfied';
                break;
              case 'Usuário':
                iconName = 'person';
                break;
              default:
                break;
            }
            return (
              <Icon
                name={iconName}
                size={
                  focused ? Typography.bigFontSize : Typography.mediumFontSize
                }
                color={Colors.textColor}
              />
            );
          },
        })}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Usuário" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
mapStateToProps = (state) => {
  const {user} = state.SignInReducer;
  return {user};
};

export default connect(mapStateToProps, {setUser, signOut})(Routes);
