import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from './Header';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from './context';

function DailyPlanner(props) {

    const userToken = useContext(AuthContext);  // retrieve the current user from AuthContext
    const user = userToken.userTok;

    const [dailyListItems, setDailyListItems] = useState({})

    useEffect(() => {
        getDailyListItems();
    }, []); 


    const getDailyListItems = async () => {
        try {
            const data = await fetch(`http://localhost:5000/getDailyListItems/?idusers=${user.idusers}`)
            const res = await data.json();  // use this to handle success or failure messgaes
            setDailyListItems(res.scheduledlistitems)
        } catch (e) {
            console.log(e)
        }     
    }

    return (
        <View style={{flex:1, backgroundColor:'#ecf0f1'}}>
            <Header 
                navigation={props.navigation} 
                lName="chevron-left" 
                lHandler={props.navigation.goBack}
                title={"Daily Tasks"}/>
                
                <View style={{marginLeft:20, marginRight:20}}>
                    <Text style={{fontFamily: 'Alata-Regular', fontSize:20, marginBottom:20}}>Today</Text>

                    {dailyListItems.length > 0 ?
                    <>
                        {dailyListItems.map((item) => {
                        return (
                            <View 
                            key={2} 
                            style={{
                                display:'flex', 
                                flexDirection:'row', 
                                backgroundColor:'#fff',
                                elevation: 5,
                                borderRadius:10,
                                alignItems:'center'
                            }}>
    
                            <CheckBox 
                                containerStyle={{backgroundColor: '#fff'}}
                                center 
                                title={item.title} 
                                checked={Boolean(false)}
                           
                            />
                            <TouchableOpacity style={{marginLeft:'auto'}} onPress={() => this.selectListItem(items)}><Icon style={{marginRight:20}} name="ellipsis-h" size={25}/></TouchableOpacity>
                            </View>
                        )
                        
                        })}
                    </>
                    : 
                        <></>
                    }
                    


                </View>
            
        </View>
    )

}

export default DailyPlanner