/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,

} from 'react-native';




class ListPreview extends React.Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        return (

                <View 
                    style={{ 
                        borderWidth: 2,
                        borderColor: '#000',
                        borderRadius: 5,
                        padding: 40,
                        margin: 10
                    }}
                    >
                    
                    <Text style={{fontSize: 18}}>{this.props.name}</Text>
                </View>
     

        )
    }
}

export default ListPreview;