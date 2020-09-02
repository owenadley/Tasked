import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, TextInput, Dimensions } from 'react-native';
import NewList from './NewList';
import ButtonAdd from './ButtonAdd';
import {AuthContext} from './context';

function NewListItem(props) {

    const [listItemName, setListItemName] = useState('');   // store the name of the new list item

    const userToken = useContext(AuthContext);  // retrieve the current user from AuthContext
    const user = userToken.userTok;

    let postSettings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const submit = async () => {
        try {
            const data = await fetch(`http://localhost:5000/createNewListItem/?title=${listItemName}&idusers=${user.idusers}&idlists=${props.idlists}`, postSettings)
            const res = await data.json();  // use this to handle success or failure messgaes
            setListItemName('');
            props.getListItems(); // update the list from List.js
        } catch (e) {
            console.log(e)
        }    
    }

    return (

        <View style={{
            position:'absolute', 
            zIndex:1,
            flexDirection:'row', 
            backgroundColor:'#fff', 
            flex:1, 
            height: 70, 
            width:Dimensions.get('window').width, 
            justifyContent:'center',
            alignItems:'center',
            bottom:0,
            borderTopWidth:1, 
            borderTopColor:'grey'}}>

                <View style={{flex:1, paddingLeft: 20}}>                        
                    <TextInput style={{}} 
                    value={listItemName}
                    placeholder='New task ... '
                    onChangeText={text => setListItemName(text)}/>          
                </View>

                <ButtonAdd btnHandler={submit}/>


        </View>

    )

}

export default NewListItem;