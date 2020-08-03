import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

const FormButton = ({ title, modeValue, ...res }) => {
	return (
		<Button
			mode={modeValue}
			style={styles.button}
			contentStyle={styles.buttonContainer}
			color='#409cff'
			labelStyle={{color:'#409cff'}}
			{...res}
			
		>
		{title}
		</Button>
	);
}


const styles = StyleSheet.create({
	button:{
		marginTop:10,
		color:'#fff'
	},
	buttonContainer:{
		width:width/2,
		height:height/15
	}
});

export default FormButton;

