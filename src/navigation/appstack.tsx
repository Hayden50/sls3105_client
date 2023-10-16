import React, { FC } from "react";
import {createStackNavigator} from '@react-navigation/stack'
import {Home, Requests} from '../screens'

import {Home} from '../screens'
import {Profile} from '../screens'

const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name = "Home" component={Home}/>
            <Screen name = "Request" component={Requests}/>
            <Screen name = "Profile" component={Profile}/>
        </Navigator>
    )
}

export default AppStack;