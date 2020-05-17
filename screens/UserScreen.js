import React, { useState } from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

import {useDispatch} from 'react-redux';

import { CustomBtn } from '../components/CustomBtn';
import { newUser } from '../store/actions';


export const UserScreen = ({navigation}) => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [url, setUrl] = useState("");

    const setNewUser = () => {
      if (username.trim() === "" || url.trim() === "") {
        return;
      } 
      else {
        const data = {
          isSet: true,
          username: username,
          url: url,
        }
        dispatch(newUser(data));
        setUsername("");
        setUrl("");
        navigation.navigate('OneTime');
      }
      
    };
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>User Settings</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.inputLabel}>username</Text>
            <TextInput style={styles.input} placeholder={'username'} onChangeText={(text) => setUsername(text)} value={`${username}`}/>
            <Text style={styles.inputLabel}>url</Text>
            <TextInput style={styles.input} placeholder={'http://www.image.com/image321.png'} onChangeText={(text) => setUrl(text)} value={`${url}`}/>
            <CustomBtn
            onPress={setNewUser}
            title="Save Changes"
            style={styles.saveBtn}
            color={'white'}
            fontWeight={"bold"}
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
  }
});