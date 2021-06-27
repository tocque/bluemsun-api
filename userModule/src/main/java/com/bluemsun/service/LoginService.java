package com.bluemsun.service;

import com.bluemsun.dto.UserDto;
import com.bluemsun.entity.User;
import com.bluemsun.enums.UserStateEnum;

import javax.servlet.http.HttpServletRequest;

public interface LoginService {
    String loginService(User user,HttpServletRequest request);
}
