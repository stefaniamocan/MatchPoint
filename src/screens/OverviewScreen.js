import React, {useState, useEffect, useContext} from 'react';
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

import NewMatchCard from '../components/NewMatchCard';
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
  limit,
} from 'firebase/firestore/lite';
import DatePicker from 'react-native-date-picker';

const OverviewScreen = ({navigation}) => {
  const [user, setuser] = useState('r');
  const [games, setGames] = useState(null);
  const fetchGames = async () => {
    const list = [];
    const subColRef = query(collection(db, 'users', user, 'games'));

    const querySnapshot = await getDocs(subColRef);
    querySnapshot.forEach(doc => {
      const {userUid, userName, level, date} = doc.data();
      list.push({
        id: doc.id,
        userName: userName,
        date: date,
        level: level,
        profilePicture: require('../assets/profilePicture2.jpg'),
        location: 'Baza Sportiva Nr 2, Timisoara',
      });
    });
    setGames(list);
    console.log(list);
  };

  useEffect(() => {
    (async () => {
      fetchGames();
      console.log('qqqqqqqggggq');
    })();
  }, []);
  return (
    <View style={{flex: 1, padding: 20}}>
      <FlatList
        nestedScrollEnabled={true}
        keyExtractor={item => item.id}
        data={games}
        renderItem={({item}) => (
          <NewMatchCard
            visible={false}
            userName={item.userName}
            level={item.level}
            profilePicture={item.profilePicture}
            location={item.location}
            date={item.date}
          />
        )}
        ListFooterComponent={
          <>
            <View style={{marginTop: 70}}></View>
          </>
        }
      />
    </View>
  );
};

export default OverviewScreen;
