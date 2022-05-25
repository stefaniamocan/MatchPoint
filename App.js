import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from './src/navigation/Routes';
import React, {useState, useEffect} from 'react';
import AuthStack from './src/navigation/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ChooseLevelScreen from './src/screens/ChooseLevelScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
        <Stack.Screen
          name="navigationscr"
          component={Navigation}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
