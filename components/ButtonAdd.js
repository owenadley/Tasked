import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ButtonAdd(props) {


    return (

        <View style={{marginLeft:20, marginRight: 20}}>
            <TouchableOpacity style={{
                zIndex:1,
                height: 40,
                width: 40,
                elevation: 15,
                borderRadius: 35,
                backgroundColor: '#44bd32',
                justifyContent: 'center',
                alignItems: 'center'
                }}
                onPress={props.btnHandler}>

                    <Icon name='plus' size={20} color='white'/>

            </TouchableOpacity>
        </View>

    )

}

export default ButtonAdd