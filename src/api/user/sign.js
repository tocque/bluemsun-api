import {
    post,
    get
} from "@/utils/request"

const URL_CONF = {
    regist_url: "user/register",
    login_url: "user/login",
    emailCheck_url: "user/EmailCheckString",
    logout_url: "user/logout"
}

export const regist = (data) => post(URL_CONF.regist_url, data)

export const login = (data) => post(URL_CONF.login_url, data)

export const emailCheck = (data) => get(URL_CONF.emailCheck_url, data)

export const logout = () => get(URL_CONF.logout_url)