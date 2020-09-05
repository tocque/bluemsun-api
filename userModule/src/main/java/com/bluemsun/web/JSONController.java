package com.bluemsun.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bluemsun.cache.JedisUtil;
import com.bluemsun.dao.GroupDao;
import com.bluemsun.dao.MemberDao;
import com.bluemsun.dao.UpdateDao;
import com.bluemsun.dao.UserDao;
import com.bluemsun.entity.Member;
import com.bluemsun.entity.Update;
import com.bluemsun.entity.User;
import com.bluemsun.socket.Notify;
import com.bluemsun.util.HttpServletRequestUtil;
import com.bluemsun.vo.MemberVo;
import com.bluemsun.vo.NotifyVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class JSONController {
    @Autowired
    private GroupDao groupDao;
    @Autowired
    private UpdateDao updateDao;
    @Autowired
    private JedisUtil.Strings jedisUtilStrings;
    @Autowired
    private JedisUtil.Keys jedisUtilKeys;
    @Autowired
    private MemberDao memberDao;
    @RequestMapping(value = "json/upload",method = RequestMethod.POST)
    public Map fileUpload(HttpServletRequest request, @RequestParam("jsonFile") MultipartFile file){
        Map<String,Object> map = new HashMap<>();
//        String token = request.getHeader("token");
//        String userString = jedisUtilStrings.get(token);
//        JSONObject userJson = JSON.parseObject(userString);
//        if (userJson==null){
//            map.put("code", UserStateEnum.NOLOGIN.getState());
//            map.put("msg",UserStateEnum.NOLOGIN.getStateInfo());
//            return map;
//        }
//        User user = JSON.toJavaObject(userJson,User.class);
//        if(user.getStatus()==2){
        String groupId = HttpServletRequestUtil.getString(request,"groupId");
        String md5 = HttpServletRequestUtil.getString(request,"md5");
        String token = request.getHeader("token");
        //根据实际情况调整
                String userString = jedisUtilStrings.get(token);
        JSONObject userJson = JSON.parseObject(userString);
        User user = JSON.toJavaObject(userJson, User.class);
        Member member=memberDao.getMember(groupId,user.getUserId());
        if(member==null||member.getType()==3){
            map.put("success",0);
            map.put("info","无权限");
        }
        String realPath = "/var/lib/tomcat8/webapps/jsonStorage";

        //map.put("projectServerPath",projectServerPath);
        //map.put("realPath",realPath);
        String filename = file.getOriginalFilename();
        String extendFilename = filename.substring(filename.lastIndexOf('.'));
        String randomFilename = UUID.randomUUID().toString();
        filename = randomFilename+extendFilename;
        //创建dir
        File file1 = new File(realPath);
        if (!file1.exists()){
            file1.mkdirs();
        }
        try {
            file.transferTo(new File(file1,filename));
        } catch (IOException e) {
            e.printStackTrace();
            map.put("success",0);
            map.put("info","json文件上传失败");
            return map;
        }
        //插入数据库
        Update update = new Update();
        update.setGroupId(groupId);
        update.setUserId(user.getUserId());
        groupDao.updateFile(groupId,md5,"/jsonStorage/"+filename);
        updateDao.insert(update);
        NotifyVo notify = updateDao.getNotify(update.getId());
        List<MemberVo> memberList = memberDao.getMebmerList(groupId);
        //websocket通知
        Notify.sendNotify(notify,memberList);
        map.put("success",1);
        map.put("info","json文件上传成功");
        return map;
//        }
//        else{
//            map.put("code",UserStateEnum.NOADMIN.getState());
//            map.put("msg",UserStateEnum.NOADMIN.getStateInfo());
//        }
//        return map;
    }

}
