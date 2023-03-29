import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

instance.interceptors.request.use(function(config){ 
    const token = localStorage.getItem('persist:auth') && JSON.parse(localStorage.getItem('persist:auth'))?.token?.slice(1, -1)
    config.headers = {
        token: `Bearer ${token}`
    }
    return config
}, function(error){
    console.log(error)
    return Promise.reject(error)
})

instance.interceptors.response.use(function(config){
    
    return config
}, function(error){
    return Promise.reject(error)
})

export default instance