package com.bluemsun.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bluemsun.cache.JedisUtil;
import com.bluemsun.dao.UserDao;
import com.bluemsun.entity.User;
import com.bluemsun.enums.UserStateEnum;
import com.bluemsun.util.HttpServletRequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;
import java.io.PrintWriter;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
@CrossOrigin
@Controller
@RequestMapping("/personPage")
public class PersonPageController {
    @Autowired
  private   UserDao userDao;
    @Autowired
    private JedisUtil.Strings jedisUtilStrings;
    @Autowired
    private JedisUtil.Keys jedisUtilKeys;

//    @CrossOrigin
//    @RequestMapping(value = "/personInfo",method = RequestMethod.GET)
//    @ResponseBody
//    public Map<String,Object> PersonInfo(HttpServletRequest request){
//        Map<String,Object> modelMap = new HashMap<>();
//        String token = request.getHeader("token");
//        String userString = jedisUtilStrings.get(token);
//        JSONObject userJson = JSON.parseObject(userString);
//        user = JSON.toJavaObject(userJson,User.class);
//        if(token==null){
//            modelMap.put("info","未登录用户!");
//            modelMap.put("success",-1);
//            return modelMap;
//        }
//        modelMap.put("user",user);
//        modelMap.put("success", UserStateEnum.GETPERSONSUCCESS.getState());
//        modelMap.put("info",UserStateEnum.GETPERSONSUCCESS.getStateInfo());
////                if(request.getSession().getAttribute("user")==null){
////            modelMap.put("success",-1);
////        }else{
////            user = (User)request.getSession().getAttribute("user");
////            modelMap.put("success",1);
////            modelMap.put("userName",user.getUserName());
////            modelMap.put("trueName",user.getTrueName());
////            modelMap.put("StudentCode",user.getStudentCode());
////            modelMap.put("status",user.getStatus());
////        }
//        return modelMap;
//    }
    @CrossOrigin
    @RequestMapping(value = "/updateUserPassword" , method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updateUserPassword(HttpServletRequest request){
        User user;
        Map<String,Object> modelMap = new HashMap<>();
        String token = request.getHeader("token");
        String userString = jedisUtilStrings.get(token);
        JSONObject userJson = JSON.parseObject(userString);
        user = JSON.toJavaObject(userJson,User.class);
        if (userDao.CheckUserPassword(user.getUserId(),HttpServletRequestUtil.getString(request,"oldPassword"))==0){
            //原密码错误
            modelMap.put("success",0);
            modelMap.put("info","原密码错误");
        }else{
//            if(userDao.checkOutUserSerQuestion(user.getUserName(),HttpServletRequestUtil.getString(request,"securityQuestion"))==0){
//            //密保问题不正确
//                modelMap.put("success",UserStateEnum.SERDENY.getState());
//                modelMap.put("info",UserStateEnum.SERDENY.getStateInfo());
//            }else{
            int i = userDao.UpdateUserPassword(user.getUserId(),HttpServletRequestUtil.getString(request,"newPassword"));
            if(i==1){
                //密码更新成功
                modelMap.put("success",1);
                modelMap.put("info","密码更新成功");
            }else if(i ==0){
                //新密码更新失败
                modelMap.put("success",0);
                modelMap.put("info","密码更新失败");
            }

        }
        return modelMap;
    }
    @CrossOrigin
    @RequestMapping(value = "/updateUsername" , method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> updateUsername(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        User user;
        String username = HttpServletRequestUtil.getString(request,"username");
        String token = request.getHeader("token");
        String userString = jedisUtilStrings.get(token);
        JSONObject userJson = JSON.parseObject(userString);
        user = JSON.toJavaObject(userJson,User.class);
        user.setUsername(username);
        userDao.updateUserName(username,user.getUserId());
        jedisUtilStrings.setEx(token,30*24*60*60,JSON.toJSONString(user));
        modelMap.put("success",1);
        modelMap.put("info","用户名更新成功");
        return modelMap;
    }
}
