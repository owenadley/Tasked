
import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ListPreview from './ListPreview';
import Header from './Header';
import {AuthContext} from './context';

function Home(props) {

    const [lists, setLists] = useState([]);
    const userToken = useContext(AuthContext)
    const user = userToken.userTok

    useEffect(() => {
        getLists();        
    }, []);

    // get the lists of the current user
    const getLists = () => {
      AsyncStorage.getItem('userToken', (err, res) => {
        fetch(`http://localhost:5000/getLists/?idusers=${user.idusers}`)
        .then((response) => response.json())
        .then((responseJson) => {
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
            <Text style={{fontSize: 30}}>Hi, {user.fname}</Text>
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