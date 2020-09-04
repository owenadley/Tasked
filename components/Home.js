
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
import ButtonAdd from './ButtonAdd';
import DailyPlannerPreview from './DailyPlannerPreview'
import LineBreak from './LineBreak';

function Home(props) {

    const [lists, setLists] = useState([]);
    const [listView, setListView] = useState(true);

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
        let updateLists = getLists;      
        props.navigation.navigate('List', {list: list, updateLists: updateLists})
    }


    return (

        <View style={{flex:1, backgroundColor:'#ecf0f1'}}>
            
          <View style={{flex:1, flexDirection:'row', zIndex:1, backgroundColor:'transparent', elevation:100, position:'absolute', bottom: 20, right:0, justifyContent:'flex-start'}}>
            <ButtonAdd btnHandler={createNewList}/>
          </View>

          <Header 
            navigation={props.navigation} 
            rName="bars" 
            rHandler={props.navigation.openDrawer} 
            title={"Hi, " + user.fname}
            isHome={true}
          />

     
            {lists.length > 0 ?

              <View style={{marginBottom:110}}>
                  <ScrollView style={{marginBottom:0}}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('DailyPlanner')}>
                      <DailyPlannerPreview />
                    </TouchableOpacity>

                    <LineBreak title="Your Lists"/>

                    <View style={{flexDirection:'row', flexWrap:"wrap"}}>
                      {/* On the home page, list out all of the users lists */}   
                      {lists.map((list) => {
                        return (
                    
                            <TouchableOpacity key={list.idlists} onPress={() => selectList(list)}>
                                <ListPreview color={list.color} name={list.name}/>
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