import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import ModalDropdown from 'react-native-modal-dropdown';

const SearchGameCard = ({pictureSource, cityLocation, name, level, data}) => {
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState();
  const initialValues = [{id: 'pizza', value: 3}];
  const [pizzas, setPizzas] = useState(initialValues);
  const [minSkill, setminSkill] = useState();
  const [maxSkill, setmaxSkill] = useState();
  const pizzaNumbers = [{id: 'pizza', label: '', min: 0, max: 99}];

  const setValue = value => {
    setminSkill(value);
    console.log(value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.DatePickerContainer}>
            <TouchableOpacity onPress={() => setOpenDate(true)}>
              <View style={styles.inputContainer}>
                <Image
                  source={require('../assets/calendar.png')}
                  resizeMode="contain"
                  style={styles.iocn}
                />
                <Text style={styles.text}>
                  {date.getDate() +
                    '.' +
                    (date.getMonth() + 1) +
                    '.' +
                    date.getFullYear()}
                </Text>
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
            <TouchableOpacity onPress={() => setOpenTime(true)}>
              <View style={styles.inputContainer}>
                <Image
                  source={require('../assets/watch.png')}
                  resizeMode="contain"
                  style={styles.iocn}
                />
                <Text style={styles.text}>
                  {date.getHours() + ':' + date.getMinutes()}
                </Text>
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
        <View style={styles.dateView}>
          <Image
            source={require('../assets/locationPin.png')}
            resizeMode="contain"
            style={styles.locationPin}
          />
          <TextInput
            style={{marginLeft: 2, color: '#CAE7E1', flex: 1}}
            placeholder="Location"
            onChangeText={newValue => setLocation(newValue)}></TextInput>
        </View>
        <View
          style={{alignSelf: 'center', marginTop: 20, flexDirection: 'row'}}>
          <Text style={{color: 'white', fontSize: 14, marginRight: 7}}>
            I want oponents skill level from
          </Text>

          <ModalDropdown
            options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            onSelect={newValue => setminSkill(newValue)}
            defaultValue={'0'}
            textStyle={{color: '#FFF', fontSize: 16, fontWeight: '500'}}
            dropdownStyle={{
              width: 50,
              alignItems: 'center',
              alignSelf: 'center',
              marginRight: -20,
            }}
          />
          <Image
            source={require('../assets/whiteArrowDown.png')}
            resizeMode="contain"
            style={{
              width: 10,
              height: 10,
              alignSelf: 'flex-end',
              marginLeft: 5,
            }}
          />

          <Text
            style={{
              color: 'white',
              fontSize: 14,
              marginRight: 7,
              marginLeft: 7,
            }}>
            to
          </Text>
          <ModalDropdown
            options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            onSelect={newValue => setmaxSkill(newValue)}
            defaultValue={'10'}
            textStyle={{color: '#FFF', fontSize: 16, fontWeight: '500'}}
            dropdownStyle={{
              width: 50,
              alignItems: 'center',
              alignSelf: 'center',
              marginRight: -20,
            }}
          />
          <Image
            source={require('../assets/whiteArrowDown.png')}
            resizeMode="contain"
            style={{
              width: 10,
              height: 10,
              alignSelf: 'flex-end',
              marginLeft: 5,
            }}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#53C7B0',
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
        }}>
        <TouchableOpacity>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              paddingVertical: 10,
              paddingHorizontal: 5,
              fontWeight: '500',
              fontSize: 16,
            }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },

  cardView: {
    marginTop: 5,
    backgroundColor: '#36B199',
    padding: 17,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  locationPin: {
    tintColor: '#CAE7E1',
    height: 16,
    width: 16,
  },

  dateView: {
    marginTop: 10,
    borderRadius: 7,
    flexDirection: 'row',
    paddingLeft: 15,
    backgroundColor: '#53C7B0',
    alignItems: 'center',
  },

  input: {
    backgroundColor: '#53C7B0',
    flex: 1,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DatePickerContainer: {
    width: '49%',
  },
  iocn: {
    tintColor: '#CAE7E1',
    height: 16,
    width: 16,
    marginRight: 10,
  },
  iconContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: '#53C7B0',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#CAE7E1',
  },
});

export default SearchGameCard;
