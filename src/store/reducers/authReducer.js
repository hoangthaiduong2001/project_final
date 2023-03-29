import actionType from "../actions/actionType";

const initState = {
    isLoanding: false,
    isLoggedIn: false,
    token: "",
    userId: "",
    data: {},
    msg: ""
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.REGISTER_SUCCSESS:
            return{
                ...state,
                data: action.data
        }
        case actionType.REGISTER_FAIL:
            return{
                ...state,
                data: {}
        }
        case actionType.LOGIN:
            return{
                ...state,
                isLoanding: true
        }
        case actionType.LOGIN_SUCCSESS:
            return{
                ...state,
                isLoanding: false,
                isLoggedIn: true,
                token: action.token,
                userId: action.userId
        }
        case actionType.LOGIN_FAIL:
            return{
                ...state,
                isLoggedIn: false,
                msg: action.data
        }
        case actionType.LOGOUT:
            return{
                ...state,
                isLoggedIn: false,
                token: "",
                userId: ""
        }
        default:
            return state;
    }
}

export default authReducer