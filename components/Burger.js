import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import IonIcon from 'react-native-vector-icons/dist/Ionicons';

export const Burger = ({onPress}) => {

    return (
        <TouchableOpacity style={styles.burger} onPress={onPress}>
            <IonIcon name={'ios-menu'} size={40} color={'white'}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    burger: {
        position: "absolute",
        right: 16,
    },
});