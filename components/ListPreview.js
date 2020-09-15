import React from 'react';
import {
  View,
  Text,
  Dimensions,
} from 'react-native';

export default function ListPreview(props) {
    return (
        <View 
            style={{ 
                flex:1,
                borderWidth: 0,
                borderColor: '#000',
                borderRadius: 5,
                padding: 40,
                margin: 10,
                backgroundColor: '#fff',
                elevation:10,
                justifyContent:'center',
                alignItems:'center',
                borderBottomWidth:12,
                borderBottomColor: props.color
            }}>  
            <Text style={{fontSize: 18}}>{props.name}</Text>
        </View>
    )        
}


