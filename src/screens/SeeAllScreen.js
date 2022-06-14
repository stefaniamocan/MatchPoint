import {useLinkProps} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Alert,
  FlatList,
} from 'react-native';

import MatchOverviewCard from '../components/MatchOverviewCard';

import {TouchableOpacity} from 'react-native-gesture-handler';

import Stars from 'react-native-stars';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import ReviewCard from '../components/ReviewCard';
import ProfileGameComponent from '../components/ProfileGameComponent';
const SeeAllScreen = ({navigation, route}) => {
  const [rating, setRating] = useState(5);
  const {list, games, stars} = route.params;

  return (
    <View style={styles.container}>
      {!games ? (
        <>
          <View style={{marginHorizontal: 15}}>
            <FlatList
              ListHeaderComponent={
                <>
                  <View>
                    <Text
                      style={{
                        color: '#2E3A59',
                        alignSelf: 'center',
                        fontSize: 20,
                        fontWeight: '500',
                      }}>
                      User Reviews
                    </Text>
                  </View>
                  <View
                    style={{
                      marginBottom: 30,
                      backgroundColor: '#F5F8FF',
                      flexDirection: 'row',
                      width: '58%',
                      alignSelf: 'center',
                      padding: 10,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      marginTop: 10,
                    }}>
                    <Stars
                      half={true}
                      display={stars}
                      spacing={3}
                      count={5}
                      starSize={15}
                      fullStar={require('../assets/fullStar.png')}
                      emptyStar={require('../assets/emptyStar.png')}
                    />
                    <View>
                      <Text
                        style={{
                          color: '#75768B',
                          marginRight: 7,
                          fontWeight: '500',
                          fontSize: 12,
                        }}>
                        {stars} out of 5
                      </Text>
                    </View>
                  </View>
                </>
              }
              nestedScrollEnabled={true}
              keyExtractor={item => item.id}
              data={list}
              renderItem={({item}) => (
                <ReviewCard
                  userPhotoURL={item.review_userPhotoURL}
                  userName={item.review_userName}
                  userRating={item.review_userRating}
                  useruid={item.review_userUid}
                  postTime={item.review_time}
                  screenName="UserProfile"
                />
              )}
              ListFooterComponent={
                <>
                  <View style={{marginTop: 70}}></View>
                </>
              }
            />
          </View>
        </>
      ) : (
        <>
          <View style={{marginHorizontal: 5}}>
            <FlatList
              ListHeaderComponent={
                <>
                  <View>
                    <Text
                      style={{
                        color: '#2E3A59',
                        alignSelf: 'center',
                        fontSize: 20,
                        fontWeight: '500',
                        marginBottom: 30,
                      }}>
                      Past Games
                    </Text>
                  </View>
                </>
              }
              nestedScrollEnabled={true}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              data={list}
              renderItem={({item}) => (
                <MatchOverviewCard
                  key={item.id}
                  upcoming={false}
                  winner={true}
                  oponentUid={item.oponentUid}
                  oponentName={item.oponentName}
                  oponentPhoto={item.oponentPhoto}
                  //oponentSkill={gamesoponentSkill}
                  date={item.date}
                  gameId={item.gameId}
                  location={item.location}
                  winnerUser={item.winnerUser}
                />
              )}
              ListFooterComponent={
                <>
                  <View style={{marginTop: 70}}></View>
                </>
              }
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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

export default SeeAllScreen;
