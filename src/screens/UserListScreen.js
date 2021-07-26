import React, {useEffect, useState} from 'react';
import {Button, View, Text, StyleSheet, FlatList, Image,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const UserListScreen = props => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function getUsers() {
      let localUsers = await AsyncStorage.getItem('USERS');
      localUsers = JSON.parse(localUsers);
      setUserList(localUsers);
    }
    getUsers();
  }, []);

  const showUsers = async() => {
    console.log(userList);
    let local_users = await AsyncStorage.getItem('USERS');
    console.log(local_users);
  }

  const renderUser = ({item}) => {
    return (
      <View style={styles.card}>
        <Image 
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' }}
        />
        <View style={styles.content}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text>{item.phoneNumber}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList 
        data={userList}
        renderItem={renderUser}
        keyExtractor={item => item.email.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    elevation: 5,
    backgroundColor: 'white'
  },
  image: {
    width: width / 5,
    height: width / 5,
    borderRadius: (width/5) / 2
  },
  content:{
    paddingHorizontal: 20
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default UserListScreen;
