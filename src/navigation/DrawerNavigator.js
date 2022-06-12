import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import OverviewScreen from '../screens/OverviewScreen';
import Navigation from './Navigation';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawerContent from './CustomDrawerContent';
import LevelGuidelinesScreen from '../screens/LevelGuidelinesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Header from '../components/Header';
import {NavigationAction} from '@react-navigation/routers';
import RequestScreen from '../screens/RequestScreen';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="HomeScr" component={Navigation} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="RequestScreen" component={RequestScreen} />
      {/* <Drawer.Screen name="LevelGuidelines" component={LevelGuidelinesScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
