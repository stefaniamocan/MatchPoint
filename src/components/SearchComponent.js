import {useLinkProps} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const SearchComponent = ({
  title,
  passwordfield,
  iconshow,
  setField,
  onpress,
}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  //console.log(isSecureEntry);
  return (
    <View>
      <TouchableOpacity onPress={onpress}>
        <View style={styles.backgroundStyle}>
          <Image
            source={require('../assets/search.png')}
            resizeMode="contain"
            style={{width: 20, height: 20}}
          />
          <Text style={{marginLeft: 5}}> Search other players</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 15,

    backgroundColor: '#6EC7B6',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 5,
    borderRadius: 40,
  },
});

export default SearchComponent;
