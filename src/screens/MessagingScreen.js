import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Switch,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import ChatComponent from '../components/ChatComponent';
import {
  getDatabase,
  ref as ref_database,
  set as set_database,
  get as get_database,
  update as update_databse,
  push,
  onValue,
  query,
  orderByChild,
} from 'firebase/database';
import SearchComponent from '../components/SearchComponent';
import {authentication} from '../api/firebase';
import {db} from '../api/firebase';
import {MaterialIndicator} from 'react-native-indicators';
import GeneralButton from '../components/GeneralButton';
import {realtimedb} from '../api/firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
const MessagingScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});

    const loadData = async () => {
      const dbRef = query(
        ref_database(
          realtimedb,
          `users/${authentication.currentUser.uid}/members`,
        ),
        orderByChild('lastMessage/createdAt'),
      );
      let items = [];
      onValue(dbRef, snapshot => {
        snapshot.forEach(childSnapshot => {
          const childKey = childSnapshot.key;
          if (childSnapshot.val()['lastMessage'][0]['text'] !== 'empty') {
            items.push({
              id: childSnapshot.key,
              useruid: childSnapshot.key,
              userName: childSnapshot.val()['username'],
              userPhotoURL: childSnapshot.val()['profile_picture'],
              message: childSnapshot.val()['lastMessage'][0]['text'],
              timestamp: childSnapshot.val()['lastMessage'][0]['createdAt'],
            });
          }
        });
        setList(items.reverse());
      });
    };
    loadData();

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      {!loading ? (
        <FlatList
          contentContainerStyle={{borderTopRightRadius: 20}}
          ListHeaderComponent={
            <>
              <View
                style={{
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  marginTop: 6,
                  marginBottom: 10,
                  marginLeft: -10,
                  marginRight: -10,
                  backgroundColor: '#36B199',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 17,
                    fontWeight: '500',
                    marginTop: 7,
                    paddingLeft: 5,
                  }}>
                  Chat with other players
                </Text>

                <SearchComponent
                  onpress={() => {
                    navigation.navigate('SearchScreen');
                  }}
                />
              </View>
            </>
          }
          nestedScrollEnabled={true}
          keyExtractor={item => item.id}
          data={list}
          renderItem={({item}) => (
            <ChatComponent
              useruid={item.useruid}
              userName={item.userName}
              userPhotoURL={item.userPhotoURL}
              message={item.message}
              timestamp={item.timestamp}
              screenName={'ChatScreen'}
            />
          )}
          ListFooterComponent={
            <>
              <View style={{marginTop: 100}}></View>
            </>
          }
        />
      ) : (
        <MaterialIndicator
          size={40}
          color="#36B199"
          style={{
            marginTop: 230,
            flex: 1,
            alignSelf: 'center',
          }}></MaterialIndicator>
      )}
    </View>
  );
};

export default MessagingScreen;
