
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ListPreview from './ListPreview';
import SignOut from './SignOut'
import { createDrawerNavigator } from '@react-navigation/drawer';

Home['navigationOptions'] = screenProps => ({
  headerLeft: <Button onPress={props.navigation.navigate('DrawerOpen')} title="="/>
});

function Home(props) {

    const [name, setName] = useState('');
    const [lists, setLists] = useState([]);
    const Drawer = createDrawerNavigator();


    useEffect(() => {
      getLists();
      getUserName();
    }, []);

    const getUserName = () => {
      fetch('http://localhost:5000/getUserName')
        .then((response) => response.json())
        .then((responseJson) => {
          setName(responseJson.data.fname)
        })
        .catch((error) => {
          console.log(error);
        })
    };
    
    const getLists = () => {
      fetch(`http://localhost:5000/getLists/?idusers=1`)
      .then((response) => response.json())
      .then((responseJson) => {
        setLists(responseJson.lists)
      })
      .catch((error) => {
        console.log(error); 
      })
    } 

    const createNewList = () => {
        let updateLists = getLists;
        props.navigation.navigate('NewList', {updateLists: updateLists});
    }

    const selectList = (list) => {
        props.navigation.navigate('List', {list: list})
    }

    return (

        <View style={{flex:1}}>

          <View style={{
            padding: 30,
          }}>

          <View style={{
            display: "flex", 
            flexDirection: "row",
            justifyContent: "space-between"
            }}>

            <View style={{display: "flex", flexDirection: "column"}}>
              <Text style={{fontSize: 30}}>Hi, {name}</Text>
            </View>
            
            <TouchableOpacity style={{
              height: 70,
              width: 70,
              borderRadius: 35,
              backgroundColor: '#44bd32',
              justifyContent: 'center',
              alignItems: 'center'
              }}
              onPress={createNewList}>

              <Icon name='plus' size={40} color='white'/>

            </TouchableOpacity>
          </View>

              
            <ScrollView>
            {/* On the home page, list out all of the users lists */}   
            {lists.map((list) => {
              return (
          
                      <TouchableOpacity key={list.idlists} onPress={() => selectList(list)}>
                          <ListPreview name={list.name}/>
                        </TouchableOpacity>
          
                  )
              })
            }
            </ScrollView>

          </View>
        </View>

    );
  
      
    
    }

export default Home;