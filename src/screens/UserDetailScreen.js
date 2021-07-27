import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const UserDetailScreen = (props) => {
	const { fullName, email, phone } = props.route.params;

	return (
		<View style={styles.container}>
			<Image 
				source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' }}
				style={styles.image}
			/>
			<View style={styles.propertyContainer}>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Full Name</Text>
					<Text style={styles.property}>{fullName}</Text>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Email-Address</Text>
					<Text style={styles.property}>{email}</Text>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Phone Number</Text>
					<Text style={styles.property}>{phone}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginVertical: 75,
	},
	image: {
		height: 200,
		width: 200,
		borderRadius: 200,
	},
	label: {
		fontSize: 13,
		color: 'grey',
	},
	labelContainer: {
		marginVertical: 10,
	},
	property: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	propertyContainer: {
		marginVertical: 25,
		alignItems: 'flex-start',
	}
});

export default UserDetailScreen;