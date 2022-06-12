import {useLinkProps} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Stars from 'react-native-stars';
import moment from 'moment';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import {
  getDatabase,
  ref as ref_database,
  set as set_database,
  get as get_database,
  update as update_databse,
  push,
} from 'firebase/database';
import {authentication} from '../api/firebase';
import {db} from '../api/firebase';
import {realtimedb} from '../api/firebase';
const ChatComponent = ({
  useruid,
  userPhotoURL,
  userName,
  screenName,
  message,
  timestamp,
  search,
  ...rest
}) => {
  const navigation = useNavigation();
  //console.log(isSecureEntry);

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
          profile_picture: userPhotoURL,
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
              text: 'asdfgh',
            },
          ],
        },
      );
    }
  };

  const redirecttomessage = async () => {
    await inisalizeChat();

    navigation.push(screenName, {
      reciverUserUid: useruid,
      reciverProfilePicture: userPhotoURL,
      reciverUserName: userName,
    });
  };

  return (
    <View style={{marginTop: 5, marginHorizontal: 17}}>
      {search ? (
        <>
          <TouchableOpacity
            onPress={() => {
              redirecttomessage();
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 30,
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: userPhotoURL,
                }}
                style={styles.userImage}
                resizeMode="cover"
              />
              <View
                styles={{
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                }}>
                <Text style={{color: '#000', fontWeight: '500'}}>
                  {userName}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.push(screenName, {
                reciverUserUid: useruid,
                reciverProfilePicture: userPhotoURL,
                reciverUserName: userName,
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 30,
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: userPhotoURL,
                }}
                style={styles.userImage}
                resizeMode="cover"
              />
              <View
                styles={{
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                }}>
                <Text style={{color: '#000', fontWeight: '500'}}>
                  {userName}
                </Text>
                <Text
                  style={{color: '#B0B0B0'}}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {message}
                </Text>
              </View>
              <Text
                style={{
                  color: '#C5C5C5',
                  alignSelf: 'flex-start',
                  marginLeft: 'auto',
                  fontSize: 12.5,
                  fontWeight: '500',
                  marginTop: 3,
                }}>
                {moment(timestamp).format('ll')}
              </Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginRight: 10,
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

export default ChatComponent;
