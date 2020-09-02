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
                width: Dimensions.get('window').width / 2 - 40,
                height: 180,
                borderWidth: 0,
                borderColor: '#000',
                borderRadius: 5,
                padding: 20,
                margin: 20,
                backgroundColor: '#fff',
                elevation:10,
                justifyContent:'center',
                alignItems:'center'
            }}>  
            <Text style={{fontSize: 18}}>{props.name}</Text>
        </View>
    )        
}


