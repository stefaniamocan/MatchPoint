import {useLinkProps} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Stars from 'react-native-stars';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import {authentication} from '../api/firebase';
const ProfileGameComponent = ({
  currentUserName,
  currentUserPhoto,
  oponentUserName,
  oponentUserPhoto,
  set1,
  set2,
  set3,
  location,
  date,
  ...rest
}) => {
  const navigation = useNavigation();
  //console.log(isSecureEntry);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: currentUserPhoto}}
            style={styles.userImage}
            resizeMode="cover"
          />

          <Text style={{color: '#FFF', fontSize: 12}}> {currentUserName}</Text>
        </View>
        <View style={{alignItems: 'center', alignSelf: 'center'}}>
          <Text style={{color: '#FFF', fontSize: 12}}>{set1}</Text>
          <Text style={{color: '#FFF', fontSize: 12}}>{set2}</Text>
          <Text style={{color: '#FFF', fontSize: 12}}>{set3}</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: oponentUserPhoto}}
            style={styles.userImage}
            resizeMode="cover"
          />
          <Text style={{color: '#FFF', fontSize: 12}}> {oponentUserName}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',

          backgroundColor: '#53C7B0',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          padding: 5,
          paddingLeft: 15,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: 'auto',
          }}>
          <Image
            source={require('../assets/locationPin.png')}
            style={{width: 8, height: 20, tintColor: '#C3EBE3'}}
            resizeMode="contain"
          />
          <Text style={{color: '#C3EBE3', marginLeft: 5, fontSize: 12}}>
            {location}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Image
            source={require('../assets/watch.png')}
            style={{width: 12, height: 12, tintColor: '#C3EBE3'}}
            resizeMode="contain"
          />
          <Text style={{color: '#C3EBE3', marginLeft: 5, fontSize: 12}}>
            {date}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#36B199',
  },
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginBottom: 7,
  },
  name: {
    color: '#545454',
    fontWeight: '500',
  },

  days: {
    color: '#A7A7A7',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 'auto',
    marginTop: 1,
  },
});

export default ProfileGameComponent;
