/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Input from '../../components/Input/Input';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button/Button';
import PhoneInput from 'react-native-phone-number-input';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const onPress = (name, email, password, PhoneNumber, navigate) => {
  axios({
    method: 'post',
    url: 'https://student.valuxapps.com/api/register',
    params: {
      name: name,
      email: email,
      password: password,
      phone: PhoneNumber,
    },
  })
    .then(res => {
      Alert.alert(res.data.message);
      if (res.data.data.token) {
        navigate('Login');
      }
    })
    .catch(err => console.log('error: ', err));
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required.'),
  password: Yup.string().min(8).required('Password is required.'),
});

export default function SignUp() {
  const {navigate} = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>SignUp Page</Text>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            PhoneNumber: '',
          }}
          onSubmit={() => {}}
          validationSchema={validationSchema}>
          {({values, errors, touched, handleChange, handleBlur, isValid}) => (
            <>
              <View style={[styles.innerContainer, {marginTop: 15}]}>
                <Input
                  label={'Name'}
                  placeholder={'Enter Your Name'}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </View>
              <View style={styles.innerContainer}>
                <PhoneInput
                  defaultValue={values.PhoneNumber}
                  defaultCode="DM"
                  layout="first"
                  onChangeText={handleChange('PhoneNumber')}
                  withDarkTheme
                  withShadow
                  // autoFocus
                  containerStyle={styles.phoneNumber}
                />
              </View>
              <View style={styles.innerContainer}>
                <Input
                  label={'Email'}
                  placeholder={'Ahmed@email.com'}
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
                  placeholder={'* * * * * * * * * * * *'}
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
                <Button label={'Login'} onPress={() => navigate('Login')} />
                <Button
                  label={'signup'}
                  style={{alignSelf: 'flex-end'}}
                  onPress={() =>
                    onPress(
                      values.name,
                      values.email,
                      values.password,
                      values.PhoneNumber,
                      navigate,
                    )
                  }
                  disabled={!isValid}
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
  },
  errorTxt: {fontSize: 11, color: 'red'},
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  phoneNumber: {borderWidth: 1, borderRadius: 10, width: '100%', height: 75},
});
