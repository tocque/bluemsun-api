import {
    get
} from "@/utils/request"

const URL_CONF = {
    get_list_url: "group/getList",
    create_url: "group/create",
    join_url: "group/join",
    leave_url: "group/leave",
    rename_url: "groupAdmin/modify",
    delete_url: "groupAdmin/delete",
    show_member_url: "groupAdmin/showMember",
    manage_member_url: "groupAdmin/manageMember",
    delete_member_url: "groupAdmin/deleteMember"
}

export const getGroupList = data => get(URL_CONF.get_list_url, data)

export const createGroup = data => get(URL_CONF.create_url, data)

export const joinGroup = data => get(URL_CONF.join_url, data)

export const leaveGroup = data => get(URL_CONF.leave_url, data)

export const rename = data => get(URL_CONF.rename_url, data)

export const deleteGroup = data => get(URL_CONF.delete_url, data)

export const showMember = data => get(URL_CONF.show_member_url, data)

export const manageMember = data => get(URL_CONF.manage_member_url, data)

export const deleteMember = data => get(URL_CONF.delete_member_url, data)