import React from 'react';
import {StyleSheet, View, Text, Alert, FlatList,} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteList} from '../store/actions';
import { ListItem, Burger } from '../components';

export const RegularListScreen = ({navigation}) => {

  const all = useSelector(state => state.listReducer);
  const DATA = all.lists.filter(item => item.listType == "REGULAR");


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

    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>Regular Lists</Text>
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
  burger: {
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
  listWrapper: {
    width: "90%", 
  },
});