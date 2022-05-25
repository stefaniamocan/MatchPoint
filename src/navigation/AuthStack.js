import React, {useState} from 'react';
import {createAppContainer} from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ChooseLevelScreen from '../screens/ChooseLevelScreen';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Login'} headerShown={false}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ChooseLevelScreen"
        component={ChooseLevelScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;