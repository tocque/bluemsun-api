import axios from "axios"
const token = localStorage.getItem("token");
const BASE_URL = "http://182.92.225.240:8080/"
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
export function post(url: string, data = {}) {
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

