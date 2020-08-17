import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';

import { AuthContext } from './context'
import Button from './Button';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// sign in component
// input: email, password
// if match, navigate to home and save user data to redux store
// if no match, give error message
function Register(props) {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [fname, setFname] = useState('');

    const { signUp } = useContext(AuthContext)

    const attemptRegister = () => {
        signUp(fname, email, pwd);
    }


    return (
        <View style={{flex:1, backgroundColor: '#ecf0f1', padding: 20, flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
            <Text style={{fontSize: 40, fontFamily:'Alata-Regular'}}>Register</Text>
           
           <View style={{}}>

                <View style={{ backgroundColor:'#fff', width: Dimensions.get('window').width - 50, padding: 20, paddingBottom: 0, borderRadius: 10, alignItems:'center'}}>
                    <Input  
                        placeholder="First Name" 
                        leftIcon={<Icon name='envelope' size={20} color='#44bd32'/>}
                        errorStyle={{ color: 'red' }} 
                        errorMessage=''
                        onChangeText={value => setFname(value)}/>
                </View>

                <View style={{ backgroundColor:'#fff', width: Dimensions.get('window').width - 50, padding: 20, paddingBottom: 0, borderRadius: 10, alignItems:'center'}}>
                    <Input  
                        placeholder="Your Email" 
                        leftIcon={<Icon name='envelope' size={20} color='#44bd32'/>}
                        errorStyle={{ color: 'red' }} 
                        errorMessage=''
                        onChangeText={value => setEmail(value)}/>
                </View>


                <View style={{ marginTop: 30, backgroundColor:'#fff', width: Dimensions.get('window').width - 50, padding: 10, paddingBottom: 0, borderRadius: 10, alignItems:'center'}}>
                    <Input 
                        placeholder="Password" 
                        leftIcon={<Icon name='lock' size={20} color='#44bd32'/>}
                        secureTextEntry={true}
                        onChangeText={value => setPwd(value)}/>           
                </View>
            </View>

            <View>
                <Button clickHandler={attemptRegister} title='Register'/>   
            </View>

        </View>
    )

}

export default Register