import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
	input:{
		marginTop:10,
		marginBottom:10,
		width:width/1.2,
		height:height/15,
		overflow:"hidden",
	}
});
// JSX - Javascript Exstension
const FormInput = ({labelName,...custom}) =>  {
	return (
		<TextInput 
		style={styles.input}
		label={labelName}
		numberOfLines={1}
		underlineColor='#409cff'
		
		{...custom}
		>
		</TextInput>
	);
}

export default FormInput;