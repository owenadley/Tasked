
import React from 'react';
import {

  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView

} from 'react-native';

import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Header';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            completedListItems: [],
            incompleteListItems: [],
            newListItem: false,
            newListItemName: ''
        }

    }

    componentDidMount() {
        this.getListItems();
    }

    getListItems = () => {
        fetch(`http://localhost:5000/getListItems/?idusers=1&idlists=${this.props.route.params.list.idlists}`)
        .then((response) => response.json())
        .then((responseJson) => {
            
            let completedListItems = [];
            let incompleteListItems = [];

            responseJson.listitems.forEach((listitem) => {
                listitem.completed ? completedListItems.push(listitem) : incompleteListItems.push(listitem)
            })

            this.setState({
                completedListItems: completedListItems,
                incompleteListItems: incompleteListItems
            });
        })
        .catch((error) => {
            console.log(error); 
        })
    }

    setListItemName = (text) => {
        this.setState({newListItemName: text})
    }

    submitNewListItem = () => {
        fetch(`http://localhost:5000/createNewListItem/?title=${this.state.newListItemName}&idusers=1&idlists=${this.props.route.params.list.idlists}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(
            this.getListItems(),
            this.setState({newListItem: false})
        )
        .catch((error) => {
          console.log(error);
        })
    }

    createNewListItem = () => {
        this.setState({newListItem: true})
    }


    toggleCheckbox = (id, isComplete) => {

        console.log(isComplete)

        // toggle the completed property
        // remove from current array
        // unshift into other array

        if (Boolean(isComplete)) {

                this.state.completedListItems.map (
                    (listitem, index) => {
                        if (listitem.idlistitems === id) {
                            listitem.completed = !isComplete;       // toggle isComplete for the listitem

                            let currIncomplete = this.state.incompleteListItems;   // get current state
                            let updatedIncomplete = [listitem, ...currIncomplete];  // add toggled task to incomplete
                            this.setState({incompleteListItems: updatedIncomplete});    // update state

                            let updatedComplete = this.state.completedListItems;  // remove the listitem from the complete arr
                            updatedComplete.splice(index, 1)
                            this.setState({completedListItems: updatedComplete})
                        }
                    }
                )
            
        } else {
            this.state.incompleteListItems.map (
                (listitem, index) => {
                    if (listitem.idlistitems === id) {
                        listitem.completed = !isComplete;       // toggle isComplete for the listitem

                        let currComplete = this.state.completedListItems;   // get current state
                        let updatedComplete = [listitem, ...currComplete];  // add toggled task to incomplete
                        this.setState({completedListItems: updatedComplete});    // update state

                        let updatedIncomplete = this.state.incompleteListItems;  // remove the listitem from the complete arr
                        updatedIncomplete.splice(index, 1)
                        this.setState({incompleteListItems: updatedIncomplete})
                    }
                }
            )
        }


        // update the list item to complete or incomplete
        fetch(`http://localhost:5000/toggleListItem/?idlistitems=${id}&value=${!isComplete}`, {
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

            <View style={{flex: 1, backgroundColor:'#ecf0f1'}}>
              <View style={{
                padding: 20,
              }}>

                <Header navigation={this.props.navigation} iname="chevron-left" nHandler={this.props.navigation.goBack} pHandler={this.createNewListItem}/>

                <View style={{
                    display: "flex", 
                    flexDirection: "row",
                    justifyContent: "space-between"
                    }}>
        
                    <View style={{display: "flex", flexDirection: "column"}}>
                        <Text style={{fontSize: 30}}>{this.props.route.params.list.name}</Text>
                    </View>
                    
                </View>
    
              </View>

                <View>

                    {this.state.newListItem ?
                        <View style={{borderWidth: 2, borderColor: 'red', padding: 20}}>
                            <TextInput
                            onChangeText={text => this.setListItemName(text)}/>
                            <TouchableOpacity onPress={this.submitNewListItem}><Text>Create</Text></TouchableOpacity>
                        </View>
                    : null}

                </View>

                <ScrollView style={{display: 'flex', margin: 10, alignContent: 'center', flexDirection:'column'}}>
                {this.state.incompleteListItems.map((items) => {
                    return (
                            <View key={items.idlistitems} style={{display:'flex', flexDirection:'row'}}>
                                <CheckBox 
                                    containerStyle={{backgroundColor: '#ecf0f1'}}
                                    center 
                                    title={items.title} 
                                    checked={Boolean(items.completed)}
                                    onPress={() => this.toggleCheckbox(items.idlistitems, items.completed)}
                                />
                            </View>
                
                        )
                    })
                }

                {this.state.completedListItems.map((items) => {
                    return (
                            <View key={items.idlistitems} style={{display:'flex', flexDirection:'row'}}>
                                <CheckBox 
                                    containerStyle={{backgroundColor: '#ecf0f1'}}
                                    center 
                                    title={items.title} 
                                    checked={Boolean(items.completed)}
                                    onPress={() => this.toggleCheckbox(items.idlistitems, items.completed)}
                                />
                            </View>
                
                        )
                    })
                }

                </ScrollView>

            </View>              
        )

    }


}



export default List;