import {useLinkProps} from '@react-navigation/native';
import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, TextInput, View, Text, Image, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Stars from 'react-native-stars';
import moment from 'moment';
import {realtimedb} from '../api/firebase';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import {authentication} from '../api/firebase';
import ChatComponent from '../components/ChatComponent';
import {
  getDatabase,
  ref as ref_database,
  set as set_database,
  get as get_database,
  update as update_databse,
  push,
  onValue,
} from 'firebase/database';

const SearchScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});

    const loadData = async () => {
      const dbRef = await ref_database(realtimedb, `users`);
      let items = [];
      onValue(
        dbRef,
        snapshot => {
          snapshot.forEach(childSnapshot => {
            if (childSnapshot.key !== authentication.currentUser.uid) {
              items.push({
                id: childSnapshot.key,
                useruid: childSnapshot.key,
                userName: childSnapshot.val()['username'],
                userPhotoURL: childSnapshot.val()['profile_picture'],
              });
            }
            setList(items);
          });
        },
        {
          onlyOnce: true,
        },
      );
    };
    loadData();

    return unsubscribe;
  }, [navigation]);

  return (
    //<View></View>
    <FlatList
      contentContainerStyle={{borderTopRightRadius: 20}}
      ListHeaderComponent={
        <>
          <View></View>
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
          screenName={'ChatScreen'}
          search={true}
        />
      )}
      ListFooterComponent={
        <>
          <View style={{marginTop: 100}}></View>
        </>
      }
    />
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

export default SearchScreen;
