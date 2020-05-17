import React from 'react';
import {StyleSheet, View, Text,} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


export const ListItem = ({item, onPress, onLongPress}) => {


    const countAll = item.listBody.length;
    const countBought = item.listBody.filter(item => item.bought === true).length;
    const percent = (countBought/countAll)*100;
    let completed = false;
    if(item.listType==="ONE_TIME") {
        if(countAll === 0) {
            completed = false;
        } else if (countAll > countBought) {
            completed = false;
        } else {
            completed = true;
        }
    } else {
        completed = false;
    }

    return (
        <View style={{...styles.container, opacity: completed ? 0.4 : 1 }}>
            <TouchableNativeFeedback style={styles.touchable} onPress={onPress} onLongPress={onLongPress}>
                <View style={styles.listInfo}>
                    <Text style={styles.listTxt}>{item.listName}</Text>
                    <Text style={styles.listTxt}>{countBought}/{countAll}</Text>
                </View>
                <View style={styles.cylinderOut}>
                    <View style={{...styles.cylinder, width: `${percent}%`}}></View>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: "#FFE194",
        borderWidth: 2,
        borderRadius: 10,
        width: "100%",
        marginTop: 16,
        overflow: "hidden",
    },
    touchable: {
        flex: 0,
        alignItems: "center",
        width: "100%",
    },
    listInfo: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 11,
    },
    listTxt: {
        fontFamily: "Montserrat-Medium",
        fontWeight: "600",
        fontSize: 18,
        color: "#303234",
    },
    cylinderOut: {
        backgroundColor: "#EEEEEE",
        borderRadius: 20,
        width: "95%",
        height: 20,
        marginTop: 11,
        marginBottom: 11,
    },
    cylinder: {
        backgroundColor: "#FFD976",
        borderRadius: 20,
        height: 20,
    }
})