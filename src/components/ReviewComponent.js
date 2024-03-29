import {useLinkProps} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text, Image, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {db} from '../api/firebase';
import Stars from 'react-native-stars';
import {
  collection,
  getDoc,
  setDoc,
  doc,
  addDoc,
  getDocs,
  where,
  query,
  toDate,
  orderBy,
  limit,
} from 'firebase/firestore';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import {authentication} from '../api/firebase';

const ReviewComponent = ({reviews, uid}) => {
  const [ratingStar, setRating] = useState(0);
  const storeRating = async val => {
    const date = new Date();
    const reviewRef = doc(db, 'reviews', uid);
    const subCollectionRef = doc(
      reviewRef,
      'recivedRatings',
      authentication.currentUser.uid,
    );

    await setDoc(subCollectionRef, {
      postTime: date,
      rating: val,
    });
  };
  const saveRating = val => {
    Alert.alert(
      'Post Rating',
      'You gave this user ' + val + ' stars. Do you want to post that?',
      [
        {
          text: 'Save',
          style: 'default',
          onPress: () => {
            storeRating(val);
          },
        },
      ],
    );
  };

  //post review

  return (
    <View
      style={{
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#61C1AF',
        padding: 10,
        borderRadius: 10,
      }}>
      <Text
        style={{
          color: '#FFF',

          fontWeight: '500',
          fontSize: 16,
        }}>
        Rate and review
      </Text>
      <Text style={{color: '#FFFF', marginTop: 5, fontSize: 14}}>
        Share your experince to help others
      </Text>
      <View style={{marginTop: 15, marginBottom: 10}}>
        <Stars
          default={ratingStar}
          update={val => {
            [setRating(val), saveRating(val)];
          }}
          spacing={3}
          count={5}
          starSize={23}
          fullStar={require('../assets/whiteStar.png')}
          emptyStar={require('../assets/whiteEmptyStar.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userImage: {
    height: 60,
    width: 60,
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

export default ReviewComponent;
