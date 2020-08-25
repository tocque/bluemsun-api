package com.bluemsun.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bluemsun.cache.JedisUtil;
import com.bluemsun.dao.GroupDao;
import com.bluemsun.dao.UpdateDao;
import com.bluemsun.dao.UserDao;
import com.bluemsun.entity.Group;
import com.bluemsun.entity.User;
import com.bluemsun.socket.Notify;
import com.bluemsun.vo.NotifyVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/personPage")
@CrossOrigin
public class NotifyController {
    @Autowired
    private UserDao userDao;
    @Autowired
    private JedisUtil.Strings jedisUtilStrings;
    @Autowired
    private JedisUtil.Keys jedisUtilKeys;
    @Autowired
    private UpdateDao updateDao;
    @Autowired
    private GroupDao groupDao;
    @RequestMapping(value = "/showList",method = RequestMethod.GET)
    public Map<String,Object> NotifyList(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        String token = request.getHeader("token");
        String userString = jedisUtilStrings.get(token);
        JSONObject userJson = JSON.parseObject(userString);
        User user = JSON.toJavaObject(userJson, User.class);
        List<NotifyVo> notifyVoList = updateDao.getOneUserNotify(user.getUserId());
        modelMap.put("notifyList",notifyVoList);
        modelMap.put("success",1);
        modelMap.put("info","消息列表获取成功");
        return modelMap;
    }
}
