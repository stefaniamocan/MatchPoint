import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const TextButton = ({title, boldText, onPress, containerStyle, textStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <View style={styles.viewContainer}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
        <Text style={[styles.boldtext, textStyle]}>{boldText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainer: {flex: 1, flexDirection: 'row'},
  text: {
    color: '#979797',
  },
  boldtext: {color: '#36B199', fontWeight: '500'},
});

export default TextButton;
