import React, {useContext} from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from './Home';
import { AuthContext } from './context'
import {View, Text} from 'react-native'



function HomeNav(props) {

    const context = useContext(AuthContext);
    const { signOut } = context.authContext;

    const Drawer = createDrawerNavigator();

    return (
      <Drawer.Navigator drawerStyle={{flex:1}} initialRouteName="Home" drawerContent={props => {
          return (
              <DrawerContentScrollView style={{flex:1}} {...props}>
                  <DrawerItemList {...props} />
                  <DrawerItem style={{backgroundColor:'green'}} labelStyle={{color:'#fff'}} label="Logout" onPress={signOut}/>
              </DrawerContentScrollView>
          )
      }}>

        <Drawer.Screen name="Home" component={Home}/>
          
      </Drawer.Navigator>      
    );
    
}


export default HomeNav;