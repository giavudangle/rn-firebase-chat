import React, { useState, useContext } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { Title } from 'react-native-paper';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

import {AuthContext} from '../navigation/AuthProvider';


const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>LOGIN TO CHAT</Title>
      <FormInput
        labelName='Email'
        value={email}
        autoCapitalize='none'
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <Text style={styles.spacer}/>
      <FormInput
        labelName='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={userPassword => setPassword(userPassword)}
      />
      <View style={styles.buttonContainer}>
        <FormButton
          title='Login'
          modeValue='contained'
          uppercase={false}
          labelStyle={styles.loginButtonLabel}
          onPress={() => login(email,password)}
        />
        <FormButton
          title='New User ? Register'
          modeValue='text'
          uppercase={false}
          labelStyle={styles.navButtonLabel}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
      



    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    margin:30,
    paddingTop:80,
    justifyContent:"center",
    alignItems:'center'
  },
  titleText: {
    textAlign:"center",
    paddingTop:30,
    marginBottom:30
  },
  loginButtonLabel: {
    justifyContent:"center",
    alignItems:"center",
    color:'#fff'
  },
  buttonContainer:{
    textAlign:"center",
    alignItems:"center",
    marginTop:10
  }
})

export default LoginScreen;