import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {authentication} from '../api/firebase';
import {db} from '../api/firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {
  getDatabase,
  ref as ref_database,
  set as set_database,
  get as get_database,
  update as update_database,
  onValue,
} from 'firebase/database';
import {realtimedb} from '../api/firebase';

const ChatScreen = ({route, navigation}) => {
  const {reciverUserUid, reciverProfilePicture, reciverUserName} = route.params;
  const [messages, setMessages] = useState([]);

  // let chatroomId = chatRoomId.toString();
  const getKey = async () => {
    const key = await get_database(
      ref_database(
        realtimedb,
        `users/${authentication.currentUser.uid}/${reciverUserUid}/chatRoomId`,
      ),
    );

    return key.val();
  };

  const loadPreviousMessages = async () => {
    const key = await getKey();
    const snapshot = await get_database(
      ref_database(realtimedb, `chatrooms/${key}/messages`),
    );
    return snapshot.val();
  };

  const renderMessages = useCallback(msgs => {
    return msgs
      ? msgs.reverse().map((msg, index) => ({
          // to see messages in the right order
          ...msg,
          _id: index,
          user: {
            _id:
              msg.sender === authentication.currentUser.uid
                ? authentication.currentUser.uid
                : reciverUserUid,
            avatar:
              msg.sender === authentication.currentUser.uid
                ? authentication.currentUser.photoURL
                : reciverProfilePicture,
            name:
              msg.sender === authentication.currentUser.uid
                ? authentication.currentUser.displayName
                : reciverUserName,
          },
        }))
      : [];
  }, []);

  // useEffect(() => {
  //   // setMessages([
  //   //   {
  //   //     _id: 1,
  //   //     text: 'Hello developer',
  //   //     createdAt: new Date(),
  //   //     user: {
  //   //       _id: 2,
  //   //       name: 'React Native',
  //   //       avatar: 'https://placeimg.com/140/140/any',
  //   //     },
  //   //   },
  //   // ]);
  //   let myChatroom = '';
  //   const loadData = async () => {
  //     myChatroom = await loadPreviousMessages();
  //     if (myChatroom) {
  //       setMessages(renderMessages(myChatroom.messages));
  //     }
  //   };

  //   loadData();

  //   if (myChatroom) {
  //     const chatroomRef = ref_database(realtimedb, `chatrooms/${chatroomId}`);
  //     onValue(chatroomRef, snapshot => {
  //       const data = snapshot.val();
  //       setMessages(renderMessages(data.messages));
  //     });

  //     return () => {
  //       //remove chatroom listener
  //       off(chatroomRef);
  //     };
  //   }
  // }, [loadPreviousMessages, renderMessages]);
  useEffect(() => {
    let key = '';
    const loadData = async () => {
      const key = await getKey();
      const checkPreviousMessages = await loadPreviousMessages();
      if (checkPreviousMessages) {
        setMessages(renderMessages(checkPreviousMessages));
      }
    };
    loadData();

    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);
    return () => {};
  }, []);

  const onSend = useCallback(async (msg = []) => {
    const key = await getKey();
    let lastMessages = [];

    const checkPreviousMessages = await loadPreviousMessages();
    if (checkPreviousMessages) {
      lastMessages = await loadPreviousMessages();
    }
    console.log(reciverProfilePicture);

    update_database(ref_database(realtimedb, `chatrooms/${key}`), {
      messages: [
        ...lastMessages,
        {
          text: msg[0].text,
          sender: authentication.currentUser.uid,
          createdAt: new Date(),
        },
      ],
    });
    setMessages(prevMessages => GiftedChat.append(prevMessages, msg));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: authentication.currentUser.uid,
      }}
    />
  );
};

export default ChatScreen;
