
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
import ListPreview from './ListPreview';
import SignOut from './SignOut'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from './Header';

import { useSelector, useDispatch } from 'react-redux';


function Home(props) {

    const [name, setName] = useState('');
    const [lists, setLists] = useState([]);
    const Drawer = createDrawerNavigator();
  
    const tok = useSelector(state => state.tok)
    //const dispatch = useDispatch();
    console.log('================= REDUX ===================')
    console.log(tok)

    useEffect(() => {

        getLists();        

    }, []);

    // get the lists of the current user
    const getLists = () => {
      AsyncStorage.getItem('userToken', (err, res) => {
        fetch(`http://localhost:5000/getLists/?idusers=${JSON.parse(res).data.idusers}`)
        .then((response) => response.json())
        .then((responseJson) => {
          setName(JSON.parse(res).data.fname)
          setLists(responseJson.lists)
        })
        .catch((error) => {
          console.log(error); 
        })
      })
    } 

    // navigate to createList
    const createNewList = () => {
        let updateLists = getLists;
        props.navigation.navigate('NewList', {updateLists: updateLists});
    }

    // navigate to List
    const selectList = (list) => {
        props.navigation.navigate('List', {list: list})
    }

    return (

        <View style={{flex:1, backgroundColor:'#ecf0f1', padding: 20}}>

                
          <Header 
            navigation={props.navigation} 
            iname="bars" 
            nHandler={props.navigation.openDrawer} 
            pHandler={createNewList}/>

          <View style={{display: "flex", flexDirection: "column"}}>
            <Text style={{fontSize: 30}}>Hi, {name}</Text>
          </View>

          {lists.length > 0 ?

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

          :

            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <Text>You have no tasks, create one!</Text>
            </View>

          }

  
        </View>

    )
  }

export default Home;