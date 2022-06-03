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

import {authentication} from '../api/firebase';
import {db} from '../api/firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

const ProfileRegistrationScreen = ({navigation}) => {
  const [username, setUsername] = useState(
    authentication.currentUser.displayName,
  );
  const [bio, setBio] = useState('');

  // const handleProfileRegistration = () => {
  //     createUserWithEmailAndPassword(authentication, email.trim(), password)
  //       .then(() => {
  //         newFirestoreUser();
  //         navigation.navigate('GenderPicker');
  //       })
  //       .catch((error, re) => {
  //         alert(error.message);
  //         console.log(re);
  //       });
  //   }
  // };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.app}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Complete your profile</Text>
          <Text style={styles.textDescription}>
            Add a profile photo and a bio to let people know who you are
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/profilePlaceHolder.jpg')}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.add}>
              <Image
                source={require('../assets/add.png')}
                resizeMode="cover"
                style={styles.img}
              />
            </View>
          </View>

          <Text style={styles.userName}>{username}</Text>
        </View>
        <Text style={styles.preTitle}>Bio</Text>
        <TextInput
          underlineColorAndroid="transparent"
          multiline={true}
          numberOfLines={4}
          style={styles.textArea}
          placeholder="Type something..."
          placeholderTextColor="grey"
          autoCorrect={false}
          ss></TextInput>

        <GeneralButton
          title={'Continue'}
          buttonStyle={styles.buttonStyle}
          onPress={() => navigation.navigate('GenderPicker')}
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

  image: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    overflow: 'hidden',
  },

  imageContainer: {
    marginTop: 30,
  },

  add: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  img: {
    width: 50,
    height: 50,
    marginTop: 6,
    marginLeft: 3,
  },
  buttonStyle: {
    marginTop: 50,
  },
  textArea: {
    height: 65,
    textAlignVertical: 'top',
    borderColor: '#B9E4DB',
    borderWidth: 1.5,
    marginHorizontal: 14,
    borderRadius: 5,
    color: '#000000',
    padding: 10,
  },

  preTitle: {
    marginHorizontal: 9,
    padding: 10,
    borderRadius: 3,
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  userName: {
    marginHorizontal: 30,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '500',
  },
});

export default ProfileRegistrationScreen;
