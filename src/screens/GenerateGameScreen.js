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
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import GeneralButton from '../components/GeneralButton';
import DatePicker from 'react-native-date-picker';
import {authentication, db} from '../api/firebase';
import {
  collection,
  getDoc,
  setDoc,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import LevelComponent from '../components/LevelComponent';
import Input from '../components/Input';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomSliderMarkerLeft from '@ptomasroos/react-native-multi-slider';
import CustomSliderMarkerRight from '@ptomasroos/react-native-multi-slider';

const GenerateGameScreen = () => {
  const [user, setUser] = useState();
  const [date, setDate] = useState(new Date());

  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [location, setLocation] = useState(false);
  const [court, setCourt] = useState(false);
  const [nonCollidingMultiSliderValue, setNonCollidingMultiSliderValue] =
    useState([0, 100]);
  const [multiSliderValue, setMultiSliderValue] = useState([3, 7]);

  const multiSliderValuesChange = values => setMultiSliderValue(values);

  // const postGame = (user, date, level) => {
  //   grameRef= addDoc(collection(db, 'games'), {
  //     user1: user,
  //     date: date,
  //     levelmin: level,
  //     levelmax: levelmax
  //     city:
  ///    court name:
  //     user2:
  //   request
  //   });
  // };

  const postGame = async (date, min, max, location, court) => {
    const gameRef = await addDoc(collection(db, 'games'), {
      user1: authentication.currentUser.uid,
      date: date,
      levelmin: min,
      levelmax: max,
      location: location,
      court: court,
      request: false,
    });

    const gameId = gameRef.id;

    const docRef = doc(db, 'users', authentication.currentUser.uid);
    if (docRef) {
      await updateDoc(docRef, {
        games: arrayUnion(gameId),
      });
    }
    Alert.alert('Game posted!');
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={{marginBottom: 200}}>
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
        <Text style={styles.h2}>Oponents Skill Level</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <Text style={{color: '#36B199', fontWeight: '500', fontSize: 14}}>
            {multiSliderValue[0]}
          </Text>
          <Text style={{color: '#36B199', fontWeight: '500', fontSize: 14}}>
            {multiSliderValue[1]}
          </Text>
        </View>

        <View style={{alignSelf: 'center'}}>
          <MultiSlider
            values={[multiSliderValue[0], multiSliderValue[1]]}
            sliderLength={250}
            onValuesChange={multiSliderValuesChange}
            isMarkersSeparated={true}
            allowOverlap={true}
            snapped
            min={0}
            max={10}
            step={1}
            selectedStyle={{
              backgroundColor: '#36B199',
            }}
            unselectedStyle={{
              backgroundColor: '#E1E1E1',
            }}
            containerStyle={{
              height: 40,
            }}
            trackStyle={{
              borderRadius: 10,
            }}
            touchDimensions={{
              height: 40,
              width: 40,
              borderRadius: 20,
              slipDisplacement: 40,
            }}
            sliderLength={300}
          />
        </View>

        <Text style={styles.h2}>Location</Text>
        <Text style={{color: '#B7B7B7', marginHorizontal: 7}}>City</Text>
        <TextInput
          underlineColorAndroid="transparent"
          multiline={false}
          numberOfLines={1}
          style={styles.textArea}
          placeholderTextColor="grey"
          autoCorrect={false}
          onChangeText={newValue => setLocation(newValue)}></TextInput>
        <Text style={{color: '#B7B7B7', marginHorizontal: 7}}>Court Name</Text>
        <TextInput
          underlineColorAndroid="transparent"
          multiline={false}
          numberOfLines={1}
          style={styles.textArea}
          placeholderTextColor="grey"
          autoCorrect={false}
          onChangeText={newValue => setCourt(newValue)}></TextInput>
        <GeneralButton
          title={'Post Game'}
          onPress={() =>
            postGame(
              date,
              multiSliderValue[0],
              multiSliderValue[1],
              location,
              court,
            )
          }></GeneralButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 3,

    borderRadius: 12,
    padding: 15,
    backgroundColor: 'white',
  },
  skillLevel: {
    marginTop: 40,
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
    color: '#2E3A58',
    fontSize: 16,
    marginBottom: 15,
    fontWeight: '500',
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
    marginTop: 40,
    color: '#2E3A58',
    fontSize: 17,
    marginBottom: 25,
    fontWeight: '500',
  },

  textArea: {
    textAlignVertical: 'top',
    borderColor: '#36B199',
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    color: '#000000',
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default GenerateGameScreen;
