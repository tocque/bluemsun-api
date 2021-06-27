package com.bluemsun.web;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bluemsun.cache.JedisUtil;
import com.bluemsun.dao.RecordDao;
import com.bluemsun.dao.UserDao;
import com.bluemsun.entity.Page;
import com.bluemsun.entity.Record;
import com.bluemsun.entity.User;
import com.bluemsun.enums.UserStateEnum;
import com.bluemsun.service.PageService;
import com.bluemsun.util.HttpServletRequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin
@Controller
@RequestMapping("/superAdmin")
public class SuperAdminController {
//    @Autowired
//   private UserDao userDao;
//    @Autowired
//    private PageService pageService;
//   private User user;
//   private Page page;
//   @Autowired
//   private JedisUtil.Strings jedisUtilStrings;
//   @Autowired
//   private RecordDao recordDao;
//    @CrossOrigin
//    @RequestMapping(value = "/listNowUser" ,method = RequestMethod.GET)
//    @ResponseBody
//    public Map<String,Object> listAllUser(HttpServletRequest request){
//        List<User> userList;
//        Map<String,Object> modelMap = new HashMap<>();
//        String token = request.getHeader("token");
//        String userString = jedisUtilStrings.get(token);
//        JSONObject userJson = JSON.parseObject(userString);
//        user = JSON.toJavaObject(userJson,User.class);
//        if(user.getStatus()==2){
//        int pageNum = HttpServletRequestUtil.getInt(request,"pageNum");
//        page=pageService.userPage(pageNum);
//        userList=userDao.listNowUser(page.getStartIndex(),page.getPageSize());
//        modelMap.put("userList",userList);
//        modelMap.put("pageNum",pageNum);
//        modelMap.put("pages",page.getTotalPage());
//        modelMap.put("total",page.getTotalRecord());
//        modelMap.put("success",UserStateEnum.SUCCESSGETLIST.getState());
//        modelMap.put("info",UserStateEnum.SUCCESSGETLIST.getStateInfo());
//        }
//        else{
//            modelMap.put("success",UserStateEnum.FAILGETLIST.getState());
//            modelMap.put("info",UserStateEnum.FAILGETLIST.getStateInfo());
//        }
//        return modelMap;
//    }
//    @CrossOrigin
//    @RequestMapping(value = "/updateUserStatusAndAvailable",method = RequestMethod.GET)
//    @ResponseBody
//    public Map<String,Object> updateUserStatusAndAvailable(HttpServletRequest request){
//        Map<String,Object> modelMap = new HashMap<>();
//        int userId = HttpServletRequestUtil.getInt(request,"userId");
//        int status = HttpServletRequestUtil.getInt(request,"status");
//        int available = HttpServletRequestUtil.getInt(request,"available");
//        int userStatus = userDao.getUserStatus(userId);
//        if(userStatus==2){
//            modelMap.put("success",UserStateEnum.NOADMIN.getState());
//            modelMap.put("info",UserStateEnum.NOADMIN.getStateInfo());
//            return modelMap;
//        }
//        int flag=userDao.UpdateUserAvailableAndStatus(userId,available,status);
//        if(flag==1){
//            modelMap.put("success", UserStateEnum.SUCCESSUPDATE.getState());
//            modelMap.put("info",UserStateEnum.SUCCESSUPDATE.getStateInfo());
//        }else{
//            modelMap.put("success",UserStateEnum.FAILUPDATE.getState());
//            modelMap.put("info",UserStateEnum.FAILUPDATE.getStateInfo());
//        }
//        return modelMap;
//    }
//    @CrossOrigin
//    @RequestMapping(value = "/getLoginRecord",method = RequestMethod.GET)
//    @ResponseBody
//    public Map<String, Object> getLoginRecord(HttpServletRequest request){
//                Map<String,Object> modelMap=new HashMap<>();
//        Integer userId = HttpServletRequestUtil.getInt(request,"userId");
//        Integer pageNum = HttpServletRequestUtil.getInt(request,"pageNum");
//        if(userId!=0) {
//            page = pageService.recordPage(pageNum, userId);
//            List<Record> recordList = recordDao.getRecord(userId, page.getStartIndex(), page.getPageSize());
//            modelMap.put("recordList", recordList);
//            modelMap.put("userId",userId);
//            modelMap.put("pageNum", pageNum);
//            modelMap.put("pages", page.getTotalPage());
//            modelMap.put("total", page.getTotalRecord());
//            modelMap.put("success", UserStateEnum.SUCCESSGETLIST.getState());
//            modelMap.put("info", UserStateEnum.SUCCESSGETLIST.getStateInfo());
//        }else {
//            modelMap.put("success",UserStateEnum.FAILGETLIST.getState());
//            modelMap.put("info",UserStateEnum.FAILGETLIST.getStateInfo());
//        }
//        return modelMap;
//        }
//        @CrossOrigin
//        @RequestMapping(value = "getDownload",method = RequestMethod.GET)
//        @ResponseBody
//        public Map<String,Object> getDownload(HttpServletRequest request){
//        int type = HttpServletRequestUtil.getInt(request,"type");
//        Map<String,Object> modelMap = new HashMap<>();
//            if(type==1){
//                List<User> userList=userDao.getAllUser();
//                modelMap.put("userList",userList);
//            }else if(type==2){
//                int userId = HttpServletRequestUtil.getInt(request,"userId");
//                List<Record> recordList=recordDao.getUserAllRecord(userId);
//                modelMap.put("recordList",recordList);
//            }
//            modelMap.put("success",1);
//            modelMap.put("info","获得下载数据成功！");
//            return modelMap;
//        }
//    @CrossOrigin
//    @RequestMapping(value = "similarFind",method = RequestMethod.GET)
//    @ResponseBody
//    public Map<String,Object> similarFind(HttpServletRequest request){
//        Map<String,Object> modelMap= new HashMap<>();
//        String userString = HttpServletRequestUtil.getString(request,"userString");
//        List<User> userList= userDao.similarFind(userString);
//        modelMap.put("userList",userList);
//        modelMap.put("success",1);
//        modelMap.put("info","搜索结果返回");
//        return modelMap;
//    }
}
