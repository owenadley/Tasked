import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function ListItem(props) {

    return (

        <TouchableOpacity 
        key={props.item.key} 
        style={{
            display:'flex', 
            flexDirection:'row', 
            backgroundColor:'#fff',
            elevation: 5,
            margin:13,
            borderRadius:10,
            alignItems:'center'
        }}
        onLongPress={props.drag}
        >
        

            {!props.item.completed ? 
                <CheckBox 
                containerStyle={{backgroundColor: '#fff'}}
                center 
                title={props.item.title} 
                checked={Boolean(props.item.completed)}
                onPress={() => props.toggleCheckbox(props.item.idlistitems, props.item.completed)}
                />
        
            : 
                <CheckBox 
                containerStyle={{backgroundColor: '#fff'}}
                center 
                title={props.item.title} 
                checkedColor='#44bd32'
                textStyle={{textDecorationLine:'line-through', color:'grey'}}
                checked={Boolean(props.item.completed)}
                onPress={() => props.toggleCheckbox(props.item.idlistitems, props.item.completed)}
                />
            
            }

            <TouchableOpacity style={{marginLeft:'auto'}} onPress={(items) => selectListItem(items)}><Icon style={{marginRight:20}} name="ellipsis-h" size={25}/></TouchableOpacity>
        </TouchableOpacity> 

    )

}

export default ListItem;