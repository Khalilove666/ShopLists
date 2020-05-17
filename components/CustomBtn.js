import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';



export const CustomBtn = ({title, onPress, style, color, fontWeight, fontSize, textTransform, ...rest}) => {
    return (
        <View style={[styles.container, style]}>
          <TouchableNativeFeedback onPress={onPress} {...rest}>
            <View style={styles.btn}>
              <Text style={{...styles.title, color: color, fontWeight: fontWeight, fontSize: fontSize, textTransform: textTransform}} >
                {title}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
    );
};
const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: 50,
          },
          btn: {
            width: "100%",
            padding: 10,
            alignItems: "center",
          },
          title: {
            textAlign: "center",
            fontFamily: "Montserrat-Regular",
          },
    }
)
