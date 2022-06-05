import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

const SettingsInput = ({title, passwordfield, initialValue, ...rest}) => {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.text}>{title}</Text>
      <TextInput
        style={styles.input}
        value={initialValue}
        secureTextEntry={passwordfield}
        {...rest}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  text: {
    color: '#000',
    alignSelf: 'center',
    fontWeight: '500',
    marginLeft: 6,
  },
  input: {
    fontSize: 16,
    color: 'black',
    borderColor: '#EBEBED',
    borderBottomWidth: 1.5,
    width: '79%',
    marginLeft: 30,
    paddingLeft: 15,
  },
});

export default SettingsInput;
