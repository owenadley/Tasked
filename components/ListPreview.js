import React from 'react';
import {
  View,
  Text,
} from 'react-native';

export default function ListPreview(props) {
    return (
        <View 
            style={{ 
                borderWidth: 2,
                borderColor: '#000',
                borderRadius: 5,
                padding: 40,
                margin: 10
            }}>  
            <Text style={{fontSize: 18}}>{props.name}</Text>
        </View>
    )        
}


