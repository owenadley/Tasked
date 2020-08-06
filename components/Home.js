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
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewList from './NewList';
import ListPreview from './ListPreview';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          lists: [],
          newlist: false
        }
      }
    
      componentDidMount() {
        this.getUserName();
        this.getLists();
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
    
      createNewList = () => {
            let getLists = this.getLists;
            this.props.navigation.navigate('NewList', {updateLists: getLists});
      }

      selectList = (list) => {
            this.props.navigation.navigate('List', {list: list})
      }
    
      getLists = () => {
        fetch(`http://localhost:5000/getLists/?idusers=1`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({lists: responseJson.lists})
        })
        .catch((error) => {
          console.log(error); 
        })
    }
    
    
      render() {
        return (
            <View style={{flex:1}}>
              <View style={{
                padding: 30,
              }}>
    
              <View style={{
                display: "flex", 
                flexDirection: "row",
                justifyContent: "space-between"
                }}>
    
                <View style={{display: "flex", flexDirection: "column"}}>
                  <Text style={{fontSize: 30}}>Hi, {this.state.name}</Text>
                </View>
                
                <TouchableOpacity style={{
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  backgroundColor: '#44bd32',
                  justifyContent: 'center',
                  alignItems: 'center'
                  }}
                  onPress={this.createNewList}>
    
                  <Icon name='plus' size={40} color='white'/>
    
                </TouchableOpacity>
              </View>
    
                  
                <ScrollView>
                {/* On the home page, list out all of the users lists */}       
                {this.state.lists.map((list) => {
                  return (
              
                          <TouchableOpacity key={list.idlists} onPress={() => this.selectList(list)}>
                              <ListPreview name={list.name}/>
                           </TouchableOpacity>
              
                      )
                  })
                }
                </ScrollView>
    
              </View>
            </View>
        );
    
      }
    
    }

export default Home;