import React, { useEffect, useContext, useState } from 'react';
import { View } from 'react-native';
import Header from './Header';
import {AuthContext} from './context';
import NewListItem  from "./NewListItem";
import DraggableFlatList from 'react-native-draggable-flatlist';
import ListItem from './ListItem';

function DailyPlanner(props) {

    const userToken = useContext(AuthContext);  // retrieve the current user from AuthContext
    const user = userToken.userTok;

    const [dailyListItems, setDailyListItems] = useState({})

    const postSettings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    useEffect(() => {
        getDailyListItems();
    }, []); 


    const getDailyListItems = async () => {
        try {
            const data = await fetch(`http://localhost:5000/getDailyListItems/?idusers=${user.idusers}`)
            const res = await data.json();  // use this to handle success or failure messgaes
           
            let items = [...res.scheduledlistitems];

            sortSetListItems(items);
            
        } catch (e) {
            console.log(e)
        }     
    }

    const toggleCheckbox = async (id, completed) => {

        try {
            let items = [...dailyListItems];
            items.map((item) => {
                if (item.idlistitems == id) {
                    item.completed = !item.completed
                }
            })

            sortSetListItems(items)

            // toggle the complete status to server
            const data = await fetch(`http://localhost:5000/toggleListItem/?idlistitems=${id}&value=${!completed}`, postSettings);
            const res = await data.json();

        } catch(e) {
            console.log(e)
        }
    }

    const sortSetListItems = (items) => {
        items.sort(function(a,b) {
            return a.completed-b.completed
        })
        setDailyListItems(items);
    }    


    const renderItem = ({item, index, drag, isActive}) => {
     
        return (

             <ListItem 
                item={item}
                drag={drag}
                toggleCheckbox={toggleCheckbox}

            />
        )
    }

    return (
        <View style={{flex:1, backgroundColor:'#ecf0f1', padding:20}}>
            <Header 
                navigation={props.navigation} 
                lName="chevron-left" 
                lHandler={props.navigation.goBack}
                title={"Daily Tasks"}
            />
                
            <NewListItem getListItems={getDailyListItems} />
   
            <View style={{flex:1}}>
{/*                 <Text style={{fontFamily: 'Alata-Regular', fontSize:20, marginBottom:20, flex:1}}>Today</Text>
 */}
                {dailyListItems.length > 0  ?

                <DraggableFlatList 
                    data={dailyListItems} 
                    renderItem={renderItem} 
                    onDragEnd={({data}) => setDailyListItems(data)} 
                    keyExtractor={(item, index) => `${item.idlistitems}`} />

                : 
                    <></>
                }
                
            </View>
            
        </View>
    )

}

export default DailyPlanner