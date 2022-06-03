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
  Image,
} from 'react-native';

const GenderComponent = ({sendValue}) => {
  const [maleValue, setmaleValue] = useState(false);
  const [femaleValue, setfemaleValue] = useState(false);
  return (
    <TouchableOpacity style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setmaleValue(true);
          setfemaleValue(false);
          sendValue('male');
        }}>
        {maleValue ? (
          <>
            <Image
              source={require('../assets/maleFocused.png')}
              style={styles.img}
              resizeMode="contain"
            />
            <Text
              style={{
                color: '#000000',
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 40,
                fontSize: 16,
              }}>
              Male
            </Text>
          </>
        ) : (
          <>
            <Image
              source={require('../assets/male.png')}
              style={styles.img}
              resizeMode="contain"
            />

            <Text
              style={{
                color: '#000000',
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 40,
                fontSize: 16,
              }}>
              Male
            </Text>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setmaleValue(false);
          setfemaleValue(true);
          sendValue('female');
        }}>
        {femaleValue ? (
          <>
            <Image
              source={require('../assets/femaleFocused.png')}
              style={styles.img}
              resizeMode="contain"
            />

            <Text
              style={{
                color: '#000000',
                alignSelf: 'center',
                marginTop: 10,
                fontSize: 16,
              }}>
              Female
            </Text>
          </>
        ) : (
          <>
            <Image
              style={styles.img}
              resizeMode="contain"
              source={require('../assets/female.png')}
            />
            <Text
              style={{
                color: '#000000',
                alignSelf: 'center',
                marginTop: 10,
                fontSize: 16,
              }}>
              Female
            </Text>
          </>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  text: {
    marginTop: 30,
    color: '#000000',
  },

  images: {
    width: 80,
    height: 116,
  },

  img: {
    width: 100,
    height: 100,
  },
});
export default GenderComponent;
