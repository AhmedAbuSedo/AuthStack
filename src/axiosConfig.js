import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const setAccessToken = token => {
  axios.defaults.headers.common = {
    Authorization: token,
  };
};
const readAccessToken = () => {
  AsyncStorage.getItem('accessToken').then(res => {
    axios.defaults.headers.common = {
      Authorization: res,
    };
  });
};
readAccessToken();
axios.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      //   return RootNavigation.navigate("AuthFlow", { screen: "Login" });
    }
    // showErrorMessage(error?.response?.data?.Message);
    throw error;
  },
);
