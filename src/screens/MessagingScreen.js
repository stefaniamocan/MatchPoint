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
import {getDatabase, ref, set} from 'firebase/database';
import {authentication} from '../api/firebase';
import {db} from '../api/firebase';
import GeneralButton from '../components/GeneralButton';
import {realtimedb} from '../api/firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
const MessagingScreen = ({navigation}) => {
  const getdata = () => {
    set(ref(realtimedb, 'users/' + authentication.currentUser.id), {
      username: 'sdf',
      email: 'sdf',
      profile_picture: 's',
    });
  };
  return (
    <View>
      <GeneralButton
        title={'Register'}
        onPress={() => navigation.navigate('ChatScreen')}
        // buttonStyle={styles.buttonStyle}
        //onPress={() => navigation.navigate('ChooseLevelScreen')}
      />
    </View>
  );
};

export default MessagingScreen;
