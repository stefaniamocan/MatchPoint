import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {authentication} from '../api/firebase';
import {Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const Header = ({loactionvisible, cityLocation, pageTitle, ...rest}) => {
  const [profilePicture, setProfilePicture] = useState(
    authentication.currentUser.photoURL,
  );
  return (
    <View style={{backgroundColor: 'white', width: width, right: 15}}>
      <View style={styles.header}>
        <TouchableOpacity {...rest}>
          <Image
            source={require('../assets/drawerNav.png')}
            resizeMode="contain"
            style={styles.drawer}
          />
        </TouchableOpacity>
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
        <Image
          source={require('../assets/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
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
    paddingBottom: 10,
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
    color: '#2E3A59',
    fontWeight: '500',
    fontSize: 16,
  },
  drawer: {
    width: 23,
    height: 23,
  },
});

export default Header;
