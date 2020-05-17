import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SingleListScreen, SingleListEdit } from '../screens';


const Stack = createStackNavigator();

export const StackNav = () => {
    return (
            <Stack.Navigator headerMode={'none'}> 
                <Stack.Screen name="SingleList" component={SingleListScreen}/>
                <Stack.Screen name="SingleListEdit" component={SingleListEdit}/>
            </Stack.Navigator>
    );
}