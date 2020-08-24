import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function EditField(props) {


    // PROPS:
    // value: the current value of the editable field
    // callback: the function to be called once the name is updated - should take the value

    const [editField, setEditField] = useState(false);
    const [value, setValue] = useState(props.value)

    const editFieldTitle = () => {
        setEditField(!editField)
    }

    const submitEditField = () => {
        props.callback(value);
        editFieldTitle();
    }

    return (
   
        <View style={{flexDirection:'row', justifyContent:'space-between', padding: 30, borderBottomWidth: 3, borderBottomColor:'#ecf0f1'}}>
            {editField!==true ?
                <>
                    <Text style={{fontSize:20}}>{value}</Text>
                    <TouchableOpacity onPress={editFieldTitle}>
                        <Icon name='edit' size={25} color='#44bd32'/>
                    </TouchableOpacity>
                </>
            :
                <>

                    <TextInput autoFocus style={{flex: 1, fontSize:20, margin: 0, padding: 0}}
                        value={value}
                        placeholder='list name ... '
                        onChangeText={value => setValue(value)}/>                                   
                    <TouchableOpacity onPress={submitEditField}>
                        <Icon name='check' size={25} color='#44bd32'/>
                    </TouchableOpacity>
                </>
            }   

    </View>

    )

}

export default EditField;
