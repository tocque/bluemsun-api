package com.bluemsun.service.impl;

import com.alibaba.fastjson.JSON;
import com.bluemsun.cache.JedisUtil;
import com.bluemsun.dao.UserDao;
import com.bluemsun.entity.User;
import com.bluemsun.service.RegisterService;
import com.bluemsun.util.EmailUtil;
import com.bluemsun.util.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class RegisterServiceImpl implements RegisterService {
@Autowired
private UserDao userDao;
@Autowired
private JedisUtil.Strings jedisUtilStrings;
@Autowired
private JavaMailSender javaMailSender;
    @Override
    public Integer submitRegister(User user) {
//        EmailUtil emailUtil = new EmailUtil();
//        user.setCreateTime(new Date(System.currentTimeMillis()));
//        user.setLastEditTime(new Date(System.currentTimeMillis()));
        userDao.uploadRegisterInfo(user);
//        String check = TokenUtil.createToken(user,2);
//        jedisUtilStrings.setEx(check, 2 * 60 * 60, JSON.toJSONString(user));
//        StringBuilder text=new StringBuilder();
//        text.append("<p>点击以下链接进行邮箱验证</p>");
//        text.append("<a>http://bluemsun.work:8080/vaildate?check=");
//        text.append(check);
//        text.append("</a>");
//        emailUtil.sendMail(text.toString(),"用户模块验证邮件",user.getEmail(),javaMailSender,true);
        return user.getUserId();
    }
}
