import {useLinkProps} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Button,
  Darw,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import GeneralButton from '../components/GeneralButton';
import DatePicker from 'react-native-date-picker';
import {db} from '../api/firebase';
import {
  collection,
  getDoc,
  setDoc,
  doc,
  addDoc,
  getDocs,
} from 'firebase/firestore/lite';
import LevelComponent from '../components/LevelComponent';
import {firebase} from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

const GenerateGameScreen = () => {
  const [date, setDate] = useState(new Date());
  const [level, setLevel] = useState('');

  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const {user, userName} = useContext(AuthContext);

  const postGame = (user, date, level) => {
    addDoc(collection(db, 'games'), {
      userUid: user,
      userName: userName,
      date: date,
      level: level,
    });
  };

  console.log(level);
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.dateTimeContainer}>
        {/* Date Picker */}
        <View style={styles.DatePickerContainer}>
          <Text style={styles.titleText}>Date</Text>
          <TouchableOpacity onPress={() => setOpenDate(true)}>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                {date.getDate() +
                  '.' +
                  (date.getMonth() + 1) +
                  '.' +
                  date.getFullYear()}
              </Text>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/calendar.png')}
                  resizeMode="contain"
                  style={styles.iocn}
                />
                <Image
                  source={require('../assets/downArrow.png')}
                  resizeMode="contain"
                  style={{...styles.iocn, marginTop: 7}}
                />
              </View>
            </View>
          </TouchableOpacity>

          <DatePicker
            modal
            open={openDate}
            date={date}
            mode="date"
            onConfirm={date => {
              setOpenDate(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
        </View>

        {/* Time Picker */}
        <View style={styles.DatePickerContainer}>
          <Text style={styles.titleText}>Time</Text>
          <TouchableOpacity onPress={() => setOpenTime(true)}>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                {date.getHours() + ':' + date.getMinutes()}
              </Text>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/watch.png')}
                  resizeMode="contain"
                  style={styles.iocn}
                />
                <Image
                  source={require('../assets/downArrow.png')}
                  resizeMode="contain"
                  style={{...styles.iocn, marginTop: 7}}
                />
              </View>
            </View>
          </TouchableOpacity>

          <DatePicker
            modal
            open={openTime}
            date={date}
            mode="time"
            onConfirm={date => {
              setOpenTime(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpenTime(false);
            }}
          />
        </View>
      </View>
      <Text style={styles.h2}>Player Skill Level</Text>
      <LevelComponent sendValue={value => setLevel(value)} />
      <GeneralButton
        title={'Post Game'}
        onPress={() => postGame(user, date, level)}></GeneralButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  skillLevel: {
    marginTop: 40,
  },
  mainContainer: {
    flex: 1,
    marginTop: 20,
    borderRadius: 12,
    padding: 15,
  },

  //date-time picker
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DatePickerContainer: {
    width: '47%',
    marginTop: 20,
  },
  inputContainer: {
    padding: 10,
    borderColor: '#36B199',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#B7B7B7',
  },
  titleText: {
    color: '#767676',
    fontSize: 16,
    marginBottom: 15,
  },
  iocn: {
    tintColor: '#B7B7B7',
    height: 16,
    width: 16,
    marginRight: 7,
  },
  iconContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  h2: {
    marginTop: 30,
    color: '#767676',
    fontSize: 17,
  },
});

export default GenerateGameScreen;
