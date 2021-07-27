import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { RadioButton }  from 'react-native-paper';
import {Formik, Field} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FieldInput from '../components/FieldInput';
import signUpValidationSchema from '../schema/RegisterSchema';

const RegisterScreen = (props) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <Text style={styles.headerOuterText}>
            Sign<Text style={styles.headerInnerText}>up</Text>
          </Text>
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
                      <View style={styles.radioButton}>
                         <Text style={styles.radioText}>Male</Text>
                         <RadioButton value='Male'></RadioButton>
                      </View>
                      <View style={styles.radioButton}>
                         <Text style={styles.radioText}>Female</Text>
                         <RadioButton value='Female'></RadioButton>
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                    <View style={styles.signUpButton}>
                      <Text style={styles.buttonText}>SIGN UP</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {props.navigation.navigate('Sign In')}}>
                    <View style={styles.signInButton}>
                      <Text style={styles.signInNavigateText}>I Already Have An Account</Text>
                    </View>
                  </TouchableOpacity>
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
  signupContainer: {
    width: '84%',
    alignItems: 'center',
    backgroundColor: '#f1f1f3',
    paddingHorizontal: 0,
    paddingVertical: 35,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    paddingHorizontal: 20,
  },
  radioText: {
    color: 'grey',
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
  signUpButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#68cac9',
    height: 48,
    borderRadius: 30,
  },
  signInButton: {
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

export default RegisterScreen;
