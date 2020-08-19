import React from 'react';
import {
    View,
    TouchableOpacity,
    Text
  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


// PROPS:
// lName: icon name for top left
// lHandler: onClick method for top left
// rName: icon name for top right
// rHandler: onClick method for top right
// title: title for the current screen

function Header(props) {


    return (

        <>

            <View style={{
                marginBottom: 20, 
                display: "flex", 
                flexDirection: "row",
                justifyContent: "space-between"}}>

                <TouchableOpacity onPress={props.lHandler}>
                    <Icon name={props.lName} size={30} color='#000'/>
                </TouchableOpacity>
                
                {props.rHandler ?
                    <TouchableOpacity style={{

                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}
                    onPress={props.rHandler}>

                        <Icon name={props.rName} size={30} color='#000'/>

                    </TouchableOpacity>
                :
                    <></>
                }
            </View>

            <View style={{display: "flex"}}>
                <Text style={{fontFamily: 'Alata-Regular', fontSize: 30}}>{props.title}</Text>
            </View>

        </>

    )


}

export default Header;