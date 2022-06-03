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
  Image,
} from 'react-native';
import Input from '../components/Input';
import GeneralButton from '../components/GeneralButton';
import TextButton from '../components/TextButton';
import Feather from 'react-native-vector-icons/Feather';
import {withNavigation} from 'react-navigation';

const OnboardingScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.app}>
      <View style={styles.container}>
        <Image
          source={require('../assets/onboardingImage.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.titleText}>Find the best oponent</Text>

        <Text style={styles.textDescription}>
          Find oponents and post matches based on your needs. Let’s set up your
          profile and get you started.
        </Text>

        <GeneralButton
          title={"Let's start!"}
          buttonStyle={styles.buttonStyle}
          onPress={() => navigation.navigate('ProfileRegistration')}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  app: {
    backgroundColor: 'white',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 23,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 7,
  },

  textDescription: {
    marginHorizontal: 30,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 7,
  },

  image: {
    height: 250,
    marginTop: 80,
  },
  buttonStyle: {
    marginTop: 40,
  },
});

export default OnboardingScreen;
