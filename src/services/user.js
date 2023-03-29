import axios from '../axiosConfig'

export const apiGetUserById = (token) => new Promise(async(resolve, reject) => {
    try {
        const id = localStorage.getItem('persist:auth') && JSON.parse(localStorage.getItem('persist:auth'))?.userId?.slice(1, -1)
        const response = await axios({
            method: 'get',
            url: `/v1/user/${id}`,
            headers: {
                token: token ? `Bearer ${token}` : null
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiAllUser = (token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: `/v1/user/`,
            headers: {
                token: `Bearer ${token}`
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateUser = (token, payload) => new Promise(async(resolve, reject) => {
    try {
        const id = localStorage.getItem('persist:auth') && JSON.parse(localStorage.getItem('persist:auth'))?.userId?.slice(1, -1)
        const response = await axios({
            method: 'put',
            url: `/v1/user/${id}/update`,
            data: payload,
            headers: {
                token: token ? `Bearer ${token}` : null
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteUser = (id, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `/v1/user/${id}/delete`,
            headers: {
                token: token ? `Bearer ${token}` : null
            }
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})