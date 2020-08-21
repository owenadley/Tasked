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
import Register from './components/Register';
import ListSettings from './components/ListSettings';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import { AuthContext } from './components/context'
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HomeNav from './components/HomeNav'

import { storeTok } from './redux/actions'
import { useSelector, useDispatch } from "react-redux";


const Stack = createStackNavigator();    
const store = createStore(reducers);

function App() {

  const [userTok, setUserTok] = useState('')

  const initialLoginState = {
    isLoading: true,
    userEmail: null,
    userToken: null,
  }

  // auth reducer for different auth states
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

  // auth actions
  // try to get userToken from async storage to determine if user need to log in or not
  const authContext = useMemo(() => ({
    signIn: async(userEmail, password) => {

      console.log('hello world')

      let userToken;
      userToken = null;

      let userVerify = await fetch(`http://localhost:5000/verifyUser?email='${userEmail}'&pwd='${password}'`).catch(e => { throw e });
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

      console.log('here beer');

      try {
        userToken = await AsyncStorage.removeItem('userToken')
      } catch(e) {
        console.log(e);
      }         
      dispatch({type: 'LOGOUT'})

    },

    signUp: async(fName, userEmail, password) => {

      let userToken;
      userToken = null;

      const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      };

      try {
        
        let registerUser = await fetch(`http://localhost:5000/registerUser?fname='${fName}'&email='${userEmail}'&pwd='${password}'`, settings);
        let doRegister = await registerUser.json();
       
        if (doRegister.success) {

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
        };

     } catch(e) {
       console.log(e)
     }

      dispatch({type: 'REGISTER', id: userEmail, token: userToken})

    }
  }), [])


  // try to get the token while the app takes 1s to load
  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      try {

        userToken = await AsyncStorage.getItem('userToken');
        if (userToken !== null) {
          setUserTok(JSON.parse(userToken).data)
        }

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
    <AuthContext.Provider value={{authContext, userTok}}>
       <Provider store={store}>
         <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>

            {loginState.userToken !== null ? (

            <>
      
                <Stack.Screen name="HomeNav" component={HomeNav} />            
                <Stack.Screen name="NewList" component={NewList}/>
                <Stack.Screen name="List" component={List}/>
                <Stack.Screen name="ListSettings" component={ListSettings}/>
        
            </>

            ) : ( 

            <>

              <Stack.Screen name="SignIn" component={SignIn}/>
              <Stack.Screen name="Register" component={Register}/>

            </>

            )}

          </Stack.Navigator>
        </NavigationContainer>   
       </Provider>   
     </AuthContext.Provider>
  );
  
}

export default App;
