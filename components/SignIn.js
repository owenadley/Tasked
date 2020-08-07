import React from 'react';
import {
  View,
  Text
} from 'react-native';

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// sign in component
// input: email, password
// if match, navigate to home and save user data to redux store
// if no match, give error message
function SignIn() {

    return (
        <>
        <Text>Tasked</Text>
        <Input 
            placeholder="Your Email" 
            leftIcon={<Icon name='envelope' size={20} color='black'  errorStyle={{ color: 'red' }} errorMessage='lol error'/>

        }/>
        <Input 
            placeholder="Password" 
            leftIcon={<Icon name='lock' size={20} color='black' secureTextEntry={true}/>

        }/>        
        </>
    )

}

export default SignIn