import {useLinkProps} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Stars from 'react-native-stars';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
const ReviewCard = ({
  useruid,
  userPhotoURL,
  userRating,
  userName,
  setField,
  postTime,
  screenName,
  ...rest
}) => {
  const navigation = useNavigation();
  //console.log(isSecureEntry);
  return (
    <View style={{flexDirection: 'row', marginBottom: 30}}>
      <TouchableOpacity
        onPress={() =>
          navigation.push(screenName, {
            userUid: useruid,
          })
        }>
        <Image
          source={{uri: userPhotoURL}}
          style={styles.userImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View style={{marginLeft: 10}}>
        <Text style={styles.name}>{userName}</Text>
        <View style={{marginTop: 3, marginRight: 'auto'}}>
          <Stars
            display={userRating}
            spacing={3}
            count={5}
            starSize={15}
            fullStar={require('../assets/fullStar.png')}
            emptyStar={require('../assets/emptyStar.png')}
          />
        </View>
      </View>
      <Text style={styles.days}> {postTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 10,
  },
  name: {
    color: '#545454',
    fontWeight: '500',
  },

  days: {
    color: '#A7A7A7',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 'auto',
    marginTop: 1,
  },
});

export default ReviewCard;
