import React, {useState, useContext} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import Input from '../components/Input';
import GeneralButton from '../components/GeneralButton';
import TextButton from '../components/TextButton';
import Feather from 'react-native-vector-icons/Feather';
import {withNavigation} from 'react-navigation';
import ChooseLevelScreen from './ChooseLevelScreen';

import {authentication} from '../api/firebase';
import {db} from '../api/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

import {
  collection,
  getDoc,
  setDoc,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';

const RegisterScreen = ({navigation, iconshow}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [username, setUsername] = useState('');
  const [uidUser, setuidUser] = useState('');

  const handleSignUp = () => {
    if (password !== cpassword) {
      alert('Passwords do not match.');
    } else {
      createUserWithEmailAndPassword(authentication, email.trim(), password)
        .then(() => {
          newFirestoreUser();
          navigation.navigate('ChooseLevelScreen');
        })
        .catch((error, re) => {
          alert(error.message);
          console.log(re);
        });
    }
  };

  const newFirestoreUser = async () => {
    try {
      const ref = doc(db, 'users', authentication.currentUser.email);
      await setDoc(ref, {
        name: username,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.loginText}>Register</Text>
      <Text style={styles.subText}>Create your account</Text>
      <Input
        title="YOUR NAME"
        passwordfield={false}
        iconshow={false}
        onChangeText={newValue => setUsername(newValue)}
      />
      <Input
        title="EMAIL"
        passwordfield={false}
        iconshow={false}
        onChangeText={newValue => setEmail(newValue)}
      />
      <Input
        title="PASSWORD"
        passwordfield={true}
        iconshow={true}
        onChangeText={newValue => setPassword(newValue)}
      />

      <Input
        title="CONFIRM PASSWORD"
        iconshow={false}
        onChangeText={newValue => setcPassword(newValue)}
      />
      <GeneralButton
        title={'Register'}
        onPress={() => handleSignUp()}
        //onPress={() => navigation.navigate('ChooseLevelScreen')}
      />
      <TextButton
        containerStyle={styles.registerContainer}
        textStyle={styles.registerText}
        title={'I have an account'}
        onPress={() => navigation.navigate('Login')}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  //Login Header
  loginText: {
    marginHorizontal: 20,
    fontSize: 22,
    color: '#424242',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 7,
  },
  subText: {
    marginHorizontal: 20,
    fontSize: 15,
    color: '#979797',
    marginBottom: 30,
  },

  //textButton styles

  registerContainer: {
    marginTop: 30,
    marginBottom: 20,
  },

  registerText: {
    fontSize: 17,
    fontWeight: '400',
  },
});

export default RegisterScreen;
