package com.bluemsun.web;

import com.bluemsun.cache.JedisUtil;
import com.bluemsun.dao.UserDao;
import com.bluemsun.entity.User;
import com.bluemsun.service.LoginService;
import com.bluemsun.service.RegisterService;
import com.bluemsun.util.HttpServletRequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
@CrossOrigin
@Controller
@RequestMapping("/user")
public class RegsiterController {
    @Autowired
    private UserDao userDao;
    @Autowired
    private LoginService loginService;
    @Autowired
    private RegisterService registerService;
    @Autowired
    private JedisUtil.Strings jedisUtilStrings;
    @Autowired
    private JedisUtil.Keys jedisUtilKeys;
//    @CrossOrigin
//    @RequestMapping(value = "/checkoutUserName", method = RequestMethod.GET)
//    @ResponseBody
//
//    public Map<String, Object> checkOutUserName(HttpServletRequest request) {
//        Map<String, Object> modelMap = new HashMap<>();
//        String userName = HttpServletRequestUtil.getString(request, "UserName");
//        int count = userDao.checkOutUserName(userName);
//        if (count == 1) {
//            //不成功
//            modelMap.put("success",UserStateEnum.REPEATMSG.getState());
//            modelMap.put("info",UserStateEnum.REPEATMSG.getStateInfo());
//        } else {
//            //成功
//            modelMap.put("success", UserStateEnum.ENABLEMSG.getState());
//            modelMap.put("info",UserStateEnum.ENABLEMSG.getStateInfo());
//        }
//        return modelMap;
//    }
    @CrossOrigin
    @RequestMapping(value = "/checkoutEmail" ,method =RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> checkOutEmail(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        String email =HttpServletRequestUtil.getString(request,"email");
        int count = userDao.checkOutEmail(email);
        if (count == 1) {
            //不成功
            modelMap.put("success",0);
            modelMap.put("info","邮箱重复");
        } else {
            //成功
            modelMap.put("success", 1);
            modelMap.put("info","邮箱可用");
        }
        return modelMap;
    }

    @CrossOrigin
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> submitRegisterInfo( HttpServletRequest request){
        User user = new User();
        Map<String ,Object> modelMap = new HashMap<>();
//        Logger logger= LoggerFactory.getLogger(RegsiterController.class);
//        logger.debug("aaaaa");
        user.setEmail(HttpServletRequestUtil.getString(request,"email"));
        user.setUsername(HttpServletRequestUtil.getString(request,"username"));
        user.setPassword(HttpServletRequestUtil.getString(request,"password"));
        String check = HttpServletRequestUtil.getString(request,"check");
         if (jedisUtilKeys.exists(check)){
             int count = userDao.checkOutEmail(user.getEmail());
             if (count == 1) {
                 //不成功
                 modelMap.put("success",0);
                 modelMap.put("info","邮箱重复");
                 return modelMap;
             }
             int flag = registerService.submitRegister(user);
             if(flag>0){
                 //添加成功
                 User user2 = userDao.CheckLogin(HttpServletRequestUtil.getString(request,"email"),HttpServletRequestUtil.getString(request,"password"));
                 String token=loginService.loginService(user2,request);
                 modelMap.put("user",user2);
                 modelMap.put("token",token);
                 modelMap.put("success",1);
                 modelMap.put("info","注册成功");
                 jedisUtilKeys.del(check);
             }else{
                 //添加不成功
                 modelMap.put("success",0);
                 modelMap.put("info","注册失败");
             }
         }else{
             modelMap.put("success",0);
             modelMap.put("info","验证码错误");
         }
//        user.setQuestionAnswer(HttpServletRequestUtil.getString(request,"questionAnswer"));
//        user.setSecurityQuestion(HttpServletRequestUtil.getInt(request,"securityQuestion"));
        return modelMap;
    }
//    @CrossOrigin
//    @RequestMapping(value = "/checkEmail",method = RequestMethod.GET)
//    @ResponseBody
//    public Map<String,Object> checkEmail(HttpServletRequest request){
//        User user = new User();
//        Map<String,Object> modelMap = new HashMap<>();
//        String check =HttpServletRequestUtil.getString(request,"check");
//        if (jedisUtilKeys.exists(check)){
//            String userString=jedisUtilStrings.get(check);
//            JSONObject userJSON = JSON.parseObject(userString);
//            user = JSON.toJavaObject(userJSON,User.class);
//            userDao.UpdateUserAvailableAndStatus(user.getUserId(),1,1);
//            jedisUtilKeys.del(check);
//            modelMap.put("success",UserStateEnum.REGISTERCHECKSUCCESS.getState());
//            modelMap.put("info",UserStateEnum.REGISTERCHECKSUCCESS.getStateInfo());
//        }else{
//            modelMap.put("success",UserStateEnum.REGISTERCHECKFAIL.getState());
//            modelMap.put("info",UserStateEnum.REGISTERCHECKFAIL.getStateInfo());
//        }
//        return modelMap;
//    }

}