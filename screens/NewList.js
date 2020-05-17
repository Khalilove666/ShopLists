import React, { useReducer, useState } from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

import {useDispatch} from 'react-redux';
import { createList } from '../store/actions';

import { CustomBtn } from '../components/CustomBtn';


export const NewList = ({navigation}) => {
  
  const dispatch = useDispatch();

  const [listName, setListName] = useState("");
  const [listType, setListType] = useState("ONE_TIME");

  const createNewList = () => {
    if (listName.trim() === "") {
      return;
    } 
    else {
      const data = {
        listName: listName,
        listType: listType,
      }
      
      dispatch(createList(data));
      if (listType === "ONE_TIME") {
        navigation.navigate('OneTime');
      }
      else {
        navigation.navigate('Regular');
      }
      setListName("");
      setListType("ONE_TIME");
    }
  }

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>New List</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.inputLabel}>list name</Text>
            <TextInput style={styles.input} placeholder={'List name'} onChangeText={(text) => setListName(text)} value={`${listName}`}/>
            <View style={styles.typeContainer}>
                <CustomBtn style={styles.oneTime} 
                          color={'#303234'}
                          title={'one time'}
                          fontWeight={listType==="ONE_TIME" ? "bold" : "normal"}
                          onPress={() => {setListType("ONE_TIME")}}
                />
                <CustomBtn style={styles.regular}
                          color={'#303234'}
                          title={'regular'}
                          fontWeight={listType==="REGULAR" ? "bold" : "normal"}
                          onPress={() => {setListType("REGULAR")}}
                />
            </View>
            <CustomBtn
                    onPress={createNewList}
                    title="Create List"
                    style={styles.saveBtn}
                    color={'white'}
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
            />
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
  },
  inputLabel: {
    marginTop: 9,
    marginBottom: 8,
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    fontWeight: "600",
    color: "#303234",
    opacity: 0.75,
  },
  input: {
    backgroundColor: "#EEEEEE",
    borderRadius: 45,
    width: "90%",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    padding: 8,
  },
  saveBtn: {
    width: "90%",
    backgroundColor: "#FF7676",
    marginTop: 15,
  },
  typeContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 15,
  },
  oneTime: {
    backgroundColor: "#EEEEEE",
    width: "45%",
  },
  regular: {
    backgroundColor: "#EEEEEE",
    width: "45%",
  },
});