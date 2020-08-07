package com.bluemsun.web;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bluemsun.cache.JedisUtil;
import com.bluemsun.dao.GroupDao;
import com.bluemsun.dao.MemberDao;
import com.bluemsun.entity.Group;
import com.bluemsun.entity.User;
import com.bluemsun.util.HttpServletRequestUtil;
import com.bluemsun.util.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@CrossOrigin
@RestController("/group")
public class GroupController {
    @Autowired
    private GroupDao groupDao;
    @Autowired
    private MemberDao memberDao;
    @Autowired
    private JedisUtil.Strings jedisUtilStrings;
    @Autowired
    private JedisUtil.Keys jedisUtilKeys;
@RequestMapping(value = "/create",method = RequestMethod.GET)
public Map<String,Object> createGroup(HttpServletRequest request){
    Map<String,Object> modelMap = new HashMap<>();
    String name = HttpServletRequestUtil.getString(request,"name");
    if(name==null){
        modelMap.put("success",0);
        modelMap.put("info","请输入项目组名称");
        return modelMap;
    }
    String token = request.getHeader("token");
    String userString = jedisUtilStrings.get(token);
    JSONObject userJson = JSON.parseObject(userString);
    User user = JSON.toJavaObject(userJson, User.class);
    Random r = new Random();
    Integer temp =r.nextInt();
    String groupId= MD5Util.getMd5(temp.toString()+name,6);
    groupDao.insert(groupId,name);
    memberDao.insert(groupId,user.getUserId(),1);
    modelMap.put("groupId",groupId);
    modelMap.put("success",1);
    modelMap.put("info","创建成功");
    return modelMap;
}
    @RequestMapping(value ="/join",method = RequestMethod.GET)
    public Map<String,Object> joinGroup(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        String groupId = HttpServletRequestUtil.getString(request,"groupId");
        String token = request.getHeader("token");
        String userString = jedisUtilStrings.get(token);
        JSONObject userJson = JSON.parseObject(userString);
        User user = JSON.toJavaObject(userJson, User.class);
        int check1 = memberDao.checkUser(user.getUserId(),groupId);
        int check2 = groupDao.checkGroup(groupId);
        if(check1==1||check2==0){
            modelMap.put("success",0);
            modelMap.put("info","组不存在或者你已加入过组");
        }else {
            memberDao.insert(groupId,user.getUserId(),3);
            modelMap.put("success",1);
            modelMap.put("info","加入成功");
        }
        return modelMap;
    }
    @RequestMapping(value ="/getList",method = RequestMethod.GET)
    public Map<String,Object> groupList(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        String token = request.getHeader("token");
        String userString = jedisUtilStrings.get(token);
        JSONObject userJson = JSON.parseObject(userString);
        User user = JSON.toJavaObject(userJson, User.class);
        List<Group> groupList=groupDao.getGroupByUser(user.getUserId());
        modelMap.put("groupList",groupList);
        modelMap.put("success",1);
        modelMap.put("info","获取成功");
        return modelMap;
    }
    @RequestMapping(value ="/leave",method = RequestMethod.GET)
    public Map<String,Object> leave(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        String groupId = HttpServletRequestUtil.getString(request,"groupId");
        String token = request.getHeader("token");
        String userString = jedisUtilStrings.get(token);
        JSONObject userJson = JSON.parseObject(userString);
        User user = JSON.toJavaObject(userJson, User.class);
        memberDao.deleteMember(groupId,user.getUserId());
        modelMap.put("success",1);
        modelMap.put("info","退出成功");
        return modelMap;
    }
}
