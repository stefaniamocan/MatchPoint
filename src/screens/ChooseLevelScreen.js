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
  Image,
} from 'react-native';
import Input from '../components/Input';
import TextButton from '../components/TextButton';
import {withNavigation} from 'react-navigation';
import Header from '../components/Header';
import GeneralButton from '../components/GeneralButton';
import Navigation from '../navigation/Navigation';
import HomeScreen from './HomeScreen';
import {SliderPicker} from 'react-native-slider-picker';
import {
  collection,
  getDoc,
  setDoc,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import {authentication} from '../api/firebase';
import {db} from '../api/firebase';

const ChooseLevelScreen = ({navigation}) => {
  const [level, setLevel] = useState(5);
  const storeLevel = () => {
    const userDocRef = doc(db, 'users', authentication.currentUser.uid);
    //inisalize elo rating points based on users initial skill input
    const initial_eloRating = level * 200; //our elo system should be between 0 -2000 on a scale from 1-10
    setDoc(
      userDocRef,
      {level: level, eloRating: initial_eloRating},
      {merge: true},
    ).then(() => {
      navigation.navigate('drawernavigationscr');
    });
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.app}>
        <View style={styles.container}>
          <Text style={styles.stepText}>Step 3/3</Text>
          <Text style={styles.titleText}>Choose Your Skill Level</Text>
          <Text style={styles.textDescription}>
            The scale used is based on the International Tennis Number System
            (ITN). If you are not sure what your level is, please read our
            guideline.
          </Text>
        </View>

        <TouchableOpacity
          style={{marginHorizontal: 14, marginTop: 20, marginBottom: 60}}
          onPress={() => {
            navigation.navigate('LevelGuidelines');
          }}>
          <View style={styles.guidelineCard}>
            <View style={{alignSelf: 'center'}}>
              <Image
                source={require('../assets/ballGuideline.png')}
                style={styles.image}
                resizeMode="cover"></Image>
            </View>

            <View style={{paddingLeft: 15, flex: 1}}>
              <Text
                style={{
                  color: '#FFFFFF',
                  marginBottom: 5,
                  flexWrap: 'wrap',
                  fontWeight: '500',
                }}>
                Level Choosing Guidelines
              </Text>
              <Text style={{color: '#FFFFFF', flexWrap: 'wrap', fontSize: 13}}>
                Read our guidelines and determine your level
              </Text>
            </View>

            <View style={{alignSelf: 'center', marginLeft: 3}}>
              <Image
                source={require('../assets/whiteArrowRight.png')}
                style={styles.arrow}
                resizeMode="cover"></Image>
            </View>
          </View>
        </TouchableOpacity>

        <SliderPicker
          minLabel={'Skill Level'}
          maxValue={10}
          callback={position => {
            setLevel(position);
          }}
          labelFontColor={'#7D7D7D'}
          labelFontSize={13}
          labelFontWeight={'600'}
          showFill={true}
          fillColor={'#36B199'}
          labelFontWeight={'bold'}
          showNumberScale={true}
          scaleNumberFontSize={12}
          scaleNumberFontColor={'#DDDDDD'}
          scaleNumberFontWeight={'bold'}
          buttonBackgroundColor={'#fff'}
          buttonBorderColor={'#DDDDDD'}
          buttonDimensionsPercentage={6}
          heightPercentage={2}
          widthPercentage={85}
          sliderInnerBorderStyles={{
            borderWidth: 0,
            borderRadius: 50,
            borderColor: '#EDEDED',
          }}
          sliderInnerStylesOverride={{height: 13}}
          sliderInnerBackgroundColor={'#EDEDED'}
          buttonStylesOverride={{marginTop: -5}}
          numberStylesOverride={{color: '#D9D9D9'}}
        />

        <GeneralButton
          title={'Finish'}
          buttonStyle={styles.buttonStyle}
          onPress={() => storeLevel()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
  },

  textDescription: {
    marginHorizontal: 30,
    fontSize: 15,
    color: '#7D7D7D',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 7,
  },

  buttonStyle: {
    marginTop: 60,
  },

  guidelineCard: {
    backgroundColor: '#36B199',
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  guidelineText: {
    color: '#000000',
  },

  image: {
    width: 40,
    height: 40,
  },
  arrow: {
    width: 20,
    height: 30,
  },
  stepText: {
    marginTop: 40,
    color: '#36B199',
    marginBottom: 10,
  },
});

export default ChooseLevelScreen;
