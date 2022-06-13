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
  getDocs,
  where,
  query,
  toDate,
  orderBy,
  limit,
} from 'firebase/firestore';
import {authentication} from '../api/firebase';
import {db} from '../api/firebase';
import {storage} from '../api/firebase';
import DatePicker from 'react-native-date-picker';
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
import {MaterialIndicator} from 'react-native-indicators';
import Header from '../components/Header';
import ReviewCard from '../components/ReviewCard';
import moment from 'moment';
import NoReviews from '../components/NoReviews';
import ReviewComponent from '../components/ReviewComponent';

const ProfileScreen2 = ({route, navigation}) => {
  const {userUid} = route.params;
  //useStates
  //onst userUid = authentication.currentUser.uid;
  const [loading, setLoading] = useState(false);
  const [photoURL, setProfileImage] = useState();
  const [level, setLevel] = useState();
  const [reviews, setReviews] = useState([]);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  const [bio, setBio] = useState('');

  const [rating, setRating] = useState(5);
  const [totalRating, settotalRating] = useState(5);
  const [totalGames, settotalGames] = useState(20);

  //fetch data
  // const fetchData = async () => {
  //   setLoading(true);

  //   //get user profile Data
  //   const docRef = doc(db, 'users', userUid);
  //   const docSnapProfile = await getDoc(docRef);
  //   if (docSnapProfile.exists()) {
  //     setBio(docSnapProfile.data().bio);
  //     setLevel(parseInt(docSnapProfile.data().level));
  //     setUsername(docSnapProfile.data().name);
  //     setProfileImage(docSnapProfile.data().ProfileImage);
  //   }

  //   //get reviews + total ratings
  //   const subColRef = query(
  //     collection(db, 'reviews', userUid, 'recivedRatings'),
  //     orderBy('postTime', 'asc'),
  //   );

  //   const querySnapshot = await getDocs(subColRef);
  //   const list = [];
  //   let calculateRating = 0;
  //   await querySnapshot.forEach(doc => {
  //     const {postTime, rating, userName} = doc.data();
  //     //const date = postTime.toDate().toDateString();
  //     const date = moment(postTime.toDate()).fromNow();
  //     calculateRating = calculateRating + rating;
  //     list.push({
  //       id: doc.id,
  //       review_userPhotoURL: photoURL,
  //       review_userName: doc.userName,
  //       review_userRating: rating,
  //       review_userUid: doc.id,
  //       review_time: date,
  //     });
  //   });
  //   await setReviews(list);
  //   await settotalRating(list.length);
  //   const totalrate = calculateRating / list.length;
  //   console.log(totalrate);
  //   await setRating(totalrate);

  //   setLoading(false);
  // };

  //update data before page is rendered
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const updateUserCollection = async () => {
    const docRef = doc(db, 'users', authentication.currentUser.uid);
    await updateDoc(docRef, {
      gender: gender,
      name: username,
      level: level,
      bio: bio,
    });
  };

  return (
    <View style={styles.app}>
      {!loading ? (
        <ScrollView>
          <View>
            <View style={styles.container}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: photoURL}}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={{marginLeft: 20, marginTop: 10}}>
                  <Text style={styles.nameStyle}>{username}</Text>
                  <Text style={styles.skillLevel}>Skill Level: {level}</Text>
                  <View style={{marginLeft: 10, marginTop: 15}}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../assets/Rating.png')}
                        style={styles.star}
                        resizeMode="cover"
                      />
                      <View
                        style={{
                          alignSelf: 'center',
                          marginLeft: 20,
                        }}>
                        <Text style={{color: '#C7C7C7', fontWeight: '500'}}>
                          Rating
                        </Text>
                        <Text
                          style={{
                            color: '#848484',
                            fontWeight: '500',
                            fontSize: 13,
                          }}>
                          {rating} out of 5 ({totalRating})
                        </Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <Image
                        source={require('../assets/games.png')}
                        style={styles.star}
                        resizeMode="cover"
                      />
                      <View
                        style={{
                          alignSelf: 'center',
                          marginLeft: 20,
                        }}>
                        <Text style={{color: '#C7C7C7', fontWeight: '500'}}>
                          Games
                        </Text>
                        <Text
                          style={{
                            color: '#848484',
                            fontWeight: '500',
                            fontSize: 13,
                          }}>
                          {totalGames}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <ReviewComponent />
              <View style={styles.box}>
                <Text style={styles.h3Style}>Description</Text>
                <Text style={styles.bioStyle}>{bio}</Text>
                <Text style={{marginBottom: 20, ...styles.h3Style}}>
                  Reviews
                </Text>
                {reviews.length > 0 ? (
                  <>
                    {reviews.slice(0, 3).map(review => {
                      return (
                        <ReviewCard
                          key={review.id}
                          userPhotoURL={review.review_userPhotoURL}
                          userName={review.review_userName}
                          userRating={review.review_userRating}
                          useruid={review.review_userUid}
                          postTime={review.review_time}
                          screenName="UserProfile"
                        />
                      );
                    })}
                    <TextButton
                      containerStyle={{alignSelf: 'flex-end'}}
                      textStyle={styles.registerText}
                      boldText={'View all'}
                      onPress={() =>
                        navigation.navigate('SeeAllScreen', reviews)
                      }
                    />
                  </>
                ) : (
                  <>
                    <NoReviews reviews={true} />
                  </>
                )}
                <Text style={{marginBottom: 20, ...styles.h3Style}}>
                  Past Games
                </Text>
                <NoReviews reviews={false} />
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <MaterialIndicator
          size={40}
          color="#36B199"
          style={{marginTop: 230}}></MaterialIndicator>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'white',
  },
  container: {
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 100,
  },

  image: {
    height: 160,
    width: 118,
    borderRadius: 20,
  },
  nameStyle: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
  },
  skillLevel: {
    marginTop: 0,
    color: '#C7C7C7',
    fontSize: 14,
    fontWeight: '500',
  },
  star: {
    width: 45,
    height: 45,
  },
  box: {
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    elevation: 5,

    borderRadius: 20,
    backgroundColor: '#FFF',
    marginTop: 30,
  },
  h3Style: {
    marginTop: 5,
    color: '#545454',
    fontSize: 16.5,
    fontWeight: '500',
  },

  bioStyle: {
    color: '#A7A7A7',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 10,
  },
});

export default ProfileScreen2;
