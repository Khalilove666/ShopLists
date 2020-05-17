import React from 'react';
import {StyleSheet, View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';


import {useDispatch, useSelector} from 'react-redux';
import {toggleBought, resetBought} from '../store/actions';

import { StaticItem, CustomBtn } from '../components';

export const SingleListScreen = ({route, navigation}) => {
  const all = useSelector(state => state.listReducer);
  const dispatch = useDispatch();

  const item = route.params.item;
  const listIndex = all.lists.findIndex(
      (item) => item.id == route.params.item.id
  );
  const DATA = all.lists[listIndex].listBody;
  const countAll = DATA.length;
  const countBought = DATA.filter(item => item.bought === true).length;



  const changeBought = (id) => {
    const data = {
      id: route.params.item.id,
      productId: id,
    }
    dispatch(toggleBought(data));
  };
  const setAllNotBought = () => {
    const data = {
      id: route.params.item.id,
    }
    dispatch(resetBought(data));
  };

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.dispatch(CommonActions.goBack())}>
              <IonIcon name={'ios-arrow-round-back'} color={'white'} size={35}/>
            </TouchableOpacity>
            <Text style={styles.headerTxt}>{route.params.item.listName}</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('StackNav', { screen: 'SingleListEdit', params: { item } })}} style={styles.editButton}>
              <Icon name={'create'} color={'white'} size={25}/>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.listWrapper}>
              <View style={styles.resetHolder}>
                {
                  item.listType==="REGULAR" ? 
                  <CustomBtn  title={'reset'} color={'white'}
                              fontWeight={'bold'}
                              fontSize={10}
                              textTransform={'uppercase'}
                              style={styles.reset}
                              onPress={setAllNotBought}/> : null
                }
                
                <Text style={styles.boughtRatio}>{countBought}/{countAll}</Text>
              </View>
              <FlatList
                style={styles.flatList}
                data={DATA}
                renderItem={({item}) => (
                  <StaticItem item={item} onLongPress={() => changeBought(item.id)}/>
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
    backBtn: {
      position: "absolute",
      left: 16,
    },
    editButton: {
      position: "absolute",
      right: 16,
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
    resetHolder: {
      width: "100%",
      flex: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      // justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 11,
      marginBottom: 11,
    },
    reset: {
      width: "17%",
      height: 19,
      backgroundColor: "#FF7676",
    },
    listWrapper: {
      width: "90%",
    }
});