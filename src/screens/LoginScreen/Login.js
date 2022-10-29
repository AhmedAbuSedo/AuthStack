/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Text,
  Alert,
} from 'react-native';
import React from 'react';
import Input from '../../components/Input/Input';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const onPress = (email, password, replace) => {
  axios({
    method: 'post',
    url: 'https://student.valuxapps.com/api/login',
    params: {
      email: email,
      password: password,
    },
  })
    .then(res => {
      Alert.alert(res.data.message);
      if (res.data.status) {
        AsyncStorage.setItem('AccessToken', res.data.data.token);
        replace('Home');
      }
    })
    .catch(err => console.log(err));
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required.'),
  password: Yup.string().min(8).required('Password is required.'),
});
export default function Login() {
  const {navigate, replace} = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Login Page</Text>
        <Formik
          initialValues={{
            email: 'Abed@hotmail.com',
            password: '12345678',
          }}
          onSubmit={() => {}}
          validationSchema={validationSchema}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <>
              <View style={styles.innerContainer}>
                <Input
                  label={'Email'}
                  placeholder={'Enter Your Email'}
                  keyboardType={'email-address'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorTxt}>{errors.email}</Text>
                )}
              </View>
              <View>
                <Input
                  label={'Password'}
                  placeholder={'Enter Your Password'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={true}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorTxt}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  label={'Login'}
                  onPress={() =>
                    onPress(values.email, values.password, replace)
                  }
                  disabled={!isValid}
                />
                <Button
                  label={'signup'}
                  style={{alignSelf: 'flex-end'}}
                  onPress={() => navigate('SignUp')}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  innerContainer: {
    marginBottom: 10,
    marginTop: 15,
  },
  errorTxt: {fontSize: 11, color: 'red'},
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
});
