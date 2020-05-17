import React, { useState } from 'react';
import {StyleSheet, View, Text, Button, Alert, FlatList, TextInput, TouchableOpacity,} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import { createProductList } from '../store/actions';

import { CustomBtn } from '../components/CustomBtn';
import { EditItem } from '../components';

export const SingleListEdit = ({route, navigation}) => {
    
    const all = useSelector(state => state.listReducer);
    const dispatch = useDispatch();
    const listIndex = all.lists.findIndex((item) => item.id == route.params.item.id);

    const [editType, setEditType] = useState('add');
    const [productName, setProductName] = useState("");
    const [amount, setAmount] = useState("0");
    const [unit, setUnit] = useState("pkg");
    const [selected, setSelected] = useState('');
    const [listBody, setListBody] = useState([...all.lists[listIndex].listBody]);
    
    const [anyChanges, setAnyChanges] = useState(false);

    const addPosition = () => {
        if (productName.trim() === "" || amount.trim()=== "" ) {
            return;
        }
        else {
            setListBody([
                ...listBody,
                {
                    id: `${Math.random()}${Date.now()}`,
                    productName: productName,
                    amount: amount,
                    unit: unit,
                    bought: false, 
                }
            ]);
            setProductName("");
            setAmount("0");
            setUnit("pkg");
            setAnyChanges(true);
        }
    };
    
    const updatePosition = () => {
        if (productName.trim() === "" || amount.trim()=== "" || amount===undefined ) {
            return;
        }
        else {
            const selectedIndex = listBody.findIndex((item) => item.id == selected);
            const updated = [...listBody];
            updated[selectedIndex] = {
                ...updated[selectedIndex],
                productName: productName,
                amount: amount,
                unit: unit,
            } ;
            setListBody([...updated]);
            setEditType("add");
            setProductName("");
            setAmount("0");
            setUnit("pkg");
            setAnyChanges(true);
        }
    };
    
    const editSpesificItem = (id) => {
        setEditType("update");
        setSelected(id);
        const selectedIndex = listBody.findIndex((item) => item.id == id);
        setProductName(listBody[selectedIndex].productName);
        setAmount(listBody[selectedIndex].amount);
        setUnit(listBody[selectedIndex].unit);


    };
    const cancelHandler = () => {
        setEditType("add");
        setProductName("");
        setAmount("0");
        setUnit("pkg");
    }
    
    const deleteSpesificItem = (id) => {
        const removableIndex = listBody.findIndex((item) => item.id == id);
        listBody.splice(removableIndex, 1);
        setListBody([...listBody]);
        setAnyChanges(true);
    };
    
    const deleteAlert = (id) =>
        Alert.alert(
            "Alert!",
            "Are you sure you want to remove this item?",
            [
                {
                text: "Cancel",
                onPress: () => console.log("cancelled"),
                style: "cancel"
                },
                { text: "OK", onPress: () => deleteSpesificItem(id) }
            ],
            { cancelable: true }
        );

    const saveChanges = () => {
        const data = {
            id: route.params.item.id,
            listBody: [...listBody],
        }
        dispatch(createProductList(data));
        navigation.dispatch(CommonActions.goBack());
    };
    const saveAlert = () =>
        Alert.alert(
            "Alert!",
            "Are you sure you want to save changes?",
            [
                {
                text: "Cancel",
                onPress: () => console.log("cancelled"),
                style: "cancel"
                },
                { text: "OK", onPress:  saveChanges, }
            ],
            { cancelable: true }
        );
    const backStackHandler = () => {
        if(anyChanges===false) {
            navigation.dispatch(CommonActions.goBack());
        } else {
            Alert.alert(
                "Alert!",
                "Discard changes and go back?",
                [
                    {
                    text: "Cancel",
                    onPress: () => console.log("cancelled"),
                    style: "cancel"
                    },
                    { text: "OK", onPress:  () => navigation.dispatch(CommonActions.goBack()) }
                ],
                { cancelable: true }
            );
        }

    }
        

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={backStackHandler}>
              <IonIcon name={'ios-arrow-round-back'} color={'white'} size={35}/>
            </TouchableOpacity>
            <Text style={styles.headerTxt}>{route.params.item.listName}</Text>
            <TouchableOpacity style={styles.saveBtn} onPress={saveAlert}>
                <IonIcon name={'ios-save'} color={'white'} size={25}/>
            </TouchableOpacity>
            
          </View>
          <View style={styles.body}>
                <View style={styles.newNameHolder}>
                    <View style={styles.positionHolder}>
                        <Text style={styles.positionTxt}>product name</Text>
                        <TextInput style={styles.positionInput} placeholder={'List name'} onChangeText={(text) => setProductName(text)} value={`${productName}`}/>
                    </View>
                    <View style={styles.countHolder}>
                        <Text style={styles.positionTxt}>count</Text>
                        <View style={styles.plusHolder}>
                            <CustomBtn title={'-'} style={styles.minus} fontSize={18} onPress={() => setAmount(amount > 0 ? `${parseInt(amount)-1}` : "0")}/>
                            <TextInput name={'amountInput'} style={styles.countInput} placeholder={'0'} keyboardType={'numeric'} onChangeText={(text) => {setAmount(text)}} defaultValue={`${amount}`} value={`${amount}`}/>
                            <CustomBtn title={'+'} style={styles.plus} fontSize={18} onPress={() => setAmount(`${parseInt(amount)+1}`)}/>
                        </View>
                    </View>
                </View>
                <View style={styles.unitContainer}>
                    <CustomBtn style={styles.unit} color={'#303234'} fontWeight={unit==="pkg" ? "bold" : "normal"} title={'pkg'} onPress={() => setUnit("pkg")}/>
                    <CustomBtn style={styles.unit} color={'#303234'} fontWeight={unit==="kg" ? "bold" : "normal"} title={'kg'} onPress={() => setUnit("kg")}/>
                    <CustomBtn style={styles.unit} color={'#303234'} fontWeight={unit==="litre" ? "bold" : "normal"} title={'litre'} onPress={() => setUnit("litre")}/>
                    <CustomBtn style={styles.unit} color={'#303234'} fontWeight={unit==="bott" ? "bold" : "normal"} title={'bott'} onPress={() => setUnit("bott")}/>
                </View>
                {editType==="add" ? <CustomBtn style={styles.addBtn} color={'white'} title={'Add to List'} fontWeight={'bold'} textTransform={'uppercase'} onPress={addPosition}/>
                :
                <View style={styles.updateHolder}>
                    <CustomBtn style={styles.cancelBtn} color={'white'} title={'Cancel'} fontWeight={'bold'} textTransform={'uppercase'} onPress={cancelHandler}/>
                    <CustomBtn style={styles.updateBtn} color={'white'} title={'Update'} fontWeight={'bold'} textTransform={'uppercase'} onPress={updatePosition}/>
                </View>
                 }
                
                <View style={styles.justLine}></View>
                <View style={styles.listWrapper}>
                    <FlatList
                        style={styles.flatList}
                        data={listBody}
                        renderItem={({item}) => (
                        <EditItem item={item} onEditPress={() => editSpesificItem(item.id)} onDeletePress={() => deleteAlert(item.id)}/>
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
    saveBtn: {
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
    },
    newNameHolder: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
    },
    positionHolder: {
        width: "60%",
        flex: 0,
        alignItems: "center",
        
    },
    countHolder: {
        width: "30%",
        flex: 0,
        alignItems: "center",
        
    },
    positionTxt: {
        marginTop: 9,
        marginBottom: 8,
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
        color: "#303234",
        opacity: 0.75,
    },
    positionInput: {
        backgroundColor: "#EEEEEE",
        borderRadius: 45,
        width: "100%",
        textAlign: "center",
        fontSize: 18,
        fontFamily: "Montserrat-Regular",
        paddingVertical: 8,
    },
    countInput: {
        backgroundColor: "#EEEEEE",
        width: "40%",
        textAlign: "center",
        fontSize: 18,
        fontFamily: "Montserrat-Regular",
        paddingVertical: 8,
    },
    plusHolder: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    minus: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        width: "30%",
        backgroundColor: "#EEEEEE"
    },
    plus: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        width: "30%",
        backgroundColor: "#EEEEEE"
    },
    unitContainer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginTop: 15,
    },
    unit: {
        backgroundColor: "#EEEEEE", 
        width: "20%",
    },
    addBtn: {
        width: "90%",
        backgroundColor: "#FF7676",
        marginTop: 15,
    },
    updateHolder: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        width: "90%",
    },
    cancelBtn: {
        width: "46%",
        backgroundColor: "#FF7676",
    },
    updateBtn: {
        width: "46%",
        backgroundColor: "#FF7676",
    },
    justLine: {
        marginTop: 20,
        height: 2,
        width: "100%",
        backgroundColor: "#E5E5E5",
    },
    listWrapper: {
        width: "90%",
    },
});