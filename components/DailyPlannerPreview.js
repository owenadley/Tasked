import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

function DailyPlannerPreview() {

return (



        <ImageBackground source={require('./../assets/gb2.jpg')} imageStyle={{borderRadius:20}} style={{
        padding:20,
        height: 150, 
        display:'flex',
        flexDirection:'row'}}>

            <View style={{flex:2, justifyContent:"space-around"}}>
            <Text style={{fontSize:23, color:'#fff', fontWeight: 'bold'}}>Daily Tasks</Text>
            <Text style={{fontSize:15, color:'#fff', fontWeight: 'bold'}}>3 tasks today</Text>
            </View>

            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Icon name="calendar-o" size={40} color="#fff"/>
            </View>

        </ImageBackground>        
    
    
)

}

export default DailyPlannerPreview