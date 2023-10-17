import React, { FC } from "react";
import {createStackNavigator} from '@react-navigation/stack'
import {Home} from '../screens'
import {Profile} from '../screens'
import {Requests} from '../screens'

const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name = "Home" component={Home}/>
            <Screen name = "Profile" component={Profile}/>
            <Screen name = 'Requests' component={Requests}/>
        </Navigator>
    )
}

export default AppStack;