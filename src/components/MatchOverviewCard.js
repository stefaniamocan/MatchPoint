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
import {useNavigation, NavigationContainer} from '@react-navigation/native';
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
  oponentUid,
  location,
  profileStyle,
  oponentForvsGame,
  oponentForvsName,
  oponentEloRating,
  oponentForvsPicture,
  currentUserElo,
  profileScreenName,
}) => {
  const [currentUser_EloConversion, setCurrentUser_EloConversion] = useState(
    Math.round(currentUserElo / 200),
  );
  const navigation = useNavigation();
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

  //calculate elo probability (outcome of the game)
  const matchProbability = (current, oponentlevel2) => {
    return (
      (1.0 * 1.0) / (1 + 1.0 * Math.pow(10, (current - oponentlevel2) / 400))
    );
  };

  //calculate elo
  const updateSkillLevel = async currentUserWon => {
    //calcuate probability for the oponent
    let P_oponent = matchProbability(currentUserElo, oponentEloRating);
    let P_current = matchProbability(oponentEloRating, currentUserElo);
    console.log(P_oponent);
    console.log(P_current);
    let NewElo_oponent = 0;
    let NewElo_current = 0;
    if (currentUserWon) {
      //new rating if current user wins
      NewElo_oponent = oponentEloRating + 32 * (0 - P_oponent);
      NewElo_current = currentUserElo + 32 * (1 - P_current);
    } else {
      //new rating if oponent wins
      NewElo_oponent = oponentEloRating + 32 * (1 - P_oponent);
      NewElo_current = currentUserElo + 32 * (0 - P_current);
    }
    console.log(NewElo_oponent);
    console.log(NewElo_current);
    //update oponent Elo
    //round elo and if >2000 keep it 2000 if <0 keep it 0
    const newElo = Math.round(NewElo_oponent);
    if (newElo < 0) {
      newElo = 0;
    }
    if (newElo > 2000) {
      newElo = 2000;
    }
    const oponentRef = doc(db, 'users', oponentUid);
    await updateDoc(oponentRef, {
      eloRating: newElo,
    });

    //update Current user Elo
    const newElo_current_rounded = Math.round(NewElo_current);
    if (newElo_current_rounded < 0) {
      newElo_current_rounded = 0;
    }
    if (newElo_current_rounded > 2000) {
      newElo_current_rounded = 2000;
    }
    const currentRef = doc(db, 'users', authentication.currentUser.uid);
    await updateDoc(currentRef, {
      eloRating: newElo_current_rounded,
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
                  navigation.push(profileScreenName, {
                    userUid: oponentUid,
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
                  navigation.push(profileScreenName, {
                    userUid: oponentUid,
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
                  source={{uri: oponentForvsPicture}}
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
                  {oponentForvsName}
                </Text>
                <Text style={styles.level}>
                  Level {currentUser_EloConversion} ({currentUserElo} elo)
                </Text>
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
                    marginLeft: winnerUser == oponentForvsGame ? 'auto' : 10,
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
                      updateSkillLevel(false);
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
                      updateSkillLevel(true);
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
