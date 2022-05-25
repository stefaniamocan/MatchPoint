import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const TextButton = ({title, onPress, containerStyle, textStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#979797',
  },
});

export default TextButton;
