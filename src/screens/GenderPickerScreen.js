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
import GenderComponent from '../components/GenderComponent';

const GenderPickerScreen = ({navigation}) => {
  const [gender, setGender] = useState('');
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.app}>
        <View style={styles.container}>
          <Text style={styles.titleText}>What is your gender?</Text>
          <Text style={styles.textDescription}>
            To give you a better experince we need to know your gender
          </Text>
          <GenderComponent sendValue={value => setGender(value)} />
        </View>

        <GeneralButton
          title={'Continue'}
          buttonStyle={styles.buttonStyle}
          onPress={() => navigation.navigate('ChooseLevelScreen')}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  app: {
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 40,
  },

  textDescription: {
    marginHorizontal: 30,
    fontSize: 15,
    color: '#7D7D7D',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 7,
  },

  buttonStyle: {
    marginTop: 50,
  },
});

export default GenderPickerScreen;
