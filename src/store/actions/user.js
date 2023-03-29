import actionType from "./actionType";
import { apiAllUser, apiGetUserById, apiUpdateUser } from "../../services/user";

const userId = localStorage.getItem('persist:auth') && JSON.parse(localStorage.getItem('persist:auth'))?.userId?.slice(1, -1)
const token = localStorage.getItem('persist:auth') && JSON.parse(localStorage.getItem('persist:auth'))?.token?.slice(1, -1)

export const getCurrent = () => async (dispatch) => {
    try {
        const response = await apiGetUserById(token)
        if(response){
            dispatch({
                type: actionType.GET_CURRENT,
                currentData: response.data,
            })
        } else{
            dispatch({
                type: actionType.GET_CURRENT,
                currentData: {}

            })
        }
    } catch (error) {
        dispatch({
            type: actionType.GET_CURRENT,
            currentData: {}
        })
    }
}

export const getAllUser = () => async (dispatch) => {
    try {
        const response = await apiAllUser(token)
        if(response){
            dispatch({
                type: actionType.GET_ALL_USER,
                listUser: response.data,
            })
        } else{
            dispatch({
                type: actionType.GET_ALL_USER,
                listUser: {}

            })
        }
    } catch (error) {
        dispatch({
            type: actionType.GET_ALL_USER,
            listUser: {}
        })
    }
}

export const updateUser = (payload) => async (dispatch) => {
    try {
        const response = await apiUpdateUser(token, payload)
        if(response){
            dispatch({
                type: actionType.UPDTAE_USER,
                updateUser: response.data,
            })
        } else{
            dispatch({
                type: actionType.UPDTAE_USER,
                updateUser: {}

            })
        }
    } catch (error) {
        dispatch({
            type: actionType.UPDTAE_USER,
            updateUser: {}
        })
    }
}
