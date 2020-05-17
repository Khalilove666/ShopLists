import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Alert, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteList, restoreAll} from '../store/actions';

import { Burger, ListItem } from '../components';
import AsyncStorage from '@react-native-community/async-storage';

export const OneTimeScreen = ({navigation}) => {

  const all = useSelector(state => state.listReducer);
  const DATA = all.lists.filter(item => item.listType == "ONE_TIME");

  const dispatch = useDispatch();
  const deleteItem = (id) => {
    const data = {
      id: id,
    }
    dispatch(deleteList(data));
  };
  const deleteAlert = (id) =>
    Alert.alert(
        "Alert!",
        "Are you sure you want to remove this list?",
        [
            {
            text: "Cancel",
            onPress: () => console.log("cancelled"),
            style: "cancel"
            },
            { text: "OK", onPress: () => deleteItem(id) }
        ],
        { cancelable: true }
    );

    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('shopInfo')
        if(jsonValue != null ){
          dispatch(restoreAll(JSON.parse(jsonValue)));
        }
      } catch(e) {
          console.log(e);
      }
    }
    useEffect(() => {
      getData();
    } ,[]);

    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>One Time Lists</Text>
            <Burger onPress={() => navigation.openDrawer()}/>
          </View>
          <View style={styles.body}>
              <View style={styles.listWrapper}>
                <FlatList
                style={styles.flatList}
                data={DATA}
                renderItem={({item}) => (
                  <ListItem item={item}
                  onPress={() => navigation.navigate('StackNav', { screen: 'SingleList', params: {item}})}
                  onLongPress={() => deleteAlert(item.id)}/>
                )}
                keyExtractor={item => item.id}
                />
              </View>
          </View>
      </View>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FF7676",
  },
  header: {
    height: 70,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  headerTxt: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    fontWeight: "bold",
    color: "white",
  },
  body: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    overflow: "hidden",
  },
  listWrapper: {
    width: "90%", 
  }
});