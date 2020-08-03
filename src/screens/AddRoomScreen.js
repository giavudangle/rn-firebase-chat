import React,{useState} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {IconButton, Title} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import useStatsBar from '../utils/useStatusBar';



export default AddRoomScreen = ({navigation}) => {
  useStatsBar('dark-content');
  const [roomName,setRoomName] = useState('');

  function _handleCreateChatRoom() {
    if(roomName.length > 0 ){
      firestore()
      .collection('THREADS')
      .add({
        name:roomName,
        lastestMessage:{
          text: `You have joined the room ${roomName}.`,
          createdAt: new Date().getTime()
        }
      })
      .then(docRef => {
        //console.log('PassThen');
        docRef.collection('MESSAGES').add({
          text:`You have joined the room ${roomName}.`,
          createdAt: new Date().getTime(),
          system:true
        });
        navigation.navigate('Home');
      })
    }
  }


  return (
   <View style={styles.rootContainer}>
    <View style={styles.closeButtonContainer}>
        <IconButton
          icon='close-circle'
          size={30}
          color="#409cff"
          onPress={() => navigation.goBack()}
        />
    </View>
    <View style={styles.innerContainer}>
      <Title style={styles.title}>Create a new chat room</Title>
      <FormInput
        labelName='Room Name'
        value={roomName}
        onChangeText={(text) => setRoomName(text)}
        clearButtonMode='while-editing'
      />
      <FormButton
        title='Create'
        modeValue='contained'
        disabled={roomName.length === 0}
        labelStyle={styles.buttonLabel}
        onPress={() => _handleCreateChatRoom()}
      />
    </View>
   </View>
  );
};


const styles = StyleSheet.create({
  rootContainer:{
    flex:1
  },
  closeButtonContainer:{
    flex:1,
    position:'absolute',
    top:30,
    right:0,
    zIndex:1
  },
  innerContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column"
  },
  title:{
    fontSize:24,
    marginBottom:10
  },
  buttonLabel:{
    fontSize:22,
    color:'#fff'
  }

});