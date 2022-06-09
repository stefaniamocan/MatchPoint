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

import {storage} from '../api/firebase';
import {getStorage, uploadBytes, ref, getDownloadURL} from 'firebase/storage';
import {firebase} from '@react-native-firebase/firestore';
import {MaterialIndicator} from 'react-native-indicators';
import SearchGameCard from '../components/SearchGameCard';
var {Platform} = React;

const HomeScreen = ({navigation}) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [email, setEmail] = useState('');
  const [games, setGames] = useState([
    {
      userUid: authentication.currentUser.uid,
      docid: doc.id,
      id: doc.id,
      userName: 'hjk',
      date: 'hjk',
      level: 'Skill level 6',
      profilePicture: require('../assets/profilePicture2.jpg'),
      location: 'Baza Sportiva Nr 2, Timisoara',
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

  //get games
  // const upcominMatch = async () => {
  //   const subColRef = query(
  //     collection(db, 'users', user, 'games'),
  //     orderBy('date', 'asc'),
  //     limit(1),
  //   );
  //   const querySnapshot = await getDocs(subColRef);
  //   querySnapshot.forEach(doc => {
  //     const {userName, level, date} = doc.data();
  //     setupcomingName(userName);
  //     setupcomingLevel(level);
  //     setupcomingDate(date);
  //   });
  // };
  // const fetchGames = async () => {
  //   const list = [];
  //   console.log(userLevel);
  //   const q = query(
  //     collection(db, 'games'),

  //     where('level', '==', userLevel),
  //   );

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach(doc => {
  //     const {userUid, userName, level, date, player} = doc.data();
  //     const date2 = date ? date.toDate() : null;
  //     if (userUid != user) {
  //       if (!player) {
  //         list.push({
  //           userUid: userUid,
  //           docid: doc.id,
  //           id: doc.id,
  //           userName,
  //           date:
  //             date2.getDate() +
  //             ' ' +
  //             monthNames[date2.getMonth()].substring(0, 3) +
  //             ' ' +
  //             date2.getFullYear() +
  //             ', ' +
  //             date2.getHours() +
  //             ':' +
  //             date2.getMinutes(),
  //           level,
  //           profilePicture: require('../assets/profilePicture2.jpg'),
  //           location: 'Baza Sportiva Nr 2, Timisoara',
  //         });
  //       }
  //       //don't display matches posted by the current user
  //     }
  //   });
  //   setGames(list);

  //   if (loading) {
  //     setLoading(false);
  //   }
  // };
  // const setName = async id => {
  //   const userSnapshot = await getDoc(doc(db, 'users', id));
  //   if (userSnapshot.exists()) {
  //     const name = userSnapshot.data().name;
  //     const lvl = userSnapshot.data().level;

  //     await setUserName(name);
  //     await setUserLevel(lvl);
  //   } else {
  //     console.log("User dosen't exist");
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     setName(user);
  //     upcominMatch();
  //     fetchGames();
  //     console.log('rrrrrrrrrrsrrrrrr');
  //   })();
  // }, []);

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
              <View style={{marginHorizontal: 20, marginTop: 20}}>
                <Text style={styles.greetingText}>
                  Hi, {userName.substring(0, userName.indexOf(' '))}
                </Text>
                <Text
                  style={{
                    color: '#000',
                    marginTop: 15,
                    fontWeight: 'bold',
                    marginLeft: 5,
                    marginBottom: 10,
                  }}>
                  Set the details and find new Games
                </Text>
                <SearchGameCard />
                <View style={{marginTop: 20}}>
                  <Text
                    style={{
                      color: '#000',
                      marginTop: 15,
                      fontWeight: 'bold',
                      marginLeft: 5,
                      marginBottom: 10,
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

export default HomeScreen;
