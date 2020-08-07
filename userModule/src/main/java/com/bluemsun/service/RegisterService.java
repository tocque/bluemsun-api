package com.bluemsun.service;

import com.bluemsun.entity.User;
import com.bluemsun.enums.UserStateEnum;

import java.util.List;

public interface RegisterService {
    Integer submitRegister(User user);
}
