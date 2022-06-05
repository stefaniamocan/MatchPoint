import React, {useState, useContext} from 'react';
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
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

const ProfileRegistrationScreen = ({navigation}) => {
  //get placheholder image from local asset to uri
  const placheHolderImageURI = Image.resolveAssetSource(placheHolderImage).uri;
  console.log(placheHolderImageURI);
  const [username, setUsername] = useState(
    authentication.currentUser.displayName,
  );
  const [bio, setBio] = useState('');
  const [photoURL, setProfileImage] = useState(placheHolderImageURI);

  const storeBio = () => {
    const userDocRef = doc(db, 'users', authentication.currentUser.uid);
    setDoc(userDocRef, {bio: bio}, {merge: true}).then(() => {
      navigation.navigate('GenderPicker');
    });
  };

  //select image
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

  const updateToFirebase = async () => {
    await uploadImageFireStore(photoURL);
    storeBio();
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
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.app}>
        <View style={styles.container}>
          <Text style={styles.stepText}>Step 1/3</Text>
          <Text style={styles.titleText}>Complete your profile</Text>
          <Text style={styles.textDescription}>
            Add a profile photo and a bio to let people know who you are
          </Text>
          <TouchableOpacity onPress={() => changeImageOrGallery()}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: photoURL}}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.add}>
                <Image
                  source={require('../assets/add.png')}
                  resizeMode="cover"
                  style={styles.img}
                />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>{username}</Text>
        </View>
        <Text style={styles.preTitle}>Bio</Text>
        <TextInput
          underlineColorAndroid="transparent"
          multiline={true}
          numberOfLines={4}
          style={styles.textArea}
          placeholder="Type something..."
          placeholderTextColor="grey"
          autoCorrect={false}
          onChangeText={newValue => setBio(newValue)}></TextInput>

        <GeneralButton
          title={'Continue'}
          buttonStyle={styles.buttonStyle}
          onPress={() => updateToFirebase()}
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

  image: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    overflow: 'hidden',
  },

  imageContainer: {
    marginTop: 30,
  },

  add: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  img: {
    width: 50,
    height: 50,
    marginTop: 6,
    marginLeft: 3,
  },
  buttonStyle: {
    marginTop: 50,
  },
  textArea: {
    height: 65,
    textAlignVertical: 'top',
    borderColor: '#B9E4DB',
    borderWidth: 1.5,
    marginHorizontal: 14,
    borderRadius: 5,
    color: '#000000',
    padding: 10,
  },

  preTitle: {
    marginHorizontal: 9,
    padding: 10,
    borderRadius: 3,
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  userName: {
    marginHorizontal: 30,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '500',
  },
  stepText: {
    marginTop: 40,
    color: '#36B199',
    marginBottom: 10,
  },
});

export default ProfileRegistrationScreen;
