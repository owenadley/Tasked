import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Header from './Header';
import { TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import EditField from './EditField'


function ListSettings(props) {

    const [name, setName] = useState(props.route.params.name)

    const deleteList = () => {
        fetch(`http://localhost:5000/deleteList/?idlists=${props.route.params.idlists}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then (
            props.route.params.updateList(),
            props.navigation.navigate('HomeNav')
        )
        .catch((error) => {
            console.log(error);
        }) 
    }

    // submit new list name
    // TODO: check to see if list name has actually changed before making a network request
    const submitListName = (name) => {
        fetch(`http://localhost:5000/updateList/?idlists=${props.route.params.idlists}&listname=${name}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(
            setName(name),
            props.route.params.updateList(name)
        )
        .catch((error) => {
            console.log(error);
        }) 
    }

    return (
        <View style={{flex:1, backgroundColor:'#ecf0f1'}}>
            
            <Header 
                navigation={props.navigation} 
                lName="chevron-left" 
                lHandler={props.navigation.goBack}
                title={name + " Settings"}
            />

            <View style={{flex:1, flexDirection: 'column', margin:20, backgroundColor:'#fff', elevation: 15, borderRadius: 10, }}>

                <EditField value={props.route.params.name} callback={submitListName} />

                <TouchableOpacity onPress={deleteList} style={{ borderWidth: 1, borderColor:'red', borderBottomLeftRadius:10, borderBottomRightRadius:10, justifyContent:'center', flexDirection:'row', padding: 20, marginTop: 'auto'}}>
                        <Icon name='trash' size={25} />
                        <Text style={{marginLeft: 10, fontSize:18}}> Delete List </Text>
                </TouchableOpacity>
            </View>
        
    
        </View>
    )

} 

export default ListSettings;