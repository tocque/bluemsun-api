package com.bluemsun.web;

import com.bluemsun.cache.JedisUtil;
import com.bluemsun.dao.UserDao;
import com.bluemsun.entity.User;
import com.bluemsun.enums.UserStateEnum;
import com.bluemsun.service.LoginService;
import com.bluemsun.service.PasswordService;
import com.bluemsun.service.impl.LoginServiceImpl;
import com.bluemsun.util.CodeUtil;
import com.bluemsun.util.HttpServletRequestUtil;
import com.bluemsun.util.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
@CrossOrigin
@Controller
@RequestMapping("/user")
public class LoginController {
   @Autowired
  private   UserDao userDao;
   @Autowired
   private LoginService loginService;
   @Autowired
   private JedisUtil.Keys jedisUtilKeys;
   @Autowired
   private PasswordService passwordService;
    @Autowired
    private JedisUtil.Strings jedisUtilStrings;
private User user;
    @RequestMapping(value = "/login" )
    @ResponseBody
    @CrossOrigin
    public Map<String,Object> LoginCheck(HttpServletRequest request){
        Logger logger = LoggerFactory.getLogger(LoginController.class);
        Map<String,Object> modelMap = new HashMap<>();
        String userName=HttpServletRequestUtil.getString(request,"username");
        String password=HttpServletRequestUtil.getString(request,"password");
        //验证码检查
//        if(CodeUtil.checkVerifyCode(request)){
//        int flag=userDao.checkOutUserName(userName);
//        if(flag==0){
//          //改账号未注册
//        modelMap.put("success", UserStateEnum.NULLUSER.getState());
//        modelMap.put("info",UserStateEnum.NULLUSER.getStateInfo());
//     }else{
            user = userDao.CheckLogin(userName,password);
            logger.info(request.getRemoteAddr());
            logger.info(userName);
        if(user==null){
            //登录名或邮箱或密码错误
//            request.getSession().setAttribute("userName",userName);
//            Integer count=null;
//            if(request.getSession().getAttribute("count")!=null){
//                 count=(int) request.getSession().getAttribute("count");
//                count+=1;
//            }else {
//                count=1;
//            }
//            logger.info("密码错误第"+count+"次");
//            request.getSession().setAttribute("count",count);
            modelMap.put("success",0);
            modelMap.put("info","用户名或密码错误");
        }else{
//     if(user.getAvailable()==0){
//        //邮箱未验证
//        modelMap.put("success",UserStateEnum.CHECK.getState());
//        modelMap.put("info",UserStateEnum.CHECK.getStateInfo());
//    }else if(user.getAvailable()==2){
//        //该账号已被封禁
//        modelMap.put("success",UserStateEnum.OFFLINE.getState());
//        modelMap.put("info",UserStateEnum.OFFLINE.getStateInfo());
//    }else if(user.getAvailable()==1) {
//         //账号可用
//         Date editTime=userDao.CheckPasswordTime(user.getUserId());
//         int betweenDay= TimeUtil.BetweenDay(editTime);
//         if(betweenDay>=90){
//             //需要更换密码
//             request.getSession().setAttribute("userName",userName);
//             request.getSession().setAttribute("password",password);
//             modelMap.put("success",UserStateEnum.NEEDUPDATE.getState());
//             modelMap.put("info",UserStateEnum.NEEDUPDATE.getStateInfo());
//         }else {
             //成功登录
             String token=loginService.loginService(user,request);
             modelMap.put("user",user);
             modelMap.put("token",token);
             modelMap.put("success", 1);
             modelMap.put("info", "登录成功");
//         }
//     }
    }
//        }
//        else{
//            //验证码错误
//            modelMap.put("success",UserStateEnum.ERRORCHECK.getState());
//            modelMap.put("info",UserStateEnum.ERRORCHECK.getStateInfo());
//        }
    return modelMap;
}

@RequestMapping(value = "/logout",method = RequestMethod.GET)
@ResponseBody
@CrossOrigin
    public Map<String,Object> Logout(HttpServletRequest request) {
        String token = request.getHeader("token");
        jedisUtilKeys.del(token);
        Map<String,Object> modelMap = new HashMap<>();
        modelMap.put("success",1);
        modelMap.put("info","退出等录成功");
        return modelMap;
}

    @RequestMapping(value = "/find",method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
        public Map<String,Object> findPassword(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        String check = HttpServletRequestUtil.getString(request,"check");
        String password = HttpServletRequestUtil.getString(request,"password");
        if(jedisUtilKeys.exists(check)){
            String email = jedisUtilStrings.get(check);
            jedisUtilKeys.del(check);
            userDao.UpdateUserPassword2(email,password,new Date(System.currentTimeMillis()));
            User user = userDao.CheckLogin(email,password);
            String token = loginService.loginService(user,request);
            modelMap.put("user",user);
            modelMap.put("token",token);
            modelMap.put("success",1);
            modelMap.put("info","密码修改成功");
        }else {
                modelMap.put("success",0);
                modelMap.put("info","验证码错误或者失效");
        }
        return modelMap;
    }
//@RequestMapping(value = "/findPassword",method = RequestMethod.POST)
//    @CrossOrigin
//    @ResponseBody
//    public Map<String,Object> findPassword(HttpServletRequest request){
//        Map<String,Object> modelMap = new HashMap<>();
//        String userName=HttpServletRequestUtil.getString(request,"userName");
//    if(userDao.checkOutUserName(userName)!=0){
//        int available =userDao.getUserAvailable(userName);
//        if(available==1){
//        int question = userDao.getSerQuestion(userName);
//        String email = userDao.getEmail(userName);
//        request.getSession().setAttribute("userName",userName);
//        request.getSession().setAttribute("email",email);
//        modelMap.put("userName",userName);
//        modelMap.put("serQuestion",question);
//        modelMap.put("success",UserStateEnum.EXIST.getState());
//        modelMap.put("info",UserStateEnum.EXIST.getStateInfo());}
//        else {
//            modelMap.put("success",UserStateEnum.UNCHECK.getState());
//            modelMap.put("info",UserStateEnum.UNCHECK.getStateInfo());
//        }
//    }else{
//        modelMap.put("success",UserStateEnum.NOEXIST.getState());
//        modelMap.put("info",UserStateEnum.NOEXIST.getStateInfo());
//    }
//    return modelMap;
//}
//@RequestMapping(value = "/updatePassword",method = RequestMethod.POST)
//    @CrossOrigin
//    @ResponseBody
//    public Map<String,Object> updatePassword(HttpServletRequest request){
//        Map<String,Object> modelMap = new HashMap<>();
//        String userName =(String)request.getSession().getAttribute("userName");
//        request.getSession().removeAttribute("userName");
//        String password =(String) request.getSession().getAttribute("password");
//        request.getSession().removeAttribute("password");
//        User user=userDao.CheckLogin(userName,password);
//        if(userName==null||password==null||user==null||user.getAvailable()==2||user.getAvailable()==0){
//            modelMap.put("success",-1);
//            modelMap.put("info","虚假提交，逼崽子想干啥");
//        }else{
//            String newPassword = HttpServletRequestUtil.getString(request,"newPassword");
//            userDao.UpdateUserPassword2(userName,password,new Date(System.currentTimeMillis()));
//            String token=loginService.loginService(user,request);
//            modelMap.put("token",token);
//            modelMap.put("success",UserStateEnum.PASSWORDUPDATE.getState());
//            modelMap.put("info",UserStateEnum.PASSWORDUPDATE.getStateInfo());
//        }
//        return modelMap;
//}
}
