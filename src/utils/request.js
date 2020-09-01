import axios from "axios"
import store from "@/store/index"
const BASE_URL = "http://192.168.199.229:8084/"
const http = axios.create({
    timeout: 1000 * 8,
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

http.interceptors.request.use(
    config => {
        const token = store.state.token
        config.headers.token = token
        return config
    },
    error => Promise.reject(error)
)

/**
 * 封装get方法
 * @export
 * @param {String} url
 * @param {Object} [params={}]
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        http.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post方法
 * @export
 * @param {String} url
 * @param {Object} [data={}]
 * @returns
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        http.post(url, data)
            .then(response => {
                if (response && response.data) {
                    resolve(response.data);
                }
            }, err => {
                reject(err)
            })
    })
}