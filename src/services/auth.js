import axiosConfig from '../axiosConfig'
import axios from 'axios';
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';

export const apiRegister = (playload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/auth/register',
            data: playload
        })
        resolve(response)
        Swal.fire("Done", "Sign up success" , "success")
    } catch (error) {
        Swal.fire("Warning!", "Username or email already exists" , "warning")
        reject(error)
    }
})

export const apiLoginGoogle = (id) => new Promise(async(resolve, reject) => {
    // const {userId} = useParams()
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8000/api/auth/login-success',
            data: { userId : id}
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiLoginFacebook = (id) => new Promise(async(resolve, reject) => {
    // const {userId} = useParams()
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8000/api/auth/login-facebook',
            data: { userId : id}
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiLogin = (playload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/auth/login',
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
            url: `/api/auth/logout`,
            headers: {
                token:`Bearer ${token}`
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

