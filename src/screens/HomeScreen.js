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
import moment from 'moment';

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
      userUid: '8ttScH1eF4TcQpJPnYIWBq2f2N93',
      docid: doc.id,
      id: doc.id,
      userName: 'Thomas Smith',
      date: '21 Jun 2022',
      level: 'Skill level 6',
      profilePicture: {
        uri: 'https://firebasestorage.googleapis.com/v0/b/matchpoint-a0006.appspot.com/o/8ttScH1eF4TcQpJPnYIWBq2f2N93_profilePicture.jpg?alt=media&token=911469d8-3812-47eb-96a0-a063417eaf0e',
      },
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
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      setUserName(authentication.currentUser.displayName);
      setLoading(false);
    });
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

    height: '100%',
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
