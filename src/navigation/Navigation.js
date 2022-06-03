import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import GenerateGameScreen from '../screens/GenerateGameScreen';
import OverviewScreen from '../screens/OverviewScreen';
import MessagingScreen from '../screens/MessagingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Header from '../components/Header';

const fullScreenWidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{top: -20, justifyContent: 'center', alignItems: 'center'}}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 15,
          right: 15,
          elevation: 0,
          borderRadius: 70,
          height: 60,
          ...styles.shadow,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          headerTitle: () => <Header loactionvisible={true} />,

          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/home.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#2E3A58' : '#E1E1E4',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessagingScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          headerTitle: () => <Header loactionvisible={true} />,

          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/message.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#2E3A58' : '#E1E1E4',
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="GenerateGame"
        component={GenerateGameScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          headerTitle: () => (
            <Header loactionvisible={false} pageTitle={'Generate new game'} />
          ),

          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/plus.png')}
              resizeMode="contain"
              style={{
                width: 60,
                height: 60,
                tintColor: focused ? '#36B199' : '#36B199',
              }}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Overwiew"
        component={OverviewScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          headerTitle: () => <Header loactionvisible={true} />,

          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/overview.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#2E3A58' : '#E1E1E4',
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          headerTitle: () => <Header loactionvisible={true} />,

          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/settings.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#2E3A58' : '#E1E1E4',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#C5C5C5',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.05,
    elevation: 7,
    shadowRadius: 20,
  },
});
export default Navigation;
