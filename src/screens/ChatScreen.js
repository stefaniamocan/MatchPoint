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
  ActivityIndicator,
} from 'react-native';
import {GiftedChat, InputToolbar, Bubble, Send} from 'react-native-gifted-chat';
import {authentication} from '../api/firebase';
import {db} from '../api/firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {MaterialIndicator} from 'react-native-indicators';
import {IconButton} from 'react-native-paper';
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

  //customize chat UI

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#36B199',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  function renderSend(props) {
    return (
      <Send
        {...props}
        containerStyle={{shadowColor: '#fff', alignSelf: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <IconButton icon="send-circle" size={38} color="#36B199" />
        </View>
      </Send>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <IconButton icon="chevron-double-down" size={30} color="#36B199" />
      </View>
    );
  }

  function renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 30,
          backgroundColor: '#fff',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 10,

          padding: 5,
          shadowColor: '#757575',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,

          elevation: 16,
          borderTopColor: '#fff',
        }}
        textInputStyle={{color: '#000'}}
        placeholder="Type your message here..."
      />
    );
  }

  // let chatroomId = chatRoomId.toString();
  const getKey = async () => {
    const key = await get_database(
      ref_database(
        realtimedb,
        `users/${authentication.currentUser.uid}/members/${reciverUserUid}/chatRoomId`,
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
    navigation.setOptions({
      title: reciverUserName,
    });
    return () => {};
  }, []);

  const onSend = useCallback(async (msg = []) => {
    let isApiSubscribed = true;
    const key = await getKey();
    let lastMessages = [];

    const checkPreviousMessages = await loadPreviousMessages();
    if (checkPreviousMessages) {
      lastMessages = await loadPreviousMessages();
    }
    console.log(reciverProfilePicture);

    update_database(
      ref_database(
        realtimedb,
        `users/${authentication.currentUser.uid}/members/${reciverUserUid}`,
      ),
      {
        lastMessage: [
          {
            createdAt: new Date(),
            text: msg[0].text,
          },
        ],
      },
    );

    update_database(
      ref_database(
        realtimedb,
        `users/${reciverUserUid}/members/${authentication.currentUser.uid}`,
      ),
      {
        lastMessage: [
          {
            createdAt: new Date(),
            text: msg[0].text,
          },
        ],
      },
    );

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
    return () => {
      // cancel the subscription
      isApiSubscribed = false;
    };
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: authentication.currentUser.uid,
      }}
      alwaysShowSend
      renderInputToolbar={props => renderInputToolbar(props)}
      renderBubble={renderBubble}
      renderSend={renderSend}
      scrollToBottom={true}
      scrollToBottomComponent={scrollToBottomComponent}
      scrollToBottomStyle={{
        shadowColor: '#757575',
        shadowOffset: {
          width: 3,
          height: 1,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 6,
      }}
    />
  );
};

export default ChatScreen;
