export const restoreAll = (data) => {
    return {
        type: "RESTORE",
        payload: data,
    }
};

export const newUser = (data) => {
    return {
        type: "NEW_USER",
        payload: data,
    };
};

export const createList = (data) => {
    return {
        type: "NEW_LIST",
        payload: data,
    };
};
export const deleteList = (data) => {
    return {
        type: "DELETE_LIST",
        payload: data,
    };
};
export const createProductList = (data) => {
    return {
        type: "NEW_PRODUCT_LIST",
        payload: data,
    };
};
export const toggleBought = (data) => {
    return {
        type: "TOGGLE_BOUGHT",
        payload: data,
    };
};
export const resetBought = (data) => {
    return {
        type: "RESET_BOUGHT",
        payload: data,
    };
};
