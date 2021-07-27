import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = (props) => {
	const [user, setUser] = useState({});

	useEffect(() => {
		async function getUser() {
			let currentUser = await AsyncStorage.getItem('CURRENT_USER');
			currentUser = JSON.parse(currentUser);
			console.log(currentUser);
			setUser(currentUser);
		}
		getUser();
	}, []);

	const handleLogout = async() => {
		await AsyncStorage.removeItem('CURRENT_USER');
		await AsyncStorage.setItem('IS_LOGGED_IN', JSON.stringify(false));
		props.navigation.navigate("Register");
	}

	return (
		<View style={styles.container}>
			<Text style={styles.headerGreet}>Hey, {user.fullName}</Text>
			<TouchableOpacity onPress={handleLogout}>
              <View style={styles.logoutButton}>
                <Text style={styles.buttonText}>LOG OUT</Text>
              </View>
            </TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logoutButton: {
		paddingVertical: 10,
		paddingHorizontal:30,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#68cac9',
	    height: 48,
	    borderRadius: 30,
	    marginVertical: 20,
	},
	buttonText: {
	    color: 'white',
	    fontSize: 16,
    },
    headerGreet: {
    	fontSize: 35,
    	fontWeight: 'bold',
    },
})

export default HomeScreen;