import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/Stack/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screens/LoginScreen/Login';
import Home from './src/screens/HomeScreen/Home';
import HomeStack from './src/navigation/Stack/HomeStack';
export default function App() {
  useEffect(() => {
    (async function requestUserPermission() {
      const authStatus = await messaging().requestPermission(); //send req to user to allow notification
      const enabled = //check requestPermission
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        messaging()
          .getToken()
          .then(val => console.log(val));
      }
    })();
  }, []);
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
