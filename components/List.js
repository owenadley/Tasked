
import React from 'react';
import {

  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated

} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Header';
import {AuthContext} from './context';
import EditField from './EditField';
import NewListItem from './NewListItem';

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
            listName: props.route.params.list.name,
            selectedListItem: null,
            slideAnim: new Animated.Value(0)
        }
    }

    componentDidMount() {
        this.getListItems();
    }

    getListItems = () => {  // fetch the list items for a specific list and save it to state
        fetch(`http://localhost:5000/getListItems/?idusers=${this.context.userTok.idusers}&idlists=${this.props.route.params.list.idlists}`)
        .then((response) => response.json())
        .then((responseJson) => {

            let completedListItems = [];
            let incompleteListItems = [];

            responseJson.listitems.forEach((listitem) => {
                listitem.completed ? completedListItems.unshift(listitem) : incompleteListItems.push(listitem)
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

    updateList = (name) => {    // if we change any data regarding the list, we need to refresh them
        name ? this.setState({listName: name}) : null
        this.props.route.params.updateLists();  // from Home.js, re-fetch the lists since one is updated
    }

    toggleCheckbox = (id, isComplete) => {

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

    listSettings = () => {  // navigate to list settings screen
        this.props.navigation.navigate('ListSettings',  
            {   updateList: this.updateList, 
                idlists: this.props.route.params.list.idlists, 
                name: this.props.route.params.list.name
            })
    }

    selectListItem = (item) => {

        this.setState({selectedListItem:item});

        Animated.timing(
            // Uses easing functions
            this.state.slideAnim, // The value to drive
            { 
                toValue: -(Dimensions.get('window').height),
                duration:700,
                useNativeDriver:true 
            } // Configuration

          ).start(); // Don't forget start!

    }

    closeListItemDrawer = () => { 
        Animated.timing(
            // Uses easing functions
            this.state.slideAnim, // The value to drive
            { 
                toValue: 0, 
                duration:700,
                useNativeDriver:true 
            } // Configuration

          ).start(); // Don't forget start!
    }

    deleteListItem = () => {
        // delete the list item that was most recently set
        const { idlistitems } = this.state.selectedListItem;

        console.log('here in delete')

        // delete the selected list item
        fetch(`http://localhost:5000/deleteListItem/?idlistitems=${idlistitems}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(

            console.log('the delete is finished'),

            // update the list items
            this.getListItems(),
            // close the drawer for the deleted item
            this.closeListItemDrawer()
        )
        .catch((error) => {
          console.log(error);
        })
    }

    updateListItem = (name) => {
        const { idlistitems } = this.state.selectedListItem;

        fetch(`http://localhost:5000/updateListItem/?idlistitems=${idlistitems}&title=${name}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(
            this.getListItems()
        )
        .catch((error) => {
            console.log(error);
        }) 
    }

    render() {

        return (

            <View style={{flex: 1, backgroundColor:'#ecf0f1'}}>

                <NewListItem updateList={this.getListItems} idlists={this.props.route.params.list.idlists} />

                <Header 
                    navigation={this.props.navigation} 
                    lName="chevron-left" 
                    lHandler={this.props.navigation.goBack}
                    rName="cog"
                    rHandler={this.listSettings}
                    midContent={`${this.state.completedListItems.length} / ${this.state.incompleteListItems.length + this.state.completedListItems.length}`}
                    title={this.state.listName}/>


                {this.state.incompleteListItems.length > 0 || this.state.completedListItems.length > 0 ?
                <>
                    <ScrollView style={{display: 'flex', margin: 10, alignContent: 'center', flexDirection:'column'}}>
                    {this.state.incompleteListItems.map((items) => {
                        return (
                                <View 
                                    key={items.idlistitems} 
                                    style={{
                                        display:'flex', 
                                        flexDirection:'row', 
                                        backgroundColor:'#fff',
                                        elevation: 5,
                                        margin:13,
                                        borderRadius:10,
                                        alignItems:'center'
                                    }}>

                                    <CheckBox 
                                        containerStyle={{backgroundColor: '#fff'}}
                                        center 
                                        title={items.title} 
                                        checked={Boolean(items.completed)}
                                        onPress={() => this.toggleCheckbox(items.idlistitems, items.completed)}
                                    />
                                    <TouchableOpacity style={{marginLeft:'auto'}} onPress={() => this.selectListItem(items)}><Icon style={{marginRight:20}} name="ellipsis-h" size={25}/></TouchableOpacity>
                                </View>
                    
                            )
                        })
                    }

                    {this.state.completedListItems.map((items) => {
                        return (
                                <View key={items.idlistitems}                                     
                                style={{
                                    display:'flex', 
                                    flexDirection:'row', 
                                    backgroundColor:'#fff',
                                    elevation: 5,
                                    margin:13,
                                    borderRadius:10,
                                    alignItems:'center'
                                }}>
                                    <CheckBox 
                                        containerStyle={{backgroundColor: '#fff'}}
                                        center 
                                        title={items.title} 
                                        checkedColor='#44bd32'
                                        textStyle={{textDecorationLine:'line-through', color:'grey'}}
                                        checked={Boolean(items.completed)}
                                        onPress={() => this.toggleCheckbox(items.idlistitems, items.completed)}
                                    />
                                    <TouchableOpacity style={{marginLeft:'auto'}} onPress={() => this.selectListItem(items)}><Icon style={{marginRight:20}} name="ellipsis-h" size={25}/></TouchableOpacity>

                                </View>
                    
                            )
                        })
                    }

                    </ScrollView>

                    {this.state.selectedListItem ?
                        
                        <Animated.View style={{ 
                            zIndex:2,
                            position:'absolute', 
                            width:Dimensions.get('window').width-20, 
                            height:Dimensions.get('window').height-150,
                            translateY:this.state.slideAnim, 
                            bottom:-Dimensions.get('window').height,
                            left:10, 
                            backgroundColor:'#fff',
                            elevation:20,
                            borderTopRightRadius:30,
                            borderTopLeftRadius:30,
                            padding: 40,

                            }}>

                            <View style={{alignSelf:'flex-end', marginBottom:20, paddingBottom:20}}>
                                <TouchableOpacity onPress={this.closeListItemDrawer}>
                                    <Icon style={{}} name='chevron-down' size={25}/>
                                </TouchableOpacity>                                
                            </View>

                            <View>
                                <EditField value={this.state.selectedListItem.title} callback={this.updateListItem} />
                            </View>

                            <View style={{flex: 1, flexDirection:'column', alignItems:'center'}}>

                                    <TouchableOpacity onPress={this.deleteListItem} style={{marginTop:'auto', padding:20, borderTopWidth:1, borderBottomColor:"grey"}}>
                                        <View style={{flexDirection:'row'}}>                                     
                                            <Icon name='trash' size={25} />
                                            <Text style={{marginLeft: 10, fontSize:18}}> Delete Item</Text>
                                        </View>                                
                                   </TouchableOpacity>
                            </View>
                        </Animated.View>

                        :
 
                        <></>
                    
                    }

                </>
                :
                
                    <View style={{flex:1}}>
                        <Text>Add a list item to get started!</Text>  
                    </View>
                    
                }

            </View>              
        )
    }
}

export default List;