package com.bluemsun.util;

import javax.servlet.http.HttpServletRequest;

public class StringUtil {
    public static boolean emailOrUserName(HttpServletRequest request) {
        boolean isEmail=false;
        String str = HttpServletRequestUtil.getString(request,"userName");
        if (str.indexOf('@')!=-1){
            isEmail = true;
        }
        return isEmail;
    }
}
