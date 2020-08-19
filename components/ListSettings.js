import React from 'react';
import {View, Text} from 'react-native';
import Header from './Header';



function ListSettings(props) {

    return (
        <View style={{flex:1, backgroundColor:'#ecf0f1', padding: 20}}>
            
            <Header 
                navigation={props.navigation} 
                lName="chevron-left" 
                lHandler={props.navigation.goBack}
                title="List Settings"
            />
        
        
        </View>
    )

} 

export default ListSettings;