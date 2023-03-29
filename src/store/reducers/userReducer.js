import actionType from "../actions/actionType";

const initState = {
    currentData: {},
    listUser: [],
    updateUser: {},
    msg:""
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
       case actionType.GET_CURRENT:
        return{
            ...state,
            currentData: action.currentData || {},
        }
        case actionType.GET_ALL_USER:
        return{
            ...state,
            listUser: action.listUser || []
        }
        case actionType.UPDTAE_USER:
        return{
            ...state,
            updateUser: action.updateUser || {}
        }
    
        default:
            return state;
    }
}

export default userReducer