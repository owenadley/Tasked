import React from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Button
  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


// PROPS:
// iname: icon name for top left
// nHandler: onClick method for top left
// pHandler: onClick method for top right

function Header(props) {


    return (

        <View style={{
            marginBottom: 20, 
            display: "flex", 
            flexDirection: "row",
            justifyContent: "space-between"}}>

            <TouchableOpacity onPress={props.nHandler}>
                <Icon name={props.iname} size={30} color='#000'/>
            </TouchableOpacity>
            <TouchableOpacity style={{
                height: 40,
                width: 70,
                borderRadius: 10,
                backgroundColor: '#44bd32',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={props.pHandler}>

            <Icon name='plus' size={20} color='white'/>

            </TouchableOpacity>
        </View>

    )


}

export default Header;