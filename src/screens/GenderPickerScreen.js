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
import {
  collection,
  getDoc,
  setDoc,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import {authentication} from '../api/firebase';
import {db} from '../api/firebase';
import GeneralButton from '../components/GeneralButton';
import TextButton from '../components/TextButton';
import {withNavigation} from 'react-navigation';
import GenderComponent from '../components/GenderComponent';

const GenderPickerScreen = ({navigation}) => {
  const [gender, setGender] = useState();

  const storeGenderInfo = () => {
    if (gender == null) {
      Alert.alert(Error, 'Please choose your gender.');
    } else {
      const userDocRef = doc(db, 'users', authentication.currentUser.uid);
      setDoc(userDocRef, {gender: gender}, {merge: true}).then(() => {
        navigation.navigate('ChooseLevelScreen');
      });
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.app}>
        <View style={styles.container}>
          <Text style={styles.stepText}>Step 2/3</Text>
          <Text style={styles.titleText}>What is your gender?</Text>
          <Text style={styles.textDescription}>
            To give you a better experince we need to know your gender
          </Text>
          <GenderComponent
            sendValue={value => setGender(value)}
            container={styles.genderContainer}
            subText={true}
            img={styles.genderimg}
            female={false}
            male={false}
          />
        </View>

        <GeneralButton
          title={'Continue'}
          buttonStyle={styles.buttonStyle}
          onPress={() => storeGenderInfo()}
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
  stepText: {
    marginTop: 40,
    color: '#36B199',
    marginBottom: 10,
  },
  genderContainer: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  genderimg: {
    width: 100,
    height: 100,
  },
});

export default GenderPickerScreen;
