import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ChooseLevelScreen from './src/screens/ChooseLevelScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import ProfileRegistrationScreen from './src/screens/ProfileRegistrationScreen';
import GenderPickerScreen from './src/screens/GenderPickerScreen';

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
          name="Onboarding"
          component={OnboardingScreen}
          options={{header: () => null}}
        />

        <Stack.Screen
          name="ProfileRegistration"
          component={ProfileRegistrationScreen}
          options={{header: () => null}}
        />

        <Stack.Screen
          name="GenderPicker"
          component={GenderPickerScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="ChooseLevelScreen"
          component={ChooseLevelScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="navigationscr"
          component={Navigation}
          options={{header: () => null}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
