import React from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native';

const FieldInput = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={[styles.textInput, hasError && styles.errorInput]}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        placeholderTextColor="#ccc"
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  textInput: {
    height: 50,
    width: '100%',
    marginBottom: 5,
    paddingHorizontal: 18,
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 1,
    fontSize: 14,
  },
  errorText: {
    fontSize: 11,
    color: 'red',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default FieldInput;
