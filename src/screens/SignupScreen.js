import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, IconButton } from 'react-native-paper';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import {AuthContext} from '../navigation/AuthProvider';

const SignupScreen = ({ navigation }) => {
  const {register} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [ password, setPassword ]= useState('');
  

  return(
    <View style={styles.container}>
      <Title style={styles.titleText}>Register To Chat</Title>
      <FormInput
        labelName='Email'
        value={email}
        autoCapitalize='none'
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <View style={{padding:10}}></View>
      <FormInput
        labelName='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={userPassword => setPassword(userPassword)}
      />
      <View style={styles.buttonContainer}>
        <FormButton
          title='Signup'
          modeValue='contained'  
          labelStyle={styles.loginButtonLabel}
          onPress={() => register(email,password)}
          
        />
        <IconButton
          icon='keyboard-backspace'
          size={30}
          style={styles.navButton}
          color='#6646ee'
          onPress={() => navigation.goBack()}
        />
      </View>
      
    </View>
  );
}

// LG BH [IMEI] 8068

const styles = StyleSheet.create({
  container: {
    margin:30,
    marginTop:50
  },
  titleText: {
    textAlign:"center",
    paddingBottom:10
  },
  buttonContainer: {
    justifyContent:"center",
    alignItems:"center",
    paddingTop:10
  },
  navButton: {

  },
  loginButtonLabel:{
    color:'#fff',
   
  }
})



export default SignupScreen;