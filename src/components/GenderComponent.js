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

const GenderComponent = ({
  sendValue,
  container,
  subText,
  img,
  male,
  female,
}) => {
  const [maleValue, setmaleValue] = useState(male);
  const [femaleValue, setfemaleValue] = useState(female);
  return (
    <TouchableOpacity style={container}>
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
              style={img}
              resizeMode="contain"
            />
            {subText ? (
              <>
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
              <></>
            )}
          </>
        ) : (
          <>
            <Image
              source={require('../assets/male.png')}
              style={img}
              resizeMode="contain"
            />
            {subText ? (
              <>
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
              <></>
            )}
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
              style={img}
              resizeMode="contain"
            />

            {subText ? (
              <>
                <Text
                  style={{
                    color: '#000000',
                    alignSelf: 'center',
                    marginTop: 10,
                    marginBottom: 40,
                    fontSize: 16,
                  }}>
                  Female
                </Text>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <Image
              style={img}
              resizeMode="contain"
              source={require('../assets/female.png')}
            />
            {subText ? (
              <>
                <Text
                  style={{
                    color: '#000000',
                    alignSelf: 'center',
                    marginTop: 10,
                    marginBottom: 40,
                    fontSize: 16,
                  }}>
                  Female
                </Text>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
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
