import React, {useState, useEffect, useContext} from 'react';
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
import {MaterialIndicator} from 'react-native-indicators';
import NewMatchCard from '../components/NewMatchCard';
import {db} from '../api/firebase';
import {authentication} from '../api/firebase';
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
  limit,
} from 'firebase/firestore';
import DatePicker from 'react-native-date-picker';
import MatchOverviewCard from '../components/MatchOverviewCard';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import moment from 'moment';
import SwitchCustom from '../components/SwitchCustom';
const OverviewScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [nogames, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [upcomingGames, setupcomingGames] = useState([]);
  const [pastGames, setpastGames] = useState([]);
  const [eloRating, setEloRating] = useState([]);

  const fetchGames = async () => {
    setLoading(true);
    let listUpcoming = [];
    let listPast = [];
    let listnoWinner = [];
    const currentUserRef = doc(db, 'users', authentication.currentUser.uid);
    const docSnap = await getDoc(currentUserRef);
    if (docSnap.exists()) {
      const elo = docSnap.data().eloRating;
      setEloRating(elo);
      const games = docSnap.data().games;
      games.forEach(async game => {
        //get get based on current user game list
        const gamesRef = doc(db, 'games', game);
        const docSnapGame = await getDoc(gamesRef);
        let oponentUid = '';
        if (docSnapGame.exists()) {
          //if it has an oponent show game => if not it still waits for request => don't show it
          if (docSnapGame.data().user2) {
            //fet oponent uid
            if (docSnapGame.data().user1 == authentication.currentUser.uid) {
              oponentUid = docSnapGame.data().user2;
            } else {
              oponentUid = docSnapGame.data().user1;
            }
            //get oponents details
            const oponentRef = doc(db, 'users', oponentUid);
            const oponentSnap = await getDoc(oponentRef);
            if (oponentSnap.exists()) {
              //check if it is upcoming game or past game
              const gameDate = docSnapGame.data().date;
              const currentDate = new Date();
              const eloConverted = Math.round(
                oponentSnap.data().eloRating / 200,
              );
              const formatedDate = moment(gameDate.toDate()).format(
                'MMM Do, h:mm a',
              );
              //upcoming

              if (gameDate.toDate() > currentDate) {
                listUpcoming.push({
                  winner: false,
                  upcoming: true,
                  id: docSnapGame.id,
                  oponentName: oponentSnap.data().name,
                  oponentPhoto: {uri: oponentSnap.data().ProfileImage},
                  oponentEloRating: oponentSnap.data().eloRating,
                  oponentSkill:
                    'Level ' +
                    eloConverted +
                    ' (' +
                    oponentSnap.data().eloRating +
                    ' elo)',
                  gameId: docSnapGame.id,
                  date: formatedDate,
                  winnerUser: 'none',
                  oponentUid: oponentUid,
                  location:
                    docSnapGame.data().court +
                    ', ' +
                    docSnapGame.data().location,
                });
              }
              //is a past game
              else {
                //game has results

                if (docSnapGame.data().winnerUser) {
                  listPast.push({
                    upcoming: false,
                    winner: true,
                    id: docSnapGame.id,
                    oponentName: oponentSnap.data().name,
                    oponentPhoto: {uri: oponentSnap.data().ProfileImage},
                    oponentEloRating: oponentSnap.data().eloRating,
                    oponentSkill:
                      'Level ' +
                      eloConverted +
                      ' (' +
                      oponentSnap.data().eloRating +
                      ' elo)',
                    gameId: docSnapGame.id,
                    date: formatedDate,
                    winnerUser: docSnapGame.data().winnerUser,
                    oponentUid: oponentUid,
                    location:
                      docSnapGame.data().court +
                      ', ' +
                      docSnapGame.data().location,
                  });
                } else {
                  listnoWinner.push({
                    upcoming: false,
                    winner: false,
                    id: docSnapGame.id,
                    oponentName: oponentSnap.data().name,
                    oponentPhoto: {uri: oponentSnap.data().ProfileImage},
                    oponentEloRating: oponentSnap.data().eloRating,
                    oponentSkill:
                      'Level ' +
                      eloConverted +
                      ' (' +
                      oponentSnap.data().eloRating +
                      ' elo)',
                    gameId: docSnapGame.id,
                    date: formatedDate,
                    winnerUser: 'none',
                    oponentUid: oponentUid,
                    location:
                      docSnapGame.data().court +
                      ', ' +
                      docSnapGame.data().location,
                  });
                  setGames(listnoWinner);
                }
              }
            }
          }
        }
      });

      setupcomingGames(listUpcoming);
      setFilteredGames(listUpcoming);

      //connactenete the past games with the ones who have no winner first
    }
    setTimeout(() => {
      if (true) {
        console.log(listPast);
        console.log(listnoWinner);
        //const provlits = [...nogames, ...listPast];
        const provlits = listnoWinner.concat(listPast);
        setpastGames(provlits);
      } else {
        setpastGames(listPast);
      }
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchGames();
    });
    return unsubscribe;
  }, [navigation]);

  const filter = index => {
    if (index == 1) {
      setFilteredGames(upcomingGames);
    }
    if (index == 2) {
      setFilteredGames(pastGames);
    }
  };
  return (
    <View style={styles.container}>
      {!loading ? (
        <FlatList
          ListHeaderComponent={
            <>
              <SwitchCustom
                selectionMode={1}
                option1={'Upcoming'}
                option2={'Past Games'}
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
            <MatchOverviewCard
              key={item.id}
              upcoming={item.upcoming}
              winner={item.winner}
              oponentUid={item.oponentUid}
              oponentName={item.oponentName}
              oponentPhoto={item.oponentPhoto}
              oponentSkill={item.oponentSkill}
              date={item.date}
              gameId={item.gameId}
              location={item.location}
              winnerUser={item.winnerUser}
              profileScreenName="UserProfile"
              oponentEloRating={item.oponentEloRating}
              currentUserElo={eloRating}
              oponentForvsGame={authentication.currentUser.uid}
              oponentForvsName={authentication.currentUser.displayName}
              oponentForvsPicture={authentication.currentUser.photoURL}
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
export default OverviewScreen;
