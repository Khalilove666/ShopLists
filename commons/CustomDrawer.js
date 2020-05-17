import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import { newUser } from '../store/actions';

import { CustomBtn } from '../components/CustomBtn';

export const CustomDrawer = ({navigation}) => {

    const user = useSelector(state => state.userReducer);

    const dispatch = useDispatch();

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('userInfo')
          if(jsonValue != null ){
            dispatch(newUser(JSON.parse(jsonValue)));
          }
        } catch(e) {
            console.log(e);
        }
      }
      useEffect(() => {
        getData();
      } ,[]);

    return (
        <View style={styles.drawerHolder}>
            <View style={styles.profileHolder}>
                <Image style={styles.profileImg} source={user.isSet ? {uri:`${user.url}`}: require('../assets/avatar.png')}/>
                <Text style={styles.profileTxt}>{user.username}</Text>
            </View>
            <View style={styles.drawerList}>
                <CustomBtn  title="Add New List"
                            onPress={() => navigation.navigate('NewList')}
                            style={{...styles.listItems, marginTop: 16}}
                            color="#FF7676"
                            fontWeight={'bold'}
                            textTransform={'uppercase'}/>
                <CustomBtn  title="One Time Lists"
                            onPress={() => navigation.navigate('OneTime')}
                            style={{...styles.listItems, marginTop: 32}}
                            color="#FF7676"
                            fontWeight={'bold'}
                            textTransform={'uppercase'}/>
                <CustomBtn  title="Regular Lists"
                            onPress={() => navigation.navigate('Regular')}
                            style={styles.listItems}
                            color="#FF7676"
                            fontWeight={'bold'}
                            textTransform={'uppercase'}/>
                <CustomBtn  title="User Settings"
                            onPress={() => navigation.navigate('User')}
                            style={styles.listItems}
                            color="#FF7676"
                            fontWeight={'bold'}
                            textTransform={'uppercase'}/>
            </View>
        </View>
    );
};


const styles = StyleSheet.create(
    {
        drawerHolder: {
            display: "flex",
        },
        profileHolder: {
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: 70,
        },
        profileImg: {
            width: 50,
            height: 50,
            borderWidth: 3,
            borderRadius: 30,
            borderColor: "#FF7676",
            backgroundColor: "white",
            marginRight: 22,
        },
        profileTxt: {
            fontSize: 24,
            fontFamily: "Montserrat-Regular",
            color: "#303234",
            marginRight: 15,
        },
        drawerList: {
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FF7676",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: "100%",
            height: "100%",
        },
        listItems: {
            backgroundColor: "white",
            marginTop: 10,
            width: "90%"
        },
    }
)