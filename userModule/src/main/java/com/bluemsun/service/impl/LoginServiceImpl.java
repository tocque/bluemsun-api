package com.bluemsun.service.impl;

import com.alibaba.fastjson.JSON;
import com.bluemsun.cache.JedisUtil;
import com.bluemsun.dao.RecordDao;
import com.bluemsun.dao.UserDao;
import com.bluemsun.entity.Record;
import com.bluemsun.entity.User;
import com.bluemsun.service.LoginService;
import com.bluemsun.util.HttpServletRequestUtil;
import com.bluemsun.util.TokenUtil;
import jdk.nashorn.internal.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private RecordDao recordDao;
    @Autowired
    private JedisUtil.Strings jedisUtilStrings;
    @Override
    public String loginService(User user, HttpServletRequest request) {
      String token= TokenUtil.createToken(user,1);
      Date date = new Date(System.currentTimeMillis());
      jedisUtilStrings.setEx(token,30 * 24 * 60 * 60, JSON.toJSONString(user));
      recordDao.insertRecord(user.getUserId(),date,request.getRemoteAddr());
      return token;
    }

}
