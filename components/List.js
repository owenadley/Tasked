
import React, {useContext} from 'react';
import {

  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Header';
import {AuthContext} from './context';
import ButtonAdd from './ButtonAdd';

class List extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            completedListItems: [],
            incompleteListItems: [],
            newListItem: false,
            newListItemName: '',
            user: 'user',
            listName: props.route.params.list.name
        }
    }

    componentDidMount() {
        this.getListItems();
    }

    
    getListItems = () => {
        fetch(`http://localhost:5000/getListItems/?idusers=${this.context.userTok.idusers}&idlists=${this.props.route.params.list.idlists}`)
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
        fetch(`http://localhost:5000/createNewListItem/?title=${this.state.newListItemName}&idusers=${this.context.userTok.idusers}&idlists=${this.props.route.params.list.idlists}`, {
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

    updateListName = (name) => {
        this.setState({listName: name})
        this.props.route.params.updateLists();
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

    listSettings = () => {
        this.props.navigation.navigate('ListSettings',  {updateLists: this.updateListName, idlists: this.props.route.params.list.idlists, name: this.props.route.params.list.name})
    }

    render() {

        return (

            <View style={{flex: 1, backgroundColor:'#ecf0f1', padding:20}}>

                <ButtonAdd btnHandler={this.createNewListItem}/>
                <Header 
                    navigation={this.props.navigation} 
                    lName="chevron-left" 
                    lHandler={this.props.navigation.goBack}
                    rName="cog"
                    rHandler={this.listSettings}
                    title={this.state.listName}
                    />

                <View>

                    {this.state.newListItem ?
                        <View style={{flexDirection:'row', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 17, borderRadius: 10, height: 90, margin: 20}}>
                            <View style={{flex:3, height: 90, padding: 20}}>                        
                                <TextInput style={{}}
                                placeholder='Task name ... '
                                onChangeText={text => this.setListItemName(text)}/>          
                            </View>
                            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', height: 90, backgroundColor:'#44bd32', borderTopRightRadius: 10, borderBottomRightRadius: 10, elevation: 17}}> 
                                <TouchableOpacity onPress={this.submitNewListItem}><Text style={{color: '#fff'}}>Create</Text></TouchableOpacity>
                            </View>
                        </View>
                    : null}

                </View>

                {this.state.incompleteListItems.length > 0 || this.state.completedListItems.length > 0 ?
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
                                        checkedColor='#44bd32'
                                        textStyle={{textDecorationLine:'line-through', color:'grey'}}
                                        checked={Boolean(items.completed)}
                                        onPress={() => this.toggleCheckbox(items.idlistitems, items.completed)}
                                    />
                                </View>
                    
                            )
                        })
                    }

                    </ScrollView>
                
                :
                
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>No list items</Text></View>
                    
                }

            </View>              
        )

    }


}



export default List;