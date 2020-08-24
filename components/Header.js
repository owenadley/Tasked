import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


// PROPS:
// lName: icon name for top left
// lHandler: onClick method for top left
// rName: icon name for top right
// rHandler: onClick method for top right
// title: title for the current screen
// listToggle: boolean for displaying the list toggle button (only used on home screen)

function Header(props) {

    return (

        <View style={{padding: 20, marginBottom:20}}>

            <View style={{
                marginBottom: 20, 
                display: "flex", 
                flexDirection: "row",
                justifyContent: "space-between"}}>

                <TouchableOpacity onPress={props.lHandler}>
                    <Icon name={props.lName} size={30} color='#000'/>
                </TouchableOpacity>
                
                {props.midContent ?

                    <Text style={{fontSize:20}}>{props.midContent}</Text>

                :
                    <></>
                }

                {props.rHandler ?
                    <TouchableOpacity style={{

                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}
                    onPress={props.rHandler}>

                        <Icon name={props.rName} size={30} color='#000'/>

                    </TouchableOpacity>
                :
                    <></>
                }

                {props.toggleView ?
                    
                    <View style={{width: 200, flexDirection:'row', borderWidth: 2, borderRadius: 5, borderColor: '#44bd32', alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity onPress={() => props.toggleView(true)} style={props.selectedView ? styles.selected : styles.notSelected}>
                            <Text style={props.selectedView ? {color:'#fff'} : {color:'#000'}}>Lists</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.toggleView(false)} style={!props.selectedView ? styles.selected : styles.notSelected}>
                            <Text style={props.selectedView ? {color:'#000'} : {color:'#fff'}}>Daily</Text>
                        </TouchableOpacity>                        
                    </View>


                :
                    <></>
                }


            </View>

            <View style={{display: "flex"}}>
                <Text style={{fontFamily: 'Alata-Regular', fontSize: 30}}>{props.title}</Text>
            </View>

        </View>

    )

}

const styles = StyleSheet.create({
    selected: {
        backgroundColor:'#44bd32', alignItems:'center',flex: 1, padding:10
    },
    notSelected: {
        alignItems:'center',flex: 1, padding:10
    }
})

export default Header;