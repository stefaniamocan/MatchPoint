import React, {useState, useEffect, useContext, Component} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Switch,
  ScrollView,
  FlatList,
} from 'react-native';
import Input from '../components/Input';
import GeneralButton from '../components/GeneralButton';
import TextButton from '../components/TextButton';
import Feather from 'react-native-vector-icons/Feather';
import {withNavigation} from 'react-navigation';
import Header from '../components/Header';
import UpcomingMatchCard from '../components/UpcomingMatchCard';
import NewMatchCard from '../components/NewMatchCard';
import DatePicker from 'react-native-date-picker';
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
  limit,
} from 'firebase/firestore';
import {authentication} from '../api/firebase';
import RequestComponent from '../components/RequestComponent';

import {storage} from '../api/firebase';
import {getStorage, uploadBytes, ref, getDownloadURL} from 'firebase/storage';
import {firebase} from '@react-native-firebase/firestore';
import {MaterialIndicator} from 'react-native-indicators';
import SearchGameCard from '../components/SearchGameCard';
var {Platform} = React;

const RequestScreen = ({navigation}) => {
  const [games, setGames] = useState([
    {
      useruid: authentication.currentUser.uid,
      id: doc.id,
      userName: 'Alexandru Raicu',
      date: 'hjk',
      level: 'Skill level 6',
      profilePicture: require('../assets/profilePicture2.jpg'),
      location: 'Baza Sportiva Nr 2, Timisoara',
      screenName: 'UserProfile',
    },
  ]);
  const [userLevel, setUserLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [upcomingName, setupcomingName] = useState(null);
  const [upcomingLevel, setupcomingLevel] = useState(null);
  const [upcomingDate, setupcomingDate] = useState(null);
  const [userName, setUserName] = useState(
    authentication.currentUser.displayName,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {!loading ? (
        <FlatList
          ListHeaderComponent={
            <>
              <Header
                loactionvisible={false}
                pageTitle={'Requests'}
                onPress={navigation.openDrawer}
                left={0}
              />
            </>
          }
          nestedScrollEnabled={true}
          keyExtractor={item => item.id}
          data={games}
          renderItem={({item}) => (
            <RequestComponent
              visible={true}
              useruid={item.useruid}
              userName={item.userName}
              level={item.level}
              profilePicture={item.profilePicture}
              location={item.location}
              date={item.date}
              screenName={item.screenName}
            />
          )}
          ListFooterComponent={
            <>
              <View style={{marginTop: 100}}></View>
            </>
          }
        />
      ) : (
        <MaterialIndicator
          size={40}
          color="#36B199"
          style={{
            marginTop: 230,
            flex: 1,
            alignSelf: 'center',
          }}></MaterialIndicator>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    height: '100%',
  },
  greetingText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 25,
    marginLeft: 5,
  },
  upcomingMatchesText: {
    color: '#767676',
    fontSize: 17,
  },
});

export default RequestScreen;
