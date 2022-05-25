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
import {AuthContext} from '../navigation/AuthProvider';
import Header from '../components/Header';
import LevelComponent from '../components/LevelComponent';
import GeneralButton from '../components/GeneralButton';
import Navigation from '../navigation/Navigation';
import HomeScreen from './HomeScreen';

const ChooseLevelScreen = ({navigation}) => {
  const [level, setLevel] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Choose Your Level</Text>
      </View>

      <LevelComponent sendValue={value => setLevel(value)} />
      <GeneralButton
        title={'Done'}
        onPress={() => {
          navigation.navigate('navigationscr');
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    marginTop: Platform.OS === 'ios' ? 50 : null,
    marginLeft: Platform.OS === 'ios' ? 10 : null,
  },
  text: {
    marginTop: 30,
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    lignself: 'center',
    marginBottom: 40,
  },
});

export default ChooseLevelScreen;
