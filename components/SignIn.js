import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

import { AuthContext } from './context'

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// sign in component
// input: email, password
// if match, navigate to home and save user data to redux store
// if no match, give error message
function SignIn() {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const { signIn } = useContext(AuthContext)

    const attemptSignIn = () => {
        signIn(email, pwd);
    }

    return (
        <>
            <Text>Tasked</Text>
            <Input 
                placeholder="Your Email" 
                leftIcon={<Icon name='envelope' size={20} color='black'/>}
                errorStyle={{ color: 'red' }} 
                errorMessage='lol error'
                onChangeText={value => setEmail(value)}/>

            
            <Input 
                placeholder="Password" 
                leftIcon={<Icon name='lock' size={20} color='black'/>}
                secureTextEntry={true}
                onChangeText={value => setPwd(value)}/>

            
            <Button onPress={attemptSignIn} title="Sign In" />     
        </>
    )

}

export default SignIn