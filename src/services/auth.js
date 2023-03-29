import axiosConfig from '../axiosConfig'
import Swal from "sweetalert2";

export const apiRegister = (playload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/v1/auth/register',
            data: playload
        })
        resolve(response)
        Swal.fire("Done", "Sign up success" , "success")
    } catch (error) {
        Swal.fire("Warning!", "Username or email already exists" , "warning")
        reject(error)
    }
})

export const apiLogin = (playload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/v1/auth/login',
            data: playload
        })
        resolve(response)
    } catch (error) {
        Swal.fire("Error", error.response.data , "error")
        reject(error)
    }
})

export const apiLogout = (token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/v1/auth/logout`,
            headers: {
                token:`Bearer ${token}`
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

