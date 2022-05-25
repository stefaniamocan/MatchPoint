import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const UpcomingMatchCard = ({
  pictureSource,
  cityLocation,
  name,
  level,
  data,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.upcomingMatchesText}>Upcoming Matches</Text>
      <View style={styles.cardView}>
        <View style={styles.flexView}>
          <Image
            source={require('../assets/profilePicture2.jpg')}
            resizeMode="contain"
            style={styles.profilePicture}
          />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.level}>{level}</Text>
          </View>
          <Image
            source={require('../assets/message.png')}
            style={styles.messageicon}
          />
        </View>
        <View
          style={{...styles.flexView, marginTop: 15, alignItems: 'center'}}
          s>
          <Image
            source={require('../assets/locationPin.png')}
            resizeMode="contain"
            style={styles.locationPin}
          />
          <Text style={styles.location}>Baza Sportiva Nr 2, Timisoara</Text>
        </View>
        <View style={styles.dateView}>
          <Image
            source={require('../assets/watch.png')}
            resizeMode="contain"
            style={styles.watchImage}
          />
          <Text style={styles.dateText}>{data}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  upcomingMatchesText: {
    color: '#767676',
    fontSize: 17,
  },
  cardView: {
    marginTop: 15,
    backgroundColor: '#36B199',
    borderRadius: 12,
    padding: 15,
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
    color: '#ECF4F3',
  },
  level: {
    marginTop: -2,
    fontSize: 13,
    marginLeft: 8,
  },
  messageicon: {
    tintColor: '#7ACCBC',
    height: 30,
    width: 30,
    marginLeft: 'auto',
  },
  locationPin: {
    tintColor: '#7ACCBC',
    height: 17,
    width: 17,
  },
  location: {
    marginLeft: 8,
    fontSize: 14,
  },
  dateView: {
    marginTop: 20,
    borderRadius: 7,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#53C7B0',
    alignItems: 'center',
  },
  watchImage: {
    tintColor: '#CAE7E1',
    height: 16,
    width: 16,
  },
  dateText: {
    marginLeft: 13,
    fontSize: 15,
  },
});

export default UpcomingMatchCard;
