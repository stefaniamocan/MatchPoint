import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {authentication} from '../api/firebase';
import {Dimensions} from 'react-native';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const Header = ({loactionvisible, cityLocation, pageTitle}) => {
  const [profilePicture, setProfilePicture] = useState(
    authentication.currentUser.photoURL,
  );
  return (
    <View style={{backgroundColor: 'white', width: width, right: 15}}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <View>
          {loactionvisible ? (
            <>
              <Text style={styles.currentlocation}>Current Location</Text>
              <View style={styles.locationView}>
                <Image
                  source={require('../assets/locationPin.png')}
                  resizeMode="contain"
                  style={styles.locationPin}
                />
                <Text style={styles.currentlocationCity}>Timisoara</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.pageTitle}>{pageTitle}</Text>
            </>
          )}
        </View>
        <Image source={{uri: profilePicture}} style={styles.profilePicture} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    marginHorizontal: 10,
  },
  locationPin: {
    width: 15,
    height: 15,
  },
  logo: {
    width: 40,
    height: 40,
  },
  currentlocation: {
    color: '#B4B4B4',
  },
  currentlocationCity: {
    marginLeft: 5,
    color: '#323232',
    fontWeight: '500',
  },
  profilePicture: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
    borderRadius: 7,
  },
  locationView: {
    flexDirection: 'row',
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    color: '#B7B7B7',
    fontSize: 16,
  },
});

export default Header;
