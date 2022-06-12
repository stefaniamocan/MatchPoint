import React, {useState, useEffect, useContext, Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import GeneralButton from './GeneralButton';
import {db} from '../api/firebase';
import {
  collection,
  getDoc,
  setDoc,
  doc,
  addDoc,
  getDocs,
  where,
  query,
  toDate,
  orderBy,
  update,
  updateDoc,
} from 'firebase/firestore';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
const RequestComponent = ({
  useruid,
  userName,
  level,
  screenName,
  profilePicture,
  location,
  date,
  ...rest
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#36B199',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
        <Text>Play Game Request</Text>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Image
            source={require('../assets/clock.png')}
            resizeMode="contain"
            style={{height: 12, width: 12, alignSelf: 'center', marginRight: 5}}
          />
          <Text style={{color: 'white', fontSize: 15}}>
            12 Jun 2022, 8:00 am
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 22, paddingVertical: 20}}>
        <View style={styles.flexView}>
          <TouchableOpacity
            onPress={() =>
              navigation.push(screenName, {
                userUid: useruid,
              })
            }>
            <Image
              source={profilePicture}
              resizeMode="contain"
              style={styles.profilePicture}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.level}>{level}</Text>
          </View>

          <Image
            source={require('../assets/message.png')}
            style={styles.messageicon}
          />
        </View>

        <View style={{...styles.flexView, marginTop: 25, alignItems: 'center'}}>
          <GeneralButton
            title={'Accept'}
            buttonStyle={{width: 160, padding: 8, fontWeight: '500'}}
            textStyle={{fontWeight: '500'}}
            //onPress={() => navigation.navigate('ChooseLevelScreen')}
          />
          <GeneralButton
            title={'Decline'}
            buttonStyle={{
              width: 110,
              padding: 8,
              marginLeft: 8,
              backgroundColor: '#EEEEEE',
            }}
            textStyle={{color: '#B4B4B4', fontWeight: '500'}}
            //onPress={() => navigation.navigate('ChooseLevelScreen')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,

    shadowColor: '#757575',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
    marginHorizontal: 20,
  },

  profilePicture: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 5,
  },

  flexView: {
    flexDirection: 'row',
  },

  name: {
    marginLeft: 8,
    fontSize: 17,
    fontWeight: '500',
    color: '#707070',
  },
  level: {
    marginTop: -2,
    color: '#B4B4B4',
    fontSize: 13,
    marginLeft: 8,
  },
  messageicon: {
    tintColor: '#B4B4B4',
    height: 30,
    width: 30,
    marginLeft: 'auto',
  },
});

export default RequestComponent;
