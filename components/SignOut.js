import React, { useContext } from 'react';
import {
    View,
    Button
  } from 'react-native';
import { AuthContext } from './context'

function SignOut() {

    const { signOut } = useContext(AuthContext);

    return (
        <View>

            <Button title="Sign out" onPress={signOut}/>

        </View>
    )

}

export default SignOut;