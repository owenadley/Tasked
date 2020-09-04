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
import ColorPicker from './ColorPicker'

function NewList(props) {

    const [listName, setListName] = useState(0);
    const [color, setColor] = useState('red')
    const userToken = useContext(AuthContext)
    const user = userToken.userTok

    const createList = () => {
      
        fetch(`http://localhost:5000/createList/?idusers=${user.idusers}&listname=${listName}&color=${color}`, {
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

    changeColor = (color) => {
        setColor(color)
    }

    return (
        <View style={{flex: 1, backgroundColor: '#ecf0f1', }}>
            
            <Header 
            navigation={props.navigation} 
            lName="chevron-left" 
            lHandler={props.navigation.goBack} 
            title="New List"/>

            <View style={{flex: 1, backgroundColor:'#ecf0f1', marginTop: 40, alignItems:'center'}}>
               
                <View style={{padding: 20, backgroundColor:'#fff', width: Dimensions.get('window').width - 80, elevation: 17, borderRadius: 10, height: 100, justifyContent:'center'}}>
                    <TextInput
                    style={{backgroundColor:'#fff'}}
                    placeholder='New list name ... '
                    onChangeText={text => setListName(text)}/>
                </View>

                <View style={{marginTop:50, marginLeft:50, marginRight: 50,  display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'space-between',flexWrap:'wrap',}}>
        
                    <ColorPicker onColorChange={changeColor}/>


                </View>

                <View style={{position:'absolute', bottom:60}}>
                    <Button clickHandler={createList} title='Create'/>
                </View>
            </View>

        </View>
    )
    
}

export default NewList;