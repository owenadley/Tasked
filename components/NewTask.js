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
  

class NewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
        }
    }

    handleTextChange = (text) => {
        this.setState({taskName: text})
    }
    
    submitTask = () => {

        this.props.taskSubmitted();

        fetch(`http://localhost:5000/createTask/?idusers=1&taskName=${this.state.taskName}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    render() {

        return (

            <View style={{borderWidth: 2, borderColor: '#44bd32', borderRadius: 5, margin: 10 }}>
                <TextInput
                onChangeText={text => this.handleTextChange(text)}/>

                <TouchableOpacity onPress={this.submitTask}><Text>Submit</Text></TouchableOpacity>
            </View>
        )

    }

}

export default NewTask;