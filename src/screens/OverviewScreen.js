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
} from 'firebase/firestore';
import DatePicker from 'react-native-date-picker';

const OverviewScreen = ({navigation}) => {
  const [user, setuser] = useState('r');
  const [games, setGames] = useState([{id: 2}]);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    height: '100%',
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
export default OverviewScreen;
