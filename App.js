import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import NewList from './components/NewList';
import List from './components/List';
import Home from './components/Home';
import SignIn from './components/SignIn';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';

const store = createStore(reducers);
const Stack = createStackNavigator();    

class App extends React.Component {

  render() {

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="NewList" component={NewList}/>
            <Stack.Screen name="List" component={List}/>
          </Stack.Navigator>
        </NavigationContainer>   
      </Provider>   
    );
  }
}

export default App;
