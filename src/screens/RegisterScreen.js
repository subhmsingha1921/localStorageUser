import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import { RadioButton }  from 'react-native-paper';
import {Formik, Field} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FieldInput from '../components/FieldInput';
import signUpValidationSchema from '../schema/RegisterSchema';

const RegisterScreen = (props) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <Text>Register your Account</Text>
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phoneNumber: '',
              password: '',
              confirmPassword: '',
              gender: '',
            }}
            validationSchema={signUpValidationSchema}
            onSubmit={async(newUser,{resetForm}) => {
              console.log(newUser);
              
              let users = await AsyncStorage.getItem('USERS');
              if (users) {
                users = JSON.parse(users);
                users.push(newUser);
                await AsyncStorage.setItem('USERS', JSON.stringify(users));
              } else {
                let arr = [];
                arr.push(newUser);
                await AsyncStorage.setItem('USERS', JSON.stringify(arr));
              }
              alert('User successfully registered');
              resetForm();
            }}>
            {({handleSubmit, isValid, values, handleChange}) => (
              <>
                <Field
                  component={FieldInput}
                  name="fullName"
                  placeholder="Full Name"
                />
                <Field
                  component={FieldInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Field
                  component={FieldInput}
                  name="phoneNumber"
                  placeholder="Phone Number"
                  keyboardType="numeric"
                />
                <Field
                  component={FieldInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <Field
                  component={FieldInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                />
                <View>
                  <RadioButton.Group
                       onValueChange={handleChange('gender')}
                       value={values.gender}
                       >
                    <View style={styles.radioContainer}>
                      <View>
                         <Text>Male</Text>
                         <RadioButton value='Male'></RadioButton>
                      </View>
                      <View>
                         <Text>Female</Text>
                         <RadioButton value='Female'></RadioButton>
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
                <View style={styles.buttonContainer}>
                  <View>
                    <Button
                      onPress={handleSubmit}
                      title="Register"
                      disabled={!isValid}
                    />
                  </View>
                  <View>
                    <Button
                      onPress={() => {props.navigation.navigate('Users')}}
                      title="View Users"
                    />
                  </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
  radioContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default RegisterScreen;
