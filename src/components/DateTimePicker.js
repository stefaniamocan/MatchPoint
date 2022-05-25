import {useLinkProps} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Button,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import GeneralButton from '../components/GeneralButton';
import DatePicker from 'react-native-date-picker';

const DateTimePicker = ({parssData}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.DatePickerContainer}>
      <Text style={styles.titleText}>Date</Text>
      <TouchableOpacity onPress={() => setOpen(true)}>
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
        open={open}
        date={date}
        mode="date"
        onConfirm={date => {
          setDate(false);
          setDate(date);
        }}
        onCancel={() => {
          setDate(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginRight: 4,
  },
  iconContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DateTimePicker;
