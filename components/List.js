
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

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listitems: [],
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
            this.setState({listitems: responseJson.listitems})
            console.log(responseJson.listitems)
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

    getCheckedTask = (id) => {

        return Boolean(this.state.listitems.find( ({ idlistitems }) => idlistitems === id).completed);

    }

    toggleCheckbox = (id) => {

        let isComplete = this.getCheckedTask(id);
        this.setState(prevState => ({
            listitems: prevState.listitems.map (
                listitem => listitem.idlistitems === id ? {...listitem, completed: !isComplete} : listitem
            )
        }))

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
                    <Text style={{fontSize: 30}}>{this.props.route.params.list.name}</Text>
                    </View>
                    
                    <TouchableOpacity style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    backgroundColor: '#44bd32',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}
                    onPress={this.createNewListItem}>
        
                    <Icon name='plus' size={40} color='white'/>
        
                    </TouchableOpacity>
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

                <ScrollView style={{display: 'flex', marginLeft: 50, alignContent: 'center', flexDirection:'column'}}>
                {this.state.listitems.map((items) => {
                    return (
                            <View key={items.idlistitems} style={{display:'flex', flexDirection:'row'}}>
                                <CheckBox 
                                    center 
                                    title={items.title} 
                                    checked={this.getCheckedTask(items.idlistitems)}
                                    onPress={() => this.toggleCheckbox(items.idlistitems)}
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