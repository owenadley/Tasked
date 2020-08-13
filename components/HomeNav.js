import React, {useContext} from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from './Home';
import { AuthContext } from './context'



function HomeNav(props) {

    const { signOut } = useContext(AuthContext);
    const Drawer = createDrawerNavigator();

    return (
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
          return (
              <DrawerContentScrollView {...props}>
                  <DrawerItemList {...props} />
                  <DrawerItem label="Logout" onPress={signOut}/>
              </DrawerContentScrollView>
          )
      }}>

        <Drawer.Screen name="Home" component={Home}/>
          
      </Drawer.Navigator>      
    );
    
}


export default HomeNav;