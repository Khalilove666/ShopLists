import React, { Component } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

class StaticItem extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        
        return (
            <View style={{...styles.container, opacity: this.props.item.bought ? 0.4 : 1}}>
                <TouchableNativeFeedback style={styles.touchable} onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
                        <Text style={styles.name}>{this.props.item.productName}</Text>
                        <Text style={styles.amount}>x{this.props.item.amount} {this.props.item.unit}</Text>
                </TouchableNativeFeedback>
            </View>
        );
        
    };
};

export {StaticItem};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        overflow: "hidden",
        marginTop: 15,
        borderRadius: 27,
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
    },
    name: {
        color: "#303234",
        fontSize: 14,
        marginLeft: 27,
        fontWeight: "500",
        fontFamily: "Montserrat-Regular",
        paddingVertical: 5,
    },
    amount: {
        color: "#303234",
        fontSize: 14,
        marginRight: 27,
        fontWeight: "500",
        fontFamily: "Montserrat-Regular",
        paddingVertical: 5,
    }
});



// import React from 'react';
// import {StyleSheet, View, Text} from 'react-native';
// import { TouchableNativeFeedback } from 'react-native-gesture-handler';

// export const StaticItem = ({item, onPress, onLongPress}) => {

//     return (
//         <View style={{...styles.container, opacity: item.bought ? 0.4 : 1}}>
//             <TouchableNativeFeedback style={styles.touchable} onPress={onPress} onLongPress={onLongPress}>
//                     <Text style={styles.name}>{item.productName}</Text>
//                     <Text style={styles.amount}>x{item.amount} {item.unit}</Text>
//             </TouchableNativeFeedback>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         width: "100%",
//         overflow: "hidden",
//         marginTop: 15,
//         borderRadius: 27,
//     },
//     touchable: {
//         flex: 0,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         width: "100%",
//         borderColor: "#FFE194",
//         borderWidth: 2,
//         borderRadius: 27,     
//     },
//     name: {
//         color: "#303234",
//         fontSize: 14,
//         marginLeft: 27,
//     },
//     amount: {
//         color: "#303234",
//         fontSize: 14,
//         marginRight: 27,
//     }
// });