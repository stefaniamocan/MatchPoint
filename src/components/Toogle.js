import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Switch, View} from 'react-native';

var {Platform} = React;

const Toogle = ({title, onPress}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.view}>
      <Switch
        style={styles.toogle}
        trackColor={{false: '#767577', true: '#36B199'}}
        thumbColor={isEnabled ? 'white' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={styles.text}>Remember me</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
  toogle: {
    transform: [{scaleX: 1.3}, {scaleY: 1.3}],
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#A09C9C',
    fontWeight: '400',
    fontSize: 14,
    marginLeft: (Platform.OS === 'ios') ? 20 : 5,
  },
});

export default Toogle;
