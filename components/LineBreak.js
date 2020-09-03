import React from 'react';
import { Text, View, TouchableOpacity, } from 'react-native'

function LineBreak(props) {

    return (

        <View style={{marginTop:40, marginBottom:20, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
            <View style={{height:1, flex:1, backgroundColor:'#000'}}></View>
            <View style={{marginLeft:8, marginRight:8, alignItems:'center'}}><Text>{props.title}</Text></View>
            <View style={{height:1, flex:10, backgroundColor:'#000'}}></View>
        </View>

    )

}

export default LineBreak;