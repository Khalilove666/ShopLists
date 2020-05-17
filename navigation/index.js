import React from "react";
import { NavigationContainer } from '@react-navigation/native'; 
import { createDrawerNavigator } from '@react-navigation/drawer';

import {UserScreen, RegularListScreen, OneTimeScreen, NewList} from '../screens';
import {CustomDrawer} from "../commons/CustomDrawer";
import {StackNav} from './StackNav';

const Drawer = createDrawerNavigator();

export const RootNav = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props}/>} initialRouteName="OneTime"> 
                <Drawer.Screen name="Regular" component={RegularListScreen} />
                <Drawer.Screen name="User" component={UserScreen} />
                <Drawer.Screen name="OneTime" component={OneTimeScreen} />
                <Drawer.Screen name="NewList" component={NewList} />
                <Drawer.Screen name="StackNav" component={StackNav}  options={{ swipeEnabled: false }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};