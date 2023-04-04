import actionType from "./actionType";
import { apiRegister, apiLogin, apiLogout, apiLoginGoogle, apiLoginFacebook } from "../../services/auth";

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
        console.log(response)
        if(response){
            dispatch({
                type: actionType.LOGIN_SUCCESS,
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
        console.log(error)
        dispatch({
            type: actionType.LOGIN_FAIL,
            msg: "Dang nhap that bai"
        })
    }
}


export const loginGoogle = (userId) => async (dispatch) => {
    try {
        const response = await apiLoginGoogle(userId)
        console.log(response)
        if(response){
            dispatch({
                type: actionType.LOGIN_GOOGLE,
                token: response.data.accessToken,
                userId: response.data._id
            })
        } else{
            dispatch({
                type: actionType.LOGIN_GOOGLE,
                token: null
            })
        }
    } catch (error) {
        console.log()
        dispatch({
            type: actionType.LOGIN_GOOGLE,
            data: null
        })
    }
}


export const loginFacebook = (userId) => async (dispatch) => {
    try {
        const response = await apiLoginFacebook(userId)
        console.log(response)
        if(response){
            dispatch({
                type: actionType.LOGIN_FACEBOOK,
                token: response.data.accessToken,
                userId: response.data._id
            })
        } else{
            dispatch({
                type: actionType.LOGIN_FACEBOOK,
                token: null
            })
        }
    } catch (error) {
        console.log()
        dispatch({
            type: actionType.LOGIN_FACEBOOK,
            data: null
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
