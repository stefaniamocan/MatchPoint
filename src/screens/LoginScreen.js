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
    <ScrollView style={styles.iosLoginPart}>
      <Text style={styles.loginText}>Login</Text>
      <Text style={styles.subText}>Sign to your account</Text>
      <Input
        title="YOUR EMAIL"
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

      <View style={styles.viewStyle}>
        <Toogle />
        <TextButton
          containerStyle={styles.forgotPasswordContainer}
          textStyle={styles.forgotPasswordText}
          title={'Forgot password?'}
          onPress={() => handleForgotPassword()}
        />
      </View>

      <GeneralButton title={'Login'} onPress={() => handleLogin()} />
      <TextButton
        containerStyle={styles.registerContainer}
        textStyle={styles.registerText}
        title={"I don't have an account"}
        onPress={() => navigation.navigate('Register')}
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
  forgotPasswordContainer: {
    marginTop: -18,
    marginRight: 20,
  },

  forgotPasswordText: {
    color: '#A09C9C',
    marginTop: 0,
    fontSize: 15,
    fontWeight: '500',
  },

  registerContainer: {
    marginTop: 30,
  },

  registerText: {
    fontSize: 17,
    fontWeight: '400',
  },

  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default LoginScreen;
