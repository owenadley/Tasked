import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import NewList from './NewList';
import ButtonAdd from './ButtonAdd';
import {AuthContext} from './context';

function NewListItem(props) {

    const [newListItem, setNewListItem] = useState(false);  // used for displaying and hiding the UI for creating a new list item
    const [listItemName, setListItemName] = useState('');   // store the name of the new list item

    const userToken = useContext(AuthContext);  // retrieve the current user from AuthContext
    const user = userToken.userTok;


    const createNewListItem = () => {
        setNewListItem(true)
    }

    const submitNewListItem = () => {
        fetch(`http://localhost:5000/createNewListItem/?title=${listItemName}&idusers=${user.idusers}&idlists=${props.idlists}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(
            props.updateList(), // update the list from List.js
            setNewListItem(false)   // hide the UI for creating new list item
        )
        .catch((error) => {
          console.log(error);
        })
    }

    let styles = {

    }

    return (

        <View style={{flex:1, flexDirection:'row', zIndex:1, backgroundColor:'#fff', elevation:0, position:'absolute', bottom: 0, right:0, justifyContent:'flex-start'}}>

        {newListItem ?
            <View style={{flex:1, flexDirection:'row', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 10, borderRadius: 10, height: 80}}>
                <View style={{flex:2, height: 80, padding: 20}}>                        
                    <TextInput style={{}} 
                    placeholder='Task name ... '
                    onChangeText={text => setListItemName(text)}/>          
                </View>


                <TouchableOpacity onPress={submitNewListItem} style={{flex:1, justifyContent: 'center', alignItems: 'center', height: 80, backgroundColor:'#44bd32', borderTopRightRadius: 10, borderBottomRightRadius: 10, elevation: 10}}> 
                    <Text style={{color: '#fff'}}>Create</Text>
                </TouchableOpacity>

            </View>
        : null}
      
        <ButtonAdd btnHandler={createNewListItem}/>
    
    </View>

    )

}

export default NewListItem;