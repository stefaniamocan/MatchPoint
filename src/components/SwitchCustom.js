import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

const SwitchCustom = ({
  navigation,
  selectionMode, //preset Option
  option1,
  option2,
  onSelectSwitch, // function after toogle changes
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: 53,
          width: '90%',
          backgroundColor: 'white',
          borderRadius: 30,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 4.5,
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#F5F5F5',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 1 ? '#36B199' : '#F5F5F5',
            fontWeight: '500',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 1 ? '#F2F2F2' : '#36B199',
              fontWeight: '500',
              fontSize: 15,
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 2 ? '#36B199' : '#F5F5F5',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 2 ? 'white' : '#36B199',
              fontWeight: '500',
              fontSize: 15,
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SwitchCustom;
