import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Button from './Button'
import Header from './Header'
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './context';


function NewList(props) {

    const [listName, setListName] = useState(0);
    const userToken = useContext(AuthContext)
    const user = userToken.userTok

    const createList = () => {
      
        fetch(`http://localhost:5000/createList/?idusers=${user.idusers}&listname=${listName}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(
            props.route.params.updateLists(),
            props.navigation.goBack())
        .catch((error) => {
            console.log(error);
        })
    
    }

    return (
        <View style={{flex: 1, backgroundColor: '#ecf0f1', }}>
            
            <Header 
            navigation={props.navigation} 
            lName="chevron-left" 
            lHandler={props.navigation.goBack} 
            title="New List"/>

            <View style={{flex: 1, backgroundColor:'#ecf0f1', marginTop: 40, justifyContent:'space-around', alignItems:'center'}}>
               
                <View style={{padding: 20, backgroundColor:'#fff', width: Dimensions.get('window').width - 80, elevation: 17, borderRadius: 10, height: 130, justifyContent:'center'}}>
                    <TextInput
                    style={{backgroundColor:'#fff'}}
                    placeholder='New list name ... '
                    onChangeText={text => setListName(text)}/>
                </View>

                <Button clickHandler={createList} title='Create'/>
           
            </View>

        </View>
    )
    
}

export default NewList;