import React from 'react';
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

import {

} from 'react-native/Libraries/NewAppScreen';




class NewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listName: ''
        }
    }

    componentDidMount() {
        console.log()
    }

    setListName = (listName) => {
        this.setState({listName: listName})
    }

    createList = () => {
        fetch(`http://localhost:5000/createList/?listname=${this.state.listName}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(
            this.props.route.params.updateLists(),
            this.props.navigation.goBack())
        .catch((error) => {
          console.log(error);
        })
    }

    render() {
        return (
            <View style={{borderWidth: 2, borderColor: 'green'}}>
                
                
                <Text>Create New List</Text>

                <TextInput
                onChangeText={text => this.setListName(text)}/>
                
                <TouchableOpacity onPress={this.createList}><Text>Create</Text></TouchableOpacity>

                
            </View>
        )
    }

}

export default NewList;