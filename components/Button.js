import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';

function Button(props) {


    return (

        <View style={{marginTop: 10}}>
            <TouchableOpacity 
                style={{
                    justifyContent:'center', 
                    alignItems:'center', 
                    borderRadius: 10, 
                    elevation: 17, 
                    backgroundColor:'#44bd32', 
                    height: 60, 
                    width: Dimensions.get('window').width / 2}} 
                onPress={props.clickHandler}>
                <Text style={{fontSize: 15, color:'#fff'}}>{props.title}</Text>
            </TouchableOpacity>
        </View>

    )


}

export default Button;