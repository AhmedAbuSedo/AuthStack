import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../../screens/SignUpScreen/Signup';
import Login from '../../screens/LoginScreen/Login';
import Home from '../../screens/HomeScreen/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRef} from 'react';
import {useState} from 'react';
const Stack = createNativeStackNavigator();
export default function AuthStack() {
  const [accessToken, setAccessToken] = useState('Not_Yet');
  useEffect(() => {
    AsyncStorage.getItem('AccessToken')
      .then(value => {
        console.log({value});
        setAccessToken(value);
      })
      .catch(err => console.log({err}));
  }, [accessToken]);
  return (
    <>
      {accessToken !== 'Not_Yet' ? (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={accessToken === null ? 'Login' : 'Home'}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({});
