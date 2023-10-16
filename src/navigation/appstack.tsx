import React, { FC } from "react";
import {createStackNavigator} from '@react-navigation/stack'
import {Home, Request} from '../screens'

const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name = "Home" component={Home}/>
            <Screen name = "Request" component={Request}/>
        </Navigator>
    )
}

export default AppStack;