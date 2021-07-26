import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import RegisterScreen from '../screens/RegisterScreen';
import UserListScreen from '../screens/UserListScreen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<MainStack.Screen name="Register" component={RegisterScreen} />
			<MainStack.Screen name="Users" component={UserListScreen} />
		</MainStack.Navigator>
	);
};

export default MainStackNavigator;
