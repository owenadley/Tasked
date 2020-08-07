import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';



function NewList(props) {

    const [listName, setListName] = useState(0);

    const createList = () => {
        fetch(`http://localhost:5000/createList/?listname=${listName}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(
            props.route.params.updateLists(),
            props.navigation.goBack())
        .catch((error) => {
          console.log(error);
        })
    }

    return (
        <View style={{borderWidth: 2, borderColor: 'green'}}>
            
            <Text>Create New List</Text>

            <TextInput
            onChangeText={text => setListName(text)}/>
            
            <TouchableOpacity onPress={createList}><Text>Create</Text></TouchableOpacity>
            
        </View>
    )
    
}

export default NewList;