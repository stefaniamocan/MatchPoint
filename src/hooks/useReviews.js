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
  FlatList,
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

function useReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(async () => {
    const fetchData = async () => {
      //get user profile Data
      const docRef = doc(db, 'users', authentication.currentUser.uid);
      const docSnapProfile = await getDoc(docRef);
      if (docSnapProfile.exists()) {
      }

      //get reviews + total ratings
      const subColRef = query(
        collection(
          db,
          'reviews',
          authentication.currentUser.uid,
          'recivedRatings',
        ),
        orderBy('postTime', 'asc'),
      );

      const querySnapshot = await getDocs(subColRef);
      let list = [];
      let first = '';
      let second = '';
      let calculateRating = 0;
      await querySnapshot.forEach(async doc1 => {
        let id = doc1.id;
        const docRef = doc(db, 'users', id);
        const docSnapProfile = await getDoc(docRef);
        if (docSnapProfile.exists()) {
          first = docSnapProfile.data().name;
          second = docSnapProfile.data().ProfileImage;
        }
        console.log(first);
        const {postTime, rating} = doc1.data();
        //const date = postTime.toDate().toDateString();
        const date = moment(postTime.toDate()).fromNow();

        list.push({
          id: doc1.id,
          review_userPhotoURL: 'second',
          review_userName: 'first',
          review_userRating: rating,
          review_userUid: doc1.id,
          review_time: date,
        });
        console.log(calculateRating);
        calculateRating = calculateRating + rating;
      });
      setReviews(list);
    };
    await fetchData();
  }, []);

  return reviews;
}
export default useReviews;
