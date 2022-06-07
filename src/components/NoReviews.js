import {useLinkProps} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Stars from 'react-native-stars';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
const NoReviews = ({reviews}) => {
  return (
    <View style={{marginBottom: 30, marginTop: 20, alignItems: 'center'}}>
      {reviews ? (
        <>
          <Stars
            display={5}
            spacing={3}
            count={5}
            starSize={23}
            fullStar={require('../assets/fullStar.png')}
            emptyStar={require('../assets/emptyStar.png')}
          />

          <Text
            style={{
              color: '#545454',
              marginTop: 10,
              fontWeight: '500',
              fontSize: 16,
            }}>
            No Reviews Yet
          </Text>
          <Text style={{color: '#545454', marginTop: 10, fontSize: 14}}>
            This user has no reviews for now.
          </Text>
        </>
      ) : (
        <>
          <Image
            source={require('../assets/paleta.png')}
            style={{width: 50, height: 50}}
            resizeMode="cover"
          />

          <Text
            style={{
              color: '#545454',
              marginTop: 10,
              fontWeight: '500',
              fontSize: 16,
            }}>
            No games played
          </Text>
          <Text style={{color: '#494949', marginTop: 10, fontSize: 14}}>
            This user has not played any games yet.
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default NoReviews;
