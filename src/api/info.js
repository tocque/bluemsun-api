import {
    get
} from "@/utils/request"

export const showList = data => get("personPage/showList", data)