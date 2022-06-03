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
} from 'react-native';
import Input from '../components/Input';
import GeneralButton from '../components/GeneralButton';
import TextButton from '../components/TextButton';
import Feather from 'react-native-vector-icons/Feather';
import Toogle from '../components/Toogle';

import {authentication} from '../api/firebase';
import {db} from '../api/firebase';
import {
  createUserWithEmailAndPassword,
  setPersistence,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const handleLogin = () => {
    signInWithEmailAndPassword(authentication, email.trim(), password)
      .then(re => {
        console.log(re);
        navigation.navigate('navigationscr');
      })
      .catch(error => alert(error.message));
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(authentication, email.trim())
      .then(() => {
        alert('Reset email has been sent to ' + email);
      })
      .catch(error => alert(error.message));
  };

  return (
    <ScrollView style={styles.app}>
      <Text style={styles.loginText}>Login</Text>
      <Text style={styles.subText}>Sign to your account</Text>
      <Input
        title="Your Email"
        passwordfield={false}
        iconshow={false}
        onChangeText={newValue => setEmail(newValue)}
      />

      <Input
        title="Password"
        passwordfield={true}
        iconshow={true}
        onChangeText={newValue => setPassword(newValue)}
      />

      <View style={styles.viewStyle}>
        <Toogle />
        <TextButton
          containerStyle={styles.forgotPasswordContainer}
          textStyle={styles.forgotPasswordText}
          title={'Forgot password?'}
          onPress={() => handleForgotPassword()}
        />
      </View>

      <GeneralButton
        title={'Login'}
        onPress={() => handleLogin()}
        buttonStyle={styles.buttonStyle}
      />
      <TextButton
        containerStyle={styles.registerContainer}
        textStyle={styles.registerText}
        title={"Don't have an account?"}
        boldText={' Register'}
        onPress={() => navigation.navigate('Register')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  //Login Header
  loginText: {
    marginHorizontal: 20,
    fontSize: 22,
    color: '#000000',
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
  forgotPasswordContainer: {
    marginRight: 20,
  },

  forgotPasswordText: {
    color: '#36B199',
    marginTop: 0,
    fontSize: 15,
    fontWeight: '500',
  },

  registerContainer: {
    marginTop: 30,
  },

  registerText: {
    fontSize: 15,
  },

  viewStyle: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonStyle: {marginTop: 20},
});

export default LoginScreen;
