import React, {useState, useEffect, useContext, Component} from 'react';
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
} from 'react-native';
import Input from '../components/Input';
import GeneralButton from '../components/GeneralButton';
import TextButton from '../components/TextButton';
import Feather from 'react-native-vector-icons/Feather';
import {withNavigation} from 'react-navigation';
import Header from '../components/Header';
import UpcomingMatchCard from '../components/UpcomingMatchCard';
import NewMatchCard from '../components/NewMatchCard';
import DatePicker from 'react-native-date-picker';
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
  limit,
} from 'firebase/firestore';
import {authentication} from '../api/firebase';
import RequestComponent from '../components/RequestComponent';
import SwitchCustom from '../components/SwitchCustom';
import {storage} from '../api/firebase';
import {getStorage, uploadBytes, ref, getDownloadURL} from 'firebase/storage';
import {firebase} from '@react-native-firebase/firestore';
import {MaterialIndicator} from 'react-native-indicators';
import SearchGameCard from '../components/SearchGameCard';
var {Platform} = React;

const RequestScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  const fetchGames = async () => {
    setLoading(true);
    let list = [];
    let list2 = [];
    const currentUserRef = doc(db, 'users', authentication.currentUser.uid);
    const docSnap = await getDoc(currentUserRef);
    if (docSnap.exists()) {
      const requests = docSnap.data().request;
      requests.forEach(async request => {
        const oponentRef = doc(db, 'users', request.oponent);
        const oponentSnap = await getDoc(oponentRef);
        const eloConverted = Math.round(oponentSnap.data().eloRating / 200);

        if (oponentSnap.exists()) {
          list.push({
            id: request.id,
            oponentName: oponentSnap.data().name,
            oponentPhoto: {uri: oponentSnap.data().ProfileImage},
            oponentSkill:
              'Level ' +
              eloConverted +
              ' (' +
              oponentSnap.data().eloRating +
              ' elo)',

            gameId: request.gameId,
            incoming: request.incoming,
            date: request.date,
            oponentUid: request.oponent,
          });

          if (request.incoming == true) {
            list2.push({
              id: request.id,
              oponentName: oponentSnap.data().name,
              oponentPhoto: {uri: oponentSnap.data().ProfileImage},
              oponentSkill:
                'Level ' +
                eloConverted +
                ' (' +
                oponentSnap.data().eloRating +
                ' elo)',

              gameId: request.gameId,
              incoming: request.incoming,
              date: request.date,
              oponentUid: request.oponent,
            });
          }
        }
      });

      setGames(list);
      setFilteredGames(list2);
    }
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  const filter = index => {
    if (index == 1) {
      const newData = games.filter(item => {
        const gamesIncoming = item.incoming;
        const toogleIncoming = true;
        return gamesIncoming == toogleIncoming;
      });

      setFilteredGames(newData);
    }
    if (index == 2) {
      const newData = games.filter(item => {
        const gamesIncoming = item.incoming;
        const toogleIncoming = false;
        return gamesIncoming == toogleIncoming;
      });

      setFilteredGames(newData);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchGames();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {!loading ? (
        <FlatList
          ListHeaderComponent={
            <>
              <Header
                loactionvisible={false}
                pageTitle={'Requests'}
                onPress={navigation.openDrawer}
                left={0}
              />

              <SwitchCustom
                selectionMode={1}
                option1={'Incoming'}
                option2={'Pending'}
                onSelectSwitch={filter}
              />
            </>
          }
          nestedScrollEnabled={true}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          data={filteredGames}
          renderItem={({item}) => (
            <RequestComponent
              key={item.id}
              visible={true}
              useruid={item.oponentUid}
              userName={item.oponentName}
              level={item.oponentSkill}
              profilePicture={item.oponentPhoto}
              date={item.date}
              gameId={item.gameId}
              incoming={item.incoming}
              screenName="UserProfile"
              chatScreenName="ChatScreen"
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  greetingText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 25,
    marginLeft: 5,
  },
  upcomingMatchesText: {
    color: '#767676',
    fontSize: 17,
  },
});

export default RequestScreen;
