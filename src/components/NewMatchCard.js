import React, {useState, useEffect, useContext, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {authentication, db} from '../api/firebase';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
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
  arrayUnion,
} from 'firebase/firestore';
import {
  getDatabase,
  ref as ref_database,
  set as set_database,
  get as get_database,
  update as update_databse,
  push,
} from 'firebase/database';
import {realtimedb} from '../api/firebase';

const NewMatchCard = ({
  visible,
  userUid,
  item,
  userName,
  level,
  profilePicture,
  location,
  date,
  docid,
  chatScreenName,
  profileScreenName,
}) => {
  const navigation = useNavigation();
  const fetchGames = async () => {
    // const [user, setuser] = useState('r');
    // const subColRef = collection(db, 'users', user, 'games');
    // const qSnap = await getDocs(subColRef);
    // console.log('data');
    // qSnap.forEach(doc => {
    //   // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    //});
  };

  const inisalizeChat = async () => {
    let chatroomId = '';
    const currentUserdb = await get_database(
      ref_database(
        realtimedb,
        `users/${authentication.currentUser.uid}/members/${userUid}`,
      ),
    );

    if (!currentUserdb.val()) {
      const newChatroomRef = await push(ref_database(realtimedb, 'chatrooms'), {
        user1: authentication.currentUser.uid,
        user2: userUid,
      });
      chatroomId = newChatroomRef.key;
      await set_database(
        ref_database(
          realtimedb,
          `users/${authentication.currentUser.uid}/members/${userUid}`,
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
          `users/${userUid}/members/${authentication.currentUser.uid}`,
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
      reciverUserUid: userUid,
      reciverProfilePicture: profilePicture.uri,
      reciverUserName: userName,
    });
  };

  const generaterequest = async () => {
    const currentuserRef = doc(db, 'users', authentication.currentUser.uid);

    const currentuserObj = {
      gameId: docid,
      incoming: false,
      oponent: userUid,
      date: date,
    };
    await updateDoc(currentuserRef, {
      request: arrayUnion(currentuserObj),
    });
  };

  const generateRequestOponent = async () => {
    const oponentuserRef = doc(db, 'users', userUid);
    const oponentuserObj = {
      gameId: docid,
      incoming: true,
      oponent: authentication.currentUser.uid,
      date: date,
    };
    await updateDoc(oponentuserRef, {
      request: arrayUnion(oponentuserObj),
    });
  };

  const updateGame = async () => {
    const gameRef = doc(db, 'games', docid);
    await updateDoc(gameRef, {
      request: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexView}>
        <TouchableOpacity
          onPress={() =>
            navigation.push(profileScreenName, {
              userUid: userUid,
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

      <View style={{...styles.flexView, marginTop: 30, alignItems: 'center'}}>
        <Image
          source={require('../assets/locationPin.png')}
          resizeMode="contain"
          style={styles.locationPin}
        />
        <Text style={styles.location}>{location}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.dateView}>
          <Image
            source={require('../assets/watch.png')}
            resizeMode="contain"
            style={styles.watchImage}
          />
          <Text style={styles.dateText}>{date}</Text>
        </View>
        {visible ? (
          <>
            <TouchableOpacity
              onPress={async () => {
                await generaterequest();
                await generateRequestOponent();
                await updateGame();
                Alert.alert('Request sent!');
              }}>
              <Image
                source={require('../assets/attend.png')}
                resizeMode="contain"
                style={styles.attendImage}
              />
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#757575',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 6,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  upcomingMatchesText: {
    color: '#767676',
    fontSize: 17,
  },

  profilePicture: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
    borderRadius: 7,
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
  },
  locationPin: {
    tintColor: '#B4B4B4',
    height: 13,
    width: 13,
  },
  location: {
    marginLeft: 8,
    fontSize: 13,
    color: '#B4B4B4',
  },
  dateView: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchImage: {
    tintColor: '#B4B4B4',
    height: 13,
    width: 13,
  },
  dateText: {
    marginLeft: 8,
    color: '#B4B4B4',
    fontSize: 13,
  },
  attendImage: {
    tintColor: '#B4B4B4',
    height: 25,
    width: 25,
  },
});

export default NewMatchCard;
