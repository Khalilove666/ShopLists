import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    lists : [
        // {
        //     id: "1",
        //     listType: "ONE_TIME",
        //     listName: "First List",
        //     listBody: [
        //         {
        //             id: "1",
        //             productName: "Cheese",
        //             amount: 2,
        //             unit: "pkg",
        //             bought: false,
        //         },
        //     ],
        // }
    ],
}


const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('shopInfo', jsonValue)
    } catch (e) {
        console.log(e);
        
    }
  }

const listReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'RESTORE':
            let updatedState = {
                ...action.payload
            };
            return updatedState;
        case 'NEW_LIST':
            updatedState = {
                ...state,
                lists: [
                    ...state.lists,
                    {
                        id: `${Math.random()}${Date.now()}`,
                        listType: action.payload.listType,
                        listName: action.payload.listName,
                        listBody: [],
                    }
                ],
            };
            storeData(updatedState);
            return updatedState;  
        case 'DELETE_LIST':
            let listIndex = state.lists.findIndex(
                (item) => item.id == action.payload.id
            );
            state.lists.splice(listIndex, 1);
            updatedState = {
                ...state,
                lists: [
                    ...state.lists,
                ]
            };
            storeData(updatedState);
            return updatedState; 
        case 'NEW_PRODUCT_LIST':
            listIndex = state.lists.findIndex(
                (item) => item.id == action.payload.id
            );
            state.lists[listIndex].listBody = [...action.payload.listBody,];
            updatedState = {
                ...state,
            };
            storeData(updatedState);
            return updatedState; 
        case 'TOGGLE_BOUGHT':
            listIndex = state.lists.findIndex(
                (item) => item.id == action.payload.id
            );
            const productId = state.lists[listIndex].listBody.findIndex(
                (item) => item.id == action.payload.productId
            );
            state.lists[listIndex].listBody[productId].bought = !state.lists[listIndex].listBody[productId].bought;
            updatedState = {
                ...state,
            };
            storeData(updatedState);
            return updatedState;
        case 'RESET_BOUGHT':
            listIndex = state.lists.findIndex(
                (item) => item.id == action.payload.id
            );
            state.lists[listIndex].listBody.forEach(element => {
               element.bought = false;
            });
            updatedState = {...state};
            storeData(updatedState);
            return updatedState; 
        default:
            return state;
    }
};

export default listReducer;


