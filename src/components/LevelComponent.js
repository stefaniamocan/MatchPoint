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

const LevelComponent = ({sendValue}) => {
  const [bigValue, setbigValue] = useState(false);
  const [intmValue, setintmValue] = useState(false);
  const [advValue, setadvValue] = useState(false);
  return (
    <TouchableOpacity style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setbigValue(true);
          setintmValue(false);
          setadvValue(false);
          sendValue('beginner');
        }}>
        {bigValue ? (
          <>
            <Image
              source={require('../assets/beginnerFocused.png')}
              style={styles.images}
              resizeMode="contain"
            />
          </>
        ) : (
          <>
            <Image
              source={require('../assets/beginner.png')}
              style={styles.images}
              resizeMode="contain"
            />
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setbigValue(false);
          setintmValue(true);
          setadvValue(false);
          sendValue('intermediar');
        }}>
        {intmValue ? (
          <>
            <Image
              source={require('../assets/intermediarFocused.png')}
              style={styles.images}
              resizeMode="contain"
            />
          </>
        ) : (
          <>
            <Image
              style={styles.images}
              resizeMode="contain"
              source={require('../assets/intermediar.png')}
            />
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setbigValue(false);
          setintmValue(false);
          setadvValue(true);
          sendValue('experienced');
        }}>
        {advValue ? (
          <>
            <Image
              source={require('../assets/experiencedFocused.png')}
              style={styles.images}
              resizeMode="contain"
            />
          </>
        ) : (
          <>
            <Image
              source={require('../assets/experienced.png')}
              style={styles.images}
              resizeMode="contain"
            />
          </>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginTop: 30,
    color: '#000000',
  },

  images: {
    width: 80,
    height: 116,
  },
});
export default LevelComponent;
