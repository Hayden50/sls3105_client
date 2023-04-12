import React, { FC } from "react";
import {createStackNavigator} from '@react-navigation/stack'
import {SignUp, Login, Home} from '../screens'

const {Navigator, Screen} = createStackNavigator();

/*
Home screen should not actually be here long term
Just put it here temporarily becuase app is simple and
I don't have access to database stuff yet
*/

const AuthStack : FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name = "signup" component={SignUp}/>
            <Screen name = "login" component={Login}/>
            <Screen name = 'home' component={Home}/>
        </Navigator>
    )
}

export default AuthStack;