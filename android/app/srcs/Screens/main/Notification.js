import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
const Notification = ({navigation}) => {
  const ValidationScheme = yup.object().shape({
    email: yup.string().required('Is Required'),
  });

  const initialValue = {
    email: '',
  };

  return (
    <Formik
      initialValues={{...initialValue}}
      validationSchema={ValidationScheme}
      onSubmit={values => {console.log(values),navigation.navigate('CreateBlog')}}>
      {({handleChange,handleSubmit, handleBlur, values, isValid, errors, touched}) => (
        <View style={styles.container}>
          <TextInput
            enablesReturnKeyAutomatically
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
            style={styles.inpt}
          />
          {errors.email && <Text style={{color: 'red'}}>{errors.email}</Text>}
          <TouchableOpacity
            style={!isValid ? styles.unValidBtn : styles.LoginBtn}
            onPress={handleSubmit}
            disabled={!isValid}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inpt: {
    marginTop: 16,
    height: 48,
    width: 334,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    borderRadius: 10,
    paddingStart: 20,
  },
  LoginBtn: {
    backgroundColor: '#E9D023',
    width: 334,
    height: 48,
    borderRadius: 10,
    marginTop: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unValidBtn: {
    backgroundColor: '#BEBEBE',
    width: 334,
    height: 48,
    borderRadius: 10,
    marginTop: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#474746',
    fontSize: 18,
    fontWeight: '900',
    opacity: 0.9,
  },
});
