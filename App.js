/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { CheckBox } from 'react-native-elements';
import TaskList from './components/TaskList';
import NewTask from './components/NewTask';
import Icon from 'react-native-vector-icons/FontAwesome';

//const fetch = require("node-fetch");

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      name: '',
      newTask: false
    }
  }

  componentDidMount() {
    this.getUserName();
  }


  getUserName = () => {
    fetch('http://localhost:5000/getUserName')
      .then((response) => response.json())
      .then((responseJson) => {
      
        this.setState({name: responseJson.data.fname})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  createNewTask = () => {
    this.setState({newTask: true})
  }

  taskSubmitted = () => {
    this.setState({newTask: false})
    this.child.getTasks();
  }

  render() {
    console.log('renderin app')
    return (
      <View>
        <View style={{
          padding: 30,
        }}>

        <View style={{
          display: "flex", 
          flexDirection: "row",
          justifyContent: "space-between"
          }}>

          <View style={{display: "flex", flexDirection: "column"}}>
            <Text style={{fontSize: 40}}>Tasked</Text>
            <Text>Hi, {this.state.name}</Text>
          </View>
          
          <TouchableOpacity style={{
            height: 70,
            width: 70,
            borderRadius: 35,
            backgroundColor: '#44bd32',
            justifyContent: 'center',
            alignItems: 'center'
            }}
            onPress={this.createNewTask}>
            <Icon name='plus' size={40} color='white'/>
          </TouchableOpacity>

        </View>


          {this.state.newTask ? <NewTask taskSubmitted={this.taskSubmitted} />: null}
          <TaskList ref={child => {this.child = child}} {...this.props} tasks={this.state.tasks}/>


        </View>
      </View>
    );

  }

}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
