import React, { FC } from "react";
import {createStackNavigator} from '@react-navigation/stack'
import {Home, Requests} from '../screens'

const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name = "Home" component={Home}/>
            <Screen name = "Request" component={Requests}/>
        </Navigator>
    )
}

export default AppStack;