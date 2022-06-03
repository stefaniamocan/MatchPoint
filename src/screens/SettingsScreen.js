import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Input from '../components/Input';
import TextButton from '../components/TextButton';
import Feather from 'react-native-vector-icons/Feather';
import {withNavigation} from 'react-navigation';

import Header from '../components/Header';

const SettingsScreen = ({navigation}) => {
  console.log('HomeScreen');

  return (
    <ScrollView style={styles.container}>
      {/* <Button title="Sign out" onPress={() => logout()} /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
