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
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import {
  getDatabase,
  ref as ref_database,
  set as set_database,
  get as get_database,
  update as update_databse,
  push,
} from 'firebase/database';
import {realtimedb} from '../api/firebase';
const RequestComponent = ({
  gameId,
  useruid,
  userName,
  level,
  screenName,
  profilePicture,
  date,
  incoming,
  chatScreenName,
  ...rest
}) => {
  const navigation = useNavigation();
  //intialize chat
  const inisalizeChat = async () => {
    let chatroomId = '';
    const currentUserdb = await get_database(
      ref_database(
        realtimedb,
        `users/${authentication.currentUser.uid}/members/${useruid}`,
      ),
    );

    if (!currentUserdb.val()) {
      const newChatroomRef = await push(ref_database(realtimedb, 'chatrooms'), {
        user1: authentication.currentUser.uid,
        user2: useruid,
      });
      chatroomId = newChatroomRef.key;
      await set_database(
        ref_database(
          realtimedb,
          `users/${authentication.currentUser.uid}/members/${useruid}`,
        ),
        {
          chatRoomId: newChatroomRef.key,
          username: userName,
          profile_picture: profilePicture.uri,
          lastMessage: [
            {
              createdAt: new Date(),
              text: 'empty',
            },
          ],
        },
      );

      await set_database(
        ref_database(
          realtimedb,
          `users/${useruid}/members/${authentication.currentUser.uid}`,
        ),
        {
          chatRoomId: newChatroomRef.key,
          username: authentication.currentUser.displayName,
          profile_picture: authentication.currentUser.photoURL,
          lastMessage: [
            {
              createdAt: new Date(),
              text: 'empty',
            },
          ],
        },
      );
    }
  };
  const message = async () => {
    await inisalizeChat();

    navigation.push(chatScreenName, {
      reciverUserUid: useruid,
      reciverProfilePicture: profilePicture.uri,
      reciverUserName: userName,
    });
  };
  //acept or decline request
  const declineCurrent = async () => {
    const currentuserRef = doc(db, 'users', authentication.currentUser.uid);
    await updateDoc(currentuserRef, {
      request: arrayRemove({
        gameId: gameId,
        incoming: false,
        oponent: useruid,
        date: date,
      }),
    });
    console.log(date);
  };
  const declineOponent = async () => {
    const opuserRef = doc(db, 'users', useruid);
    await updateDoc(opuserRef, {
      request: arrayRemove({
        gameId: gameId,
        incoming: true,
        oponent: authentication.currentUser.uid,
        date: date,
      }),
    });
  };

  const updateDeleteGame = async () => {
    const gamesRef = doc(db, 'games', gameId);
    await updateDoc(gamesRef, {
      request: false,
    });
  };
  const acceptOponent = async () => {
    const opuserRef = doc(db, 'users', useruid);
    await updateDoc(opuserRef, {
      games: arrayUnion(gameId),
    });
  };

  const acceptUpdateGame = async () => {
    const gamesRef = doc(db, 'games', gameId);
    await updateDoc(gamesRef, {
      user2: useruid,
    });
  };

  const acceptDeleteCurrent = async () => {
    const currentuserRef = doc(db, 'users', authentication.currentUser.uid);
    await updateDoc(currentuserRef, {
      request: arrayRemove({
        date: date,
        gameId: gameId,
        incoming: true,
        oponent: useruid,
      }),
    });
    console.log(date);
  };
  const acceptDeleteOponent = async () => {
    const opuserRef = doc(db, 'users', useruid);
    await updateDoc(opuserRef, {
      request: arrayRemove({
        gameId: gameId,
        incoming: false,
        oponent: authentication.currentUser.uid,
        date: date,
      }),
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
        <Text>Play Game Request</Text>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Image
            source={require('../assets/clock.png')}
            resizeMode="contain"
            style={{height: 12, width: 12, alignSelf: 'center', marginRight: 5}}
          />
          <Text style={{color: 'white', fontSize: 15}}>{date}</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 22, paddingVertical: 20}}>
        <View style={styles.flexView}>
          <TouchableOpacity
            onPress={() =>
              navigation.push(screenName, {
                userUid: useruid,
              })
            }>
            <Image
              source={profilePicture}
              resizeMode="contain"
              style={styles.profilePicture}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.level}>{level}</Text>
          </View>

          <TouchableOpacity
            style={{marginLeft: 'auto'}}
            onPress={() => {
              message();
            }}>
            <Image
              source={require('../assets/message.png')}
              style={styles.messageicon}
            />
          </TouchableOpacity>
        </View>
        {incoming ? (
          <>
            <View
              style={{...styles.flexView, marginTop: 25, alignItems: 'center'}}>
              <GeneralButton
                title={'Accept'}
                buttonStyle={{width: 160, padding: 8, fontWeight: '500'}}
                textStyle={{fontWeight: '500'}}
                onPress={async () => {
                  await acceptOponent();
                  await acceptUpdateGame();
                  await acceptDeleteCurrent();
                  await acceptDeleteOponent();

                  Alert.alert('Request accepted!');
                }}
              />
              <GeneralButton
                title={'Decline'}
                buttonStyle={{
                  width: 110,
                  padding: 8,
                  marginLeft: 8,
                  backgroundColor: '#EEEEEE',
                }}
                textStyle={{color: '#B4B4B4', fontWeight: '500'}}
                onPress={async () => {
                  await declineCurrent();
                  await declineOponent();
                  await updateDeleteGame();
                  Alert.alert('Request delted!');
                }}
              />
            </View>
          </>
        ) : (
          <>
            <View Style={{flexDirection: 'row', marginTop: 25}}>
              <View
                style={{
                  borderColor: '#B9E4DB',
                  borderWidth: 1.5,
                  marginTop: 25,
                  marginLeft: 'auto',
                  padding: 10,
                  borderRadius: 30,
                }}>
                <Text style={{color: '#B4B4B4', fontWeight: '500'}}>
                  Request pending
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
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
    fontSize: 17,
    fontWeight: '500',
    color: '#707070',
  },
  level: {
    marginTop: -2,
    color: '#B4B4B4',
    fontSize: 13,
    marginLeft: 8,
  },
  messageicon: {
    tintColor: '#B4B4B4',
    height: 30,
    width: 30,
    marginLeft: 'auto',
  },
});

export default RequestComponent;
