import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';


export const EditItem = ({item, onEditPress, onDeletePress}) => {


    return (
        <View style={styles.container}>
            <View style={styles.touchable}>
                <TouchableOpacity style={styles.penBtn} onPress={onEditPress}>
                    <Icon name={'create'} color={'white'} size={25}/>
                </TouchableOpacity>
                <View style={styles.dataHolder}>
                    <Text style={styles.productTxt}>{item.productName}</Text>
                    <Text style={styles.productTxt}>x{item.amount} {item.unit}</Text>
                </View>
                <TouchableOpacity style={styles.crossBtn} onPress={onDeletePress}>
                    <IonIcon name={'ios-close'} color={'white'} size={35}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 16,
    },
    touchable: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderColor: "#FFE194",
        borderWidth: 2,
        borderRadius: 27,
        marginTop: 15,
    },
    dataHolder: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "70%",
    },
    productTxt: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "500",
        fontSize: 14,
        color: "#303234",
    },
    penBtn: {
        backgroundColor: "#FFD976",
        width: 40,
        height: 40,
        borderRadius: 35,
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        transform: [{ scaleX: 1.1 }, {scaleY: 1.1}],
    },
    crossBtn: {
        backgroundColor: "#FF7676",
        width: 40,
        height: 40,
        borderRadius: 35,
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        transform: [{ scaleX: 1.1 }, {scaleY: 1.1}],
    },
});