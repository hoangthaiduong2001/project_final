import actionType from "./actionType";
import { apiRegister, apiLogin, apiLogout } from "../../services/auth";

const token = localStorage.getItem('persist:auth') && JSON.parse(localStorage.getItem('persist:auth'))?.token
export const register = (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload)
        if(response){
            dispatch({
                type: actionType.REGISTER_SUCCSESS,
                data: response.data,    
            })
        } else{
            dispatch({
                type: actionType.REGISTER_FAIL,
                data: {},

            })
        }
    } catch (error) {
        dispatch({
            type: actionType.REGISTER_FAIL,
            data: {},
        })
    }
}

export const login = () => async (dispatch) => {
    dispatch({
        type: actionType.LOGIN
    })
}

export const loginSuccses = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload)
        if(response){
            dispatch({
                type: actionType.LOGIN_SUCCSESS,
                token: response.data.accessToken,
                userId: response.data._id
            })
        } else{

            dispatch({
                type: actionType.LOGIN_FAIL,
                msg: response.data
            })
        }
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: actionType.LOGIN_FAIL,
            msg: "Dang nhap that bai"
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        const response = await apiLogout(token)
        if(response){
            dispatch({
                type: actionType.LOGOUT,
                msg: response
            })
        } else{
            dispatch({
                type: actionType.LOGOUT,
                msg: ""
            })
        }
    } catch (error) {
        dispatch({
            type: actionType.LOGOUT,
            msg: ""
        })
    }
}
