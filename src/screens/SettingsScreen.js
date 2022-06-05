import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Input from '../components/Input';
import GeneralButton from '../components/GeneralButton';
import TextButton from '../components/TextButton';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import placheHolderImage from '../assets/profilePlaceHolder.jpg';
import {withNavigation} from 'react-navigation';
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
import {storage} from '../api/firebase';
import {getStorage, uploadBytes, ref, getDownloadURL} from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  reauthenticateWithCredential,
  updateEmail,
} from 'firebase/auth';
import {Dimensions} from 'react-native';
import SettingsInput from '../components/SettingsInput';
import GenderComponent from '../components/GenderComponent';
import {SliderPicker} from 'react-native-slider-picker';

const SettingsScreen = ({navigation}) => {
  //useStates
  const [photoURL, setProfileImage] = useState(
    authentication.currentUser.photoURL,
  );
  const [level, setLevel] = useState(5);

  const [username, setUsername] = useState(
    authentication.currentUser.displayName,
  );
  const [email, setEmail] = useState(authentication.currentUser.email);

  const [gender, setGender] = useState('');

  const [bio, setBio] = useState('');
  const [maleBoolean, setmaleBoolean] = useState(false);
  const [femaleBoolean, setfemaleBoolean] = useState(false);

  const selectFromGalleryWithCrop = async () => {
    await ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
      path: 'images',
      cropperCircleOverlay: true,
      includeBase64: true,
    })
      .then(image => {
        setProfileImage(image.path);
      })
      .catch((error, re) => {
        alert(error.message);
        console.log(re);
      });
  };

  const openCameraWithCrop = async () => {
    await ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
      path: 'images',
      includeBase64: true,
    })
      .then(image => {
        setProfileImage(image.path);
      })
      .catch((error, re) => {
        alert(error.message);
        console.log(re);
      });
  };

  const changeImageOrGallery = () => {
    Alert.alert(
      'Choose modality',
      'Choose your modality for choosing to pick image',
      [
        {
          text: 'Pick image',
          onPress: () => selectFromGalleryWithCrop(),
          style: 'default',
        },
        {
          text: 'Take a photo',
          onPress: () => openCameraWithCrop(),
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const uploadImageFireStore = async imagePath => {
    const imageName = authentication.currentUser.uid + '_profilePicture.jpg';
    const storageRef = ref(storage, imageName);
    const img = await fetch(imagePath);
    const bytes = await img.blob();
    await uploadBytes(storageRef, bytes);

    await getDownloadURL(storageRef)
      .then(async photoURL => {
        await updateProfile(authentication.currentUser, {
          photoURL: photoURL,
        })
          .then(async () => {
            try {
              const refImage = doc(db, 'users', authentication.currentUser.uid);
              await updateDoc(refImage, {
                ProfileImage: photoURL,
              });
            } catch (err) {
              console.log(err);
            }
          })
          .catch(error => {
            Alert.alert(error);
          });
      })
      .catch((error, re) => {
        alert(error.message);
        console.log(re);
      });
  };

  //fetch data
  const fetchData = async () => {
    const docRef = doc(db, 'users', authentication.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBio(docSnap.data().bio);
      setLevel(docSnap.data().level);
      setGender(docSnap.data().gender);
      if (gender == 'female') {
        setfemaleBoolean(true);
        setmaleBoolean(false);
      } else {
        setfemaleBoolean(false);
        setmaleBoolean(true);
      }
    }
  };

  //update data before page is rendered
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);
  //functions
  const updateToFirebase = async () => {
    updateUserCollection()
      .then(() => {
        uploadImageFireStore(photoURL);
      })
      .then(() => {
        if (authentication.currentUser.displayName != username) {
          updateProfile(authentication.currentUser, {
            displayName: username,
          });
        }
      })
      // .then(() => {
      //   if (authentication.currentUser.email != email) {
      //     updateEmail(authentication.currentUser, email).then(() => {});
      //   }
      // })

      .then(() => {
        Alert.alert('Changes have been saved!');
      });
  };

  const updateUserCollection = async () => {
    const docRef = doc(db, 'users', authentication.currentUser.uid);
    await updateDoc(docRef, {
      gender: gender,
      name: username,
      level: level,
      bio: bio,
    });
  };

  const logout = () => {
    const user = authentication.currentUser;

    const email = authentication.currentUser.email;
    signOut(authentication)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(re => {
        alert(re.message);
      });
  };

  const reauthenticateUser = async currentPassword => {
    const user = authentication.currentUser;
    const credentials = await authentication.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    // return
    reauthenticateWithCredential(user, credentials);
  };

  return (
    <ScrollView style={styles.app}>
      <View style={styles.container}>
        <Text style={styles.settingsTitle}>Account</Text>
        <View style={{...styles.photoContainer, marginBottom: 35}}>
          <Text style={styles.photoText}>Photo</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: photoURL}}
              style={styles.image}
              resizeMode="cover"
            />
            <TextButton
              boldText={'Upload Image'}
              containerStyle={{paddingTop: 20}}
              onPress={() => changeImageOrGallery()}
            />
          </View>
        </View>
        <SettingsInput
          title="Name"
          initialValue={username}
          onChangeText={newValue => setUsername(newValue)}
        />

        <SettingsInput
          title="Bio     "
          initialValue={bio}
          onChangeText={newValue => setBio(newValue)}
        />

        <View style={{marginTop: 10, ...styles.photoContainer}}>
          <Text style={styles.genderText}>Gender</Text>
          <GenderComponent
            sendValue={value => setGender(value)}
            container={styles.genderContainer}
            subText={false}
            img={styles.genderimg}
            female={femaleBoolean}
            male={maleBoolean}
          />
        </View>

        <View style={{...styles.photoContainer}}>
          <Text style={{marginRight: 20, ...styles.levelText}}>Level</Text>
          <SliderPicker
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
            scaleNumberFontSize={10}
            scaleNumberFontColor={'#DDDDDD'}
            scaleNumberFontWeight={'bold'}
            buttonBackgroundColor={'#fff'}
            buttonBorderColor={'#DDDDDD'}
            buttonDimensionsPercentage={6}
            heightPercentage={2}
            widthPercentage={70}
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
        </View>
        <GeneralButton
          buttonStyle={styles.buttonStyle}
          title={'Save'}
          onPress={() => updateToFirebase()}></GeneralButton>

        <Text style={{marginTop: 20, ...styles.settingsTitle}}>Settings</Text>
        <TouchableOpacity
          style={{marginTop: 30, marginLeft: 20}}
          onPress={() => logout()}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/logout.png')}
              resizeMode="cover"
              style={styles.logoutimg}
            />

            <Text
              style={{
                color: '#000',
                fontSize: 16,
                marginLeft: 15,
                fontWeight: '500',
              }}>
              Logout
            </Text>

            <Image
              source={require('../assets/arrowRightBlue.png')}
              resizeMode="cover"
              style={styles.arrowimg}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'white',
  },
  container: {
    marginTop: 30,
    marginHorizontal: 10,
    marginBottom: 100,
  },
  genderContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    overflow: 'hidden',
    marginLeft: 3,
  },

  imageContainer: {
    marginTop: 30,
    alignSelf: 'center',
    marginLeft: 45,
  },

  img: {
    width: 38,
    height: 38,
    marginTop: 6,
    marginLeft: 3,
  },
  buttonStyle: {
    alignSelf: 'flex-end',
    width: 80,
    padding: 7,
  },

  userName: {
    marginHorizontal: 30,
    fontSize: 23,
    color: '#000000',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '500',
  },
  editProfileConatiner: {
    backgroundColor: '#36B199',
    padding: 10,
    paddingLeft: 15,
    borderRadius: 20,
    marginHorizontal: 70,
    fontSize: 23,
    color: '#000000',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontWeight: '500',
  },
  arrow: {
    width: 20,
    height: 20,
  },
  email: {
    marginHorizontal: 30,
    fontSize: 14,
    color: '#C0C0C0',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    fontWeight: '500',
  },
  settingsTitle: {
    color: '#000',
    marginLeft: 20,
    fontSize: 23,
    fontWeight: '500',
  },
  photoContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  photoText: {
    color: '#000',
    alignSelf: 'center',
    fontWeight: '500',
    marginLeft: 6,
    marginTop: -60,
  },
  genderimg: {
    width: 40,
    height: 40,
    marginLeft: 13,
    marginRight: 10,
  },

  genderText: {
    color: '#000',
    alignSelf: 'center',
    fontWeight: '500',
    marginLeft: 6,
  },
  logoutimg: {
    width: 25,
    height: 25,
  },
  arrowimg: {
    width: 10,
    height: 15,
    marginLeft: 190,
    alignSelf: 'center',
  },
  levelText: {
    color: '#000',
    alignSelf: 'center',
    fontWeight: '500',
    marginLeft: 6,
    marginRight: 30,
  },
});

export default SettingsScreen;
