import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
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
import {storage} from '../api/firebase';
import {getStorage, uploadBytes, ref, getDownloadURL} from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  reauthenticateWithCredential,
  updateEmail,
} from 'firebase/auth';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import Header from '../components/Header';

const CustomDrawerContent = props => {
  const [photoURL, setProfileImage] = useState(
    authentication.currentUser.photoURL,
  );
  const [username, setUsername] = useState(
    authentication.currentUser.displayName,
  );

  useEffect(() => {
    setUsername(authentication.currentUser.displayName);
    setProfileImage(authentication.currentUser.photoURL);
  });
  const logout = () => {
    const user = authentication.currentUser;

    const email = authentication.currentUser.email;
    signOut(authentication)
      .then(() => {
        props.navigation.navigate('Login');
      })
      .catch(re => {
        alert(re.message);
      });
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          source={require('../assets/background.png')}
          style={{marginTop: -5, padding: 20}}>
          <Image
            source={{uri: photoURL}}
            style={styles.image}
            resizeMode="cover"
          />

          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
              fontWeight: '500',
            }}>
            {username}
          </Text>
        </ImageBackground>

        <DrawerItem
          label="Home"
          labelStyle={styles.label}
          style={{marginTop: 10}}
          onPress={() => props.navigation.navigate('HomeScr')}
          icon={() => (
            <Image
              source={require('../assets/../assets/home.png')}
              style={{
                height: 25,
                width: 25,
                tintColor: '#C5C5C5',
              }}
              resizeMode="contain"
            />
          )}
        />

        <DrawerItem
          label="Profile"
          labelStyle={styles.label}
          style={{marginTop: 10}}
          onPress={() => props.navigation.navigate('ProfileScreen')}
          icon={() => (
            <Image
              source={require('../assets/Customer.png')}
              style={{height: 28, width: 25}}
              resizeMode="contain"
            />
          )}
        />

        <DrawerItem
          label="Requests"
          labelStyle={styles.label}
          style={{marginTop: 10}}
          onPress={() => props.navigation.navigate('RequestScreen')}
          icon={() => (
            <Image
              source={require('../assets/request.png')}
              style={{height: 28, width: 25}}
              resizeMode="contain"
            />
          )}
        />

        <DrawerItem
          label="Guidelines"
          labelStyle={styles.label}
          onPress={() => props.navigation.navigate('LevelGuidelines')}
          icon={() => (
            <Image
              source={require('../assets/lines.png')}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
          )}
        />
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          width: '90%',
          marginLeft: 10,
        }}>
        <TouchableOpacity onPress={() => logout()}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/graylogout.png')}
              resizeMode="cover"
              style={{width: 20, height: 20, marginLeft: -10}}
            />
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                marginLeft: 30,
                fontWeight: '500',
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    overflow: 'hidden',
    marginLeft: 3,
    marginBottom: 13,
  },
  label: {
    fontSize: 15,
    color: '#000',
  },
});
export default CustomDrawerContent;
