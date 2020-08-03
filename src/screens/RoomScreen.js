import React, { useState,useContext,useEffect } from 'react';
import { View,StyleSheet,ActivityIndicator } from 'react-native';
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';

import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import useStatsBar from '../utils/useStatusBar';



const RoomScreen = ({route}) => {
  useStatsBar('light-content');

  const {user} = useContext(AuthContext);
  const currentUser = user.toJSON();  
  const {thread} = route.params;
  const [messages, setMessages] = useState([
    {
      _id: 0,
      text: 'New room created',
      createdAt: new Date().getTime(),
      system: true
    },
    {
      _id: 1,
      text: 'Hello',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Vudang'
      }
    }
  ]);

  useEffect(() => {
    const messagesListener = firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt','desc')
      .onSnapshot(querySnapshot => {
        const mess = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          const data = {
            _id:doc.id,
            text:'',
            createdAt: new Date().getTime(),
            ...firebaseData
          };
          if(!firebaseData.system){
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email
            };
          }
          return data;
        });
        setMessages(mess);
      });
    return () => messagesListener();
  },[]);


  

  renderSystemMessage = (props) => {
    return(
      <SystemMessage 
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  renderBubble = (props) => {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#409cff'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }

  _handleSendMessage = async (messages) => {
    const text = messages[0].text;

    firestore()
    .collection('THREADS')
    .doc(thread._id)
    .collection('MESSAGES')
    .add({
      text,
      createdAt: new Date().getTime(),
      user: {
        _id: currentUser.uid,
        email: currentUser.email
      }
    });

  await firestore()
    .collection('THREADS')
    .doc(thread._id)
    .set(
      {
        latestMessage: {
          text,
          createdAt: new Date().getTime()
        }
      },
      { merge: true }
    );
      
  }

  _handleRenderSend = (props) => {
    return (
      <Send {...props} >
        <View style={styles.sendingContainer}>
          <IconButton
            icon='send-circle'
            size={32}
            color="#409cff"
          />
        </View>
      </Send>
    );
  }

  _handleScrollToBottom = () => {
    return(
      <View style={styles.scrollToBottomStyle}>
        <IconButton icon='chevron-double-down' size={36} color='#409cff' />
      </View>
    );
  }

  _handleRenderLoading = () => {
    return(
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#409cff"/>
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => _handleSendMessage(newMessage)}
      user={{ _id: currentUser.uid }}
      renderBubble={renderBubble}
      placeholder="Type your message here ..."
      showUserAvatar={true}
      scrollToBottom={true}
      alwaysShowSend={true}
      renderSend={_handleRenderSend}
      scrollToBottomComponent={_handleScrollToBottom}
      messagesContainerStyle={{justifyContent:"center"}}
      renderLoading={_handleRenderLoading}
      renderSystemMessage={(props) => renderSystemMessage(props)}
      showAvatarForEveryMessage={true}
      renderUsernameOnMessage={true}
    />
  );
}

const styles = StyleSheet.create({
  sendingContainer:{
    justifyContent:"center"
  },
  scrollToBottomStyle:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  systemMessageWrapper:{
    backgroundColor:'#409cff'
  },
  systemMessageText:{
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  }
})


export default RoomScreen;