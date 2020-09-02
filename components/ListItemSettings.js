import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Animated, Dimensions } from 'react-native'
import EditField from './EditField';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

function ListItemSettings(props) {
   
/*    
    useEffect(() => {
        console.log(props.listitem);
    }); */

    let position = props.position


    const closeListItemDrawer = () => { 
        Animated.timing(
            // Uses easing functions
            position, // The value to drive
            { 
                toValue: 0, 
                duration:700,
                useNativeDriver:true 
            } // Configuration

          ).start(); // Don't forget start!
    }

    const deleteItem = () => {
        props.delete();
        closeListItemDrawer();
    }

    const updateListItem = (name) => {
        const { idlistitems } = props.listitem;

        fetch(`http://localhost:5000/updateListItem/?idlistitems=${props.listitem.idlistitems}&title=${name}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(
            props.getListItems()
        )
        .catch((error) => {
            console.log(error);
        }) 
    }

    return (

        <Animated.View style={{ 
            zIndex:2,
            position:'absolute', 
            width:Dimensions.get('window').width-20, 
            height:Dimensions.get('window').height-150,
            translateY:position, 
            bottom:-Dimensions.get('window').height-150,   
            left:10, 
            backgroundColor:'#fff',
            elevation:20,
            borderTopRightRadius:30,
            borderTopLeftRadius:30,
            padding: 20,

            }}>

            <View style={{flexDirection:'row', marginBottom:20, paddingBottom:20}}>
                <View>
                    <Text>Created {moment(props.listitem.datecreated).format('ll')}</Text>
                </View>
                <View style={{marginLeft:'auto'}}>
                    <TouchableOpacity onPress={closeListItemDrawer}>
                        <Icon style={{}} name='chevron-down' size={25}/>
                    </TouchableOpacity>   
                </View>                        
            </View>

            <View>
                <EditField value={props.listitem.title} callback={updateListItem} />
            </View>

            <View style={{flex: 1, backgroundColor:'#fff', flexDirection:'column', alignItems:'center'}}>

                    <TouchableOpacity onPress={deleteItem} style={{marginTop:'auto', padding:20, borderTopWidth:1, borderBottomColor:"grey"}}>
                        <View style={{flexDirection:'row'}}>                                     
                            <Icon name='trash' size={25} />
                            <Text style={{marginLeft: 10, fontSize:18}}> Delete Item</Text>
                        </View>                                
                </TouchableOpacity>
            </View>
        </Animated.View>

    )

}

export default ListItemSettings;