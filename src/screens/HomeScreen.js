import React, { useContext,useState,useEffect } from 'react';
import { Title,List,Divider } from 'react-native-paper';
import { View, StyleSheet,FlatList } from 'react-native';

import FormButton from '../components/FormButton';
import Loading from '../components/Loading';

import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useStatsBar from '../utils/useStatusBar';

const HomeScreen = ({ navigation }) => {
  useStatsBar('light-content');
  const [threads,setThreads] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .orderBy('lastestMessage.createdAt','desc')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id:documentSnapshot.id,
            name:'',
            lastestMessage:{
              text:''
            },
            ...documentSnapshot.data()
          };
        });
        setThreads(threads);
      });
      
      if(loading)
        setLoading(false);

    // Unsubscribe firestore query
    return () => unsubscribe();
  },[]);
  if(loading)
    return <Loading/>

  renderListChatRoom = (item) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Room',{thread:item})} 
      
      >
        <List.Item 
        title={item.name}
        description={item.lastestMessage.text}
        titleNumberOfLines={1}
        titleStyle={styles.listTitle}
        descriptionStyle={styles.listDescription}
        descriptionNumberOfLines={1}
        
        />
      </TouchableOpacity>    
    );  
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider/>}
        renderItem={({item}) => renderListChatRoom(item)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listDescription:{
    fontSize:22
  },
  listTitle:{
    fontSize:22
  }
});

export default HomeScreen;