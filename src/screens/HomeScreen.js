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
  Image,
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

import {storage} from '../api/firebase';
import {getStorage, uploadBytes, ref, getDownloadURL} from 'firebase/storage';
import {firebase} from '@react-native-firebase/firestore';
import {MaterialIndicator} from 'react-native-indicators';
import moment from 'moment';
import SearchGameCard from '../components/SearchGameCard';
var {Platform} = React;

const HomeScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [games, setGames] = useState(null);
  const [userLevel, setUserLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [upcomingName, setupcomingName] = useState(null);
  const [upcomingLevel, setupcomingLevel] = useState(null);
  const [upcomingDate, setupcomingDate] = useState(null);
  const [userName, setUserName] = useState(
    authentication.currentUser.displayName,
  );

  //fetch games form database
  const fetchGames = async () => {
    //fetch current user level
    setLoading(true);
    let list = [];
    const docRef = doc(db, 'users', authentication.currentUser.uid);
    const docSnapProfile = await getDoc(docRef);
    if (docSnapProfile.exists()) {
      setUserLevel(parseInt(docSnapProfile.data().level));
    }

    const q = query(
      collection(db, 'games'),
      where('levelmax', '>=', userLevel),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async doc1 => {
      const {court, date, location, user1, levelmin, request} = doc1.data();
      const date2 = moment(date.toDate()).format('MMM Do, h:mm a');

      const docRef = doc(db, 'users', user1);
      const docSnapProfile = await getDoc(docRef);
      let user_Name = '';
      let profilepic = '';
      var skillLevel = '';
      if (docSnapProfile.exists()) {
        user_Name = docSnapProfile.data().name;
        profilepic = docSnapProfile.data().ProfileImage;
        skillLevel = docSnapProfile.data().level;
      }

      if (user1 != authentication.currentUser.uid && !request) {
        list.push({
          userUid: user1,
          docid: doc1.id,
          id: doc1.id,
          userName: user_Name,
          date: date2,
          profilePicture: {uri: profilepic},
          location: court + ', ' + location,
          level: 'Skill level: ' + skillLevel,
        });
      }
      console.log('list2');
      console.log(list);
      setGames(list);
    });

    setTimeout(
      () => setLoading(false),

      5000,
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchGames();
      console.log('fghjk');
      console.log(games);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {!loading ? (
        <FlatList
          ListHeaderComponent={
            <>
              <View style={{marginHorizontal: 20, marginTop: 20}}>
                <View style={{flexDirection: 'row', marginLeft: 3}}>
                  <Image
                    source={require('../assets/sun.png')}
                    resizeMode="contain"
                    style={{
                      width: 14.5,
                      height: 14.5,
                      alignSelf: 'center',
                    }}
                  />
                  <Text
                    style={{
                      color: '#36B199',
                      marginTop: 0,
                      fontWeight: '500',
                      marginLeft: 5,
                      fontSize: 13,
                    }}>
                    {moment(new Date()).format('ddd DD MMM')}
                  </Text>
                </View>

                <Text style={styles.greetingText}>
                  Hi,
                  {' ' + userName.substring(0, userName.indexOf(' '))}
                </Text>
                {/* <Text
                  style={{
                    // color: '#AEAEAE',
                    color: '#000',
                    marginTop: 20,
                    fontWeight: '400',
                    marginLeft: 5,
                    fontStyle: 'italic',

                    fontSize: 15,
                  }}>
                  Set the details and find new games
                </Text> */}
                <View style={{marginTop: 18}}></View>
                <SearchGameCard />
                <View style={{marginTop: 20}}>
                  <Text
                    style={{
                      color: '#000',
                      marginTop: 5,
                      fontWeight: '500',
                      marginLeft: 5,
                      marginBottom: 5,
                      fontSize: 16,
                    }}>
                    Available Games
                  </Text>
                </View>
              </View>
            </>
          }
          nestedScrollEnabled={true}
          keyExtractor={item => item.id}
          data={games}
          renderItem={({item}) => (
            <NewMatchCard
              visible={true}
              userUid={item.userUid}
              docid={item.docid}
              userName={item.userName}
              level={item.level}
              profilePicture={item.profilePicture}
              location={item.location}
              date={item.date}
              chatScreenName="ChatScreen"
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
  },
  greetingText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 26,
    marginLeft: 5,
  },
  upcomingMatchesText: {
    color: '#767676',
    fontSize: 17,
  },
});

export default HomeScreen;
