import React, {useState, useEffect, useContext, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import GeneralButton from './GeneralButton';
import {db} from '../api/firebase';
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
  update,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import {authentication} from '../api/firebase';
const MatchOverviewCard = ({
  upcoming,
  winner,
  oponentName,
  oponentPhoto,
  oponentSkill,
  gameId,
  date,
  winnerUser,
  oponenetUid,
  location,
}) => {
  const registereCurrentUserWinner = async () => {
    const gamesRef = doc(db, 'games', gameId);
    console.log(gameId);
    const docSnapGame = await getDoc(gamesRef);
    await updateDoc(gamesRef, {
      winnerUser: authentication.currentUser.uid,
    });
  };
  const registereOponentWinner = async () => {
    const gamesRef = doc(db, 'games', gameId);
    const docSnapGame = await getDoc(gamesRef);

    await updateDoc(gamesRef, {
      winnerUser: oponenetUid,
    });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#36B199',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
        {upcoming ? <Text>Upcoming Game </Text> : <Text>Past Game </Text>}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Image
              source={require('../assets/clock.png')}
              resizeMode="contain"
              style={{
                height: 12,
                width: 12,
                alignSelf: 'center',
                marginRight: 5,
              }}
            />
            <Text style={{color: 'white', fontSize: 13}}>{date}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Image
              source={require('../assets/locationPin.png')}
              resizeMode="contain"
              style={{
                height: 12,
                width: 12,
                alignSelf: 'center',
                marginRight: 5,
                tintColor: '#fff',
              }}
            />
            <Text style={{color: 'white', fontSize: 13}}>{location}</Text>
          </View>
        </View>
      </View>
      {upcoming ? (
        <>
          <View style={{paddingHorizontal: 22, paddingVertical: 20}}>
            <View style={styles.flexView}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push(screenName, {
                    userUid: useruid,
                  })
                }>
                <Image
                  source={oponentPhoto}
                  resizeMode="contain"
                  style={styles.profilePicture}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.name}>{oponentName}</Text>
                <Text style={styles.level}>{oponentSkill}</Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={{paddingHorizontal: 22, paddingVertical: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push(screenName, {
                    userUid: useruid,
                  })
                }
                style={{alignItems: 'center'}}>
                <Image
                  source={oponentPhoto}
                  resizeMode="contain"
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: 'cover',
                    borderRadius: 10,
                    marginBottom: 8,
                  }}
                />

                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                    color: '#707070',
                  }}>
                  {oponentName}
                </Text>
                <Text style={styles.level}>{oponentSkill}</Text>
              </TouchableOpacity>

              <Text
                style={{
                  color: '#2E3A59',
                  fontWeight: '500',
                  alignSelf: 'flex-start',
                  marginTop: 10,
                  fontSize: 18,
                }}>
                vs.
              </Text>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{uri: authentication.currentUser.photoURL}}
                  resizeMode="contain"
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: 'cover',
                    borderRadius: 10,
                    marginBottom: 8,
                  }}
                />

                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                    color: '#707070',
                  }}>
                  {authentication.currentUser.displayName}
                </Text>
                <Text style={styles.level}>{oponentSkill}</Text>
              </View>
            </View>
            {/* who is the winer conatiner */}
            {winner ? (
              <>
                <View
                  style={{
                    backgroundColor: '#36B199',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 20,
                    marginTop: 10,
                    width: '30%',
                    alignItems: 'center',
                    fontSize: 13,
                    marginRight: 5,
                    marginLeft:
                      winnerUser == authentication.currentUser.uid
                        ? 'auto'
                        : 10,
                  }}>
                  <Text>Winner</Text>
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <GeneralButton
                    title={'Oponent'}
                    buttonStyle={{
                      width: 110,
                      padding: 8,
                      backgroundColor: '#36B199',
                    }}
                    textStyle={{
                      color: '#FFF',
                      fontWeight: '500',
                      fontSize: 14,
                    }}
                    onPress={async () => {
                      await registereOponentWinner;
                      Alert.alert('Winner registered!');
                    }}
                  />
                  <GeneralButton
                    title={'Me'}
                    buttonStyle={{
                      width: 110,
                      marginRight: -5,
                      padding: 8,
                      backgroundColor: '#36B199',
                    }}
                    textStyle={{
                      color: '#FFF',
                      fontWeight: '500',
                      fontSize: 14,
                    }}
                    onPress={async () => {
                      await registereCurrentUserWinner();
                      Alert.alert('Winner registered!');
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,

    shadowColor: '#757575',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
    marginHorizontal: 20,
  },

  profilePicture: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 5,
  },

  flexView: {
    flexDirection: 'row',
  },

  name: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
    color: '#707070',
  },
  level: {
    marginTop: -2,
    color: '#B4B4B4',
    fontSize: 13,
    marginLeft: 8,
  },
});

export default MatchOverviewCard;
