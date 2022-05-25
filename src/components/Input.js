import {useLinkProps} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const Input = ({title, passwordfield, iconshow, setField, ...rest}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  //console.log(isSecureEntry);
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.backgroundStyle}>
        <TextInput
          style={styles.inputStyle}
          placeholderTextColor={'darkgray'}
          secureTextEntry={
            passwordfield === false ? !isSecureEntry : isSecureEntry
          }
          autoCapitalize="none"
          autoCorrect={false}
          {...rest}
        />

        {iconshow ? (
          <TouchableOpacity
            onPress={() => {
              setIsSecureEntry(prev => !prev);
            }}>
            <View>
              {isSecureEntry ? (
                <Feather name="eye-off" style={styles.showeye} />
              ) : (
                <Feather name="eye" style={styles.showeye} />
              )}
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 2,
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 10,
  },
  text: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 3,
    color: '#A09C9C',
    fontSize: 13,
    marginTop: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    marginHorizontal: 13,
  },
  input: {
    marginHorizontal: 20,
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    color: 'black',
    marginTop: 2,
    marginBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
  },
  showeye: {
    fontSize: 25,
    alignSelf: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    color: '#A09C9C',
  },
});

export default Input;
