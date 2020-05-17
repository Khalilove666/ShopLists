import AsyncStorage from '@react-native-community/async-storage';

let initialState = {
    isSet: false,
    username: "Username",
    url: "",
}



const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('userInfo', jsonValue)
    } catch (e) {
        console.log(e);
        
    }
  }

const userReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'NEW_USER':
            storeData({
                isSet: action.payload.isSet,
                username: action.payload.username,
                url: action.payload.url,
            });
            return {
                isSet: action.payload.isSet,
                username: action.payload.username,
                url: action.payload.url,
            };
        default:
            return state;
    }
};

export default userReducer;