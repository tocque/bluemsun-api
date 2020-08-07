package com.bluemsun.web;

import com.bluemsun.cache.JedisUtil;
import com.bluemsun.dao.UserDao;
import com.bluemsun.enums.UserStateEnum;
import com.bluemsun.service.PasswordService;
import com.bluemsun.service.RegisterService;
import com.bluemsun.util.HttpServletRequestUtil;
import com.bluemsun.util.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class EmailController {
    @Autowired
    private UserDao userDao;
    @Autowired
    private JedisUtil.Keys jedisUtilKeys;
    @Autowired
    private RegisterService registerService;
    @Autowired
    private PasswordService passwordService;
//    @RequestMapping(value = "/findPassword", method = RequestMethod.POST)
//    @CrossOrigin
//    @ResponseBody
//    public Map<String,Object> findPassword(HttpServletRequest request){
//        Map<String,Object> modelMap = new HashMap<>();
//        boolean t = false;
//        int mode = HttpServletRequestUtil.getInt(request,"mode");
//        String newPassword = HttpServletRequestUtil.getString(request,"newPassword");
//        String userName =(String) request.getSession().getAttribute("userName");
//        request.getSession().removeAttribute("userName");
//        request.getSession().removeAttribute("email");
//    if(mode==1){
//        String checkString =HttpServletRequestUtil.getString(request,"checkString");
//       t=jedisUtilKeys.exists(checkString);
//       jedisUtilKeys.del(checkString);
//    }else if (mode==2){
//        String questionAnswer = HttpServletRequestUtil.getString(request,"questionAnswer");
//        int i=userDao.checkOutUserSerQuestion(userName,questionAnswer);
//        if(i!=0){
//            t=true;
//        }
//    }
//    if(t){
//        userDao.UpdateUserPassword2(userName,newPassword,new Date(System.currentTimeMillis()));
//        modelMap.put("success",UserStateEnum.PASSWORDUPDATE.getState());
//        modelMap.put("info",UserStateEnum.PASSWORDUPDATE.getStateInfo());
//    }else {
//        modelMap.put("success",UserStateEnum.CHECKSERWAR.getState());
//        modelMap.put("info",UserStateEnum.CHECKSERWAR.getStateInfo());
//    }
//    return modelMap;
//    }
    @RequestMapping(value = "/EmailCheckString",method = RequestMethod.GET)
    @CrossOrigin
    @ResponseBody
    public Map<String,Object> sendCheckString (HttpServletRequest request){
        Map<String,Object> modelMap =new HashMap<>();
        long countTime = 0;
        //用于判断是否在60s内
        //判断是否是邮箱注册
        int type=HttpServletRequestUtil.getInt(request,"type");
        if(type==1){
            String email =HttpServletRequestUtil.getString(request,"email");
            int count = userDao.checkOutEmail(email);
            if (count == 1) {
                //不成功
                modelMap.put("success",0);
                modelMap.put("info","邮箱重复");
                return modelMap;
            }
        }//找回密码又是另外的操作
        else if(type==2){
            String email =HttpServletRequestUtil.getString(request,"email");
            int count = userDao.checkOutEmail(email);
            if (count == 0) {
                //不成功
                modelMap.put("success",0);
                modelMap.put("info","邮箱不存在");
                return modelMap;
            }
        }
        if(request.getSession().getAttribute("countTime")!=null){
            countTime=(long)request.getSession().getAttribute("countTime");
            if(TimeUtil.BetweenCent(countTime)<60) {
                modelMap.put("success", 0);
                modelMap.put("info", "点击过于频繁！");
                return modelMap;
            }
        }else{ countTime=System.currentTimeMillis();
                request.getSession().setAttribute("countTime",countTime);
        }
        //判断是否已有则清空
//        if(request.getSession().getAttribute("checkString")!=null){
//            jedisUtilKeys.del((String) request.getSession().getAttribute("checkString"));
//        }
        String email=HttpServletRequestUtil.getString(request,"email");
        String checkString=passwordService.sendCheckString(email);
//        request.getSession().setAttribute("checkString",checkString);
        modelMap.put("success",1);
        modelMap.put("info","发送验证邮件成功");
        return modelMap;
    }
}
