import {
    get,
    post
} from "@/utils/request"

const URL_CONF = {
    update_name_url: "personPage/updateUsername",
    update_password_url: "personPage/updateUserPassword"
}

export const updateName = (data) => get(URL_CONF.update_name_url, data)

export const updatePassword = data => post(URL_CONF.update_password_url, data)