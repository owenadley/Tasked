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
// midContent: Text content for middle
// title: title for the current screen

function Header(props) {

    return (

        <View style={{}}>

            <View style={{
                marginBottom: 20, 
                display: "flex", 
                flexDirection: "row",
                justifyContent: "space-between"}}>

                {props.isHome ?
                    <Text style={{fontFamily: 'Alata-Regular', fontSize: 30}}>{props.title}</Text>
                :
                
                    props.lHandler ?

                        <TouchableOpacity style={{marginRight:'auto'}} onPress={props.lHandler}>
                            <Icon name={props.lName} size={30} color='#000'/>
                        </TouchableOpacity>

                    : <></>

                }

                {props.midContent ?

                    <View style={{}}>
                        <Text style={{fontSize:20}}>{props.midContent}</Text>
                    </View>

                :
                    <></>
                }

                {props.rHandler ?
                    <TouchableOpacity style={{marginLeft:'auto'}} onPress={props.rHandler}>
                        <Icon name={props.rName} size={30} color='#000'/>

                    </TouchableOpacity>
                :
                    <></>
                }


            </View>

            {!props.isHome ?
                <View style={{display: "flex", marginBottom:10}}>
                    <Text style={{fontFamily: 'Alata-Regular', fontSize: 30}}>{props.title}</Text>
                </View>
            :<></>
            }

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