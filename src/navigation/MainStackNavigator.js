import React, {useEffect, useState} from 'react';
import { ActivityIndicator, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SignInScreen from '../screens/SignInScreen';
import UserListScreen from '../screens/UserListScreen';
import UserDetailScreen from '../screens/UserDetailScreen';


const MainStack = createStackNavigator();

const MainStackNavigator = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		async function checkUserStatus() {
			let status = await AsyncStorage.getItem('IS_LOGGED_IN');
			status = JSON.parse(status);
			setIsAuthenticated(status);
		}
		checkUserStatus();
	}, []);

	return (
		<MainStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			{isAuthenticated ? (
				<>
					<MainStack.Screen 
						name="Home" 
						component={HomeScreen} 
						options={{
							headerTitleAlign: 'center',
							headerShown: true,
							headerTitle: 'Home',
							headerLeft: null,
						}} 
					/>
					<MainStack.Screen name="Register" component={RegisterScreen} />
					<MainStack.Screen name="Sign In" component={SignInScreen} />
					<MainStack.Screen name="User Detail" component={UserDetailScreen} />
					<MainStack.Screen name="Users" component={UserListScreen} />
				</>
			) : (
				<>
					<MainStack.Screen name="Register" component={RegisterScreen} />
					<MainStack.Screen name="Sign In" component={SignInScreen} />
					<MainStack.Screen name="User Detail" component={UserDetailScreen} />
					<MainStack.Screen name="Users" component={UserListScreen} />
					<MainStack.Screen 
						name="Home" 
						component={HomeScreen} 
						options={{ 
							headerTitleAlign: 'center',
							headerShown: true,
							headerTitle: 'Home',
							headerLeft: null,
						}} 
					/>
				</>
			)}
		</MainStack.Navigator>
	);
};

export default MainStackNavigator;


// if (loading) {
	// 	return (
	// 		<View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
	// 			<ActivityIndicator color="#68cac9" size="large" />
	// 		</View>
	// 	);
	// }

{/* <MainStack.Screen name="Register" component={RegisterScreen} /> */}
			{/* <MainStack.Screen name="Sign In" component={SignInScreen} /> */}
			{/* <MainStack.Screen name="User Detail" component={UserDetailScreen} /> */}
			{/* <MainStack.Screen name="Users" component={UserListScreen} /> */}
			{/* <MainStack.Screen name="Home" component={HomeScreen} /> */}