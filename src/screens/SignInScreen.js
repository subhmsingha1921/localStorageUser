import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Formik, Field} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FieldInput from '../components/FieldInput';

const SignInScreen = (props) => {

  const handleAuthenticate = async(user) => {
    let storedUsers = await AsyncStorage.getItem('USERS');
    storedUsers = JSON.parse(storedUsers);

    const currentUser = storedUsers.filter(userItem => {
      if (user.emailOrPhn === userItem.email && user.password === userItem.password) {
        return userItem;
      } else if (user.emailOrPhn === userItem.phoneNumber && user.password === userItem.password) {
        return userItem;
      }
    });
    if (currentUser.length > 0) {
      alert('Login successful');
      await AsyncStorage.setItem('CURRENT_USER', JSON.stringify(currentUser[0]));
      await AsyncStorage.setItem('IS_LOGGED_IN', JSON.stringify(true));
      props.navigation.navigate('Home');
    } else {
      alert('Please provide correct login credentials');
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.signinContainer}>
          <Text style={styles.headerOuterText}>
            Sign<Text style={styles.headerInnerText}>in</Text>
          </Text>
          <Formik
            initialValues={{
              emailOrPhn: '',
              password: '',
            }}
            onSubmit={async(loggedInUser,{resetForm}) => {
              handleAuthenticate(loggedInUser);
              // props.navigation.navigate('Home');
              resetForm();
            }}>
            {({handleSubmit, isValid, values, handleChange}) => (
              <>
                <Field
                  component={FieldInput}
                  name="emailOrPhn"
                  placeholder="Email Address or Phone Number"
                />
                <Field
                  component={FieldInput}
                  name="password"
                  placeholder="Enter Your Password"
                  secureTextEntry
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                    <View style={styles.signInButton}>
                      <Text style={styles.buttonText}>SIGN IN</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {props.navigation.navigate('Register')}}>
                    <View style={styles.signUpNavigationButton}>
                      <Text style={styles.signInNavigateText}>Don't Have An Account? Register</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {props.navigation.navigate('Users')}}>
                    <View style={[styles.signInButton, { backgroundColor: 'grey' }]}>
                      <Text style={styles.buttonText}>VIEW USERS</Text>
                    </View>
                  </TouchableOpacity>
                  {/* <Button title="reset" onPress={async() => {await AsyncStorage.removeItem('IS_LOGGED_IN')}} /> */}
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  signinContainer: {
    width: '84%',
    alignItems: 'center',
    backgroundColor: '#f1f1f3',
    paddingHorizontal: 0,
    paddingVertical: 35,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 20,
  },
  headerInnerText: {
    color: '#68cac9',
  },
  headerOuterText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  signInButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#68cac9',
    height: 48,
    borderRadius: 30,
  },
  signUpNavigationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  signInNavigateText: {
    color: 'grey',
    fontSize: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});

export default SignInScreen;
