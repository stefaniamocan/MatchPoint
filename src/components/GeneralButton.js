import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const GeneralButton = ({title, onPress, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: '70%',
    backgroundColor: '#36B199',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
});

export default GeneralButton;
