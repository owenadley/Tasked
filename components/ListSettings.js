import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Header from './Header';
import { TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';



function ListSettings(props) {

    const [name, setName] = useState(props.route.params.name);
    const [editName, setEditName] = useState(false);
    
    // toggle state to edit list name
    const editListName = () => {
        setEditName(!editName);
    }

    // submit new list name
    // TODO: check to see if list name has actually changed before making a network request
    const submitListName = () => {
        fetch(`http://localhost:5000/updateList/?idlists=${props.route.params.idlists}&listname=${name}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(
           editListName(),
           props.route.params.updateLists(name)
        )
        .catch((error) => {
            console.log(error);
        }) 
    }

    return (
        <View style={{flex:1, backgroundColor:'#ecf0f1', padding: 20}}>
            
            <Header 
                navigation={props.navigation} 
                lName="chevron-left" 
                lHandler={props.navigation.goBack}
                title="List Settings"
            />

            <View style={{flex:1, flexDirection: 'column', margin:20, backgroundColor:'#fff', elevation: 15, borderRadius: 10, }}>
   
                    <View style={{flexDirection:'row', justifyContent:'space-between', padding: 30, borderBottomWidth: 3, borderBottomColor:'#ecf0f1'}}>
                        {editName!==true ?
                            <>
                                <Text style={{fontSize:20}}>{name}</Text>
                                <TouchableOpacity onPress={editListName}>
                                    <Icon name='edit' size={25} color='#44bd32'/>
                                </TouchableOpacity>
                            </>
                        :
                            <>
   
                                <TextInput autoFocus style={{flex: 1, fontSize:20, margin: 0, padding: 0}}
                                    value={name}
                                    placeholder='list name ... '
                                    onChangeText={value => setName(value)}/>                                   
                                <TouchableOpacity onPress={submitListName}>
                                    <Icon name='check' size={25} color='#44bd32'/>
                                </TouchableOpacity>
                            </>
                        }   

                    </View>

                    <TouchableOpacity style={{ borderWidth: 1, borderColor:'red', borderBottomLeftRadius:10, borderBottomRightRadius:10, justifyContent:'center', flexDirection:'row', padding: 20, marginTop: 'auto'}}>
                            <Icon name='trash' size={25} />
                            <Text style={{marginLeft: 10, fontSize:18}}> Delete List </Text>
                    </TouchableOpacity>
            </View>
        
    
        </View>
    )

} 

export default ListSettings;