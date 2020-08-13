import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useState, useEffect, useMemo, useReducer } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import NewList from './components/NewList';
import List from './components/List';
import Home from './components/Home';
import SignIn from './components/SignIn';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import { AuthContext } from './components/context'
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HomeNav from './components/HomeNav'

const store = createStore(reducers);
const Stack = createStackNavigator();    

function App() {

  const initialLoginState = {
    isLoading: true,
    userEmail: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ... prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ... prevState,
          userEmail: action.id,
          userToken: action.token,
          isLoading: false,          
        };
      case 'LOGOUT':
        return {
          ... prevState,
          userEmail: null,
          userToken: null,
          isLoading: false,          
        };
      case 'REGISTER':
        return {
          ... prevState,
          userEmail: action.id,
          userToken: action.token,          
          isLoading: false,          
        };                              
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);   

  const authContext = useMemo(() => ({
    signIn: async(userEmail, password) => {

      let userToken;
      userToken = null;

      let userVerify = await fetch(`http://localhost:5000/verifyUser?email='${userEmail}'&pwd='${password}'`);
      let userData = await userVerify.json();
      
      if (Object.keys(userData).length > 0) {
        try {
          userToken = JSON.stringify(userData)  // fetch token from DB
          await AsyncStorage.setItem('userToken', userToken)
        } catch(e) {
          console.log(e);
        }
      } else {
        console.log('invalid credentials')
      }

      dispatch({type: 'LOGIN', id: userEmail, token: userToken})
    },

    signOut: async() => {

      try {
        userToken = await AsyncStorage.removeItem('userToken')
      } catch(e) {
        console.log(e);
      }         
      dispatch({type: 'LOGOUT'})

    },

    signUp: () => {

    }
  }), [])

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken})
    }, 1000)
  }, []);


  if (loginState.isLoading) {
    return (
      <LottieView source={require('./assets/loader.json')} autoPlay loop/>
    )
  }



  return (
    <AuthContext.Provider value={authContext}>
       <Provider store={store}>
         <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">

            {loginState.userToken !== null ? (

            <>
      
                <Stack.Screen name="HomeNav" component={HomeNav} />            
                <Stack.Screen name="NewList" component={NewList}/>
                <Stack.Screen name="List" component={List}/>
        
            </>

            ) : ( 

            <>
              <Stack.Screen name="SignIn" component={SignIn}/>
            </>

            )}


          </Stack.Navigator>
        </NavigationContainer>   
       </Provider>   
     </AuthContext.Provider>
  );
  
}

export default App;
