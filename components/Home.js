
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
import Header from './Header';


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

        <View style={{flex:1, backgroundColor:'#ecf0f1'}}>

          <View style={{
            padding: 20,
          }}>
                

          <Header 
            navigation={props.navigation} 
            iname="bars" 
            nHandler={props.navigation.openDrawer} 
            pHandler={createNewList}/>


     
          <View style={{display: "flex", flexDirection: "column"}}>
            <Text style={{fontSize: 30}}>Hi, {name}</Text>
          </View>
            
      

            <View>
                <ScrollView style={{marginTop: 40}}>
                  <View style={{flexDirection:'row', flexWrap:"wrap"}}>
                    {/* On the home page, list out all of the users lists */}   
                    {lists.map((list) => {
                      return (
                  
                              <TouchableOpacity key={list.idlists} onPress={() => selectList(list)}>
                                  <ListPreview name={list.name}/>
                                </TouchableOpacity>
                  
                          )
                      })
                    }
                  </View>
                </ScrollView>
            </View>
          </View>
        </View>

    );
  
      
    
    }

export default Home;