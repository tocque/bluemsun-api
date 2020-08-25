package com.bluemsun.web;

import com.bluemsun.cache.JedisUtil;
import com.bluemsun.dao.GroupDao;
import com.bluemsun.dao.MemberDao;
import com.bluemsun.entity.Member;
import com.bluemsun.entity.User;
import com.bluemsun.util.HttpServletRequestUtil;
import com.bluemsun.vo.MemberVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/groupAdmin")
public class GroupAdminController {
    @Autowired
    private GroupDao groupDao;
    @Autowired
    private MemberDao memberDao;
    @Autowired
    private JedisUtil.Strings jedisUtilStrings;
    @Autowired
    private JedisUtil.Keys jedisUtilKeys;
@RequestMapping(value ="/showMember",method = RequestMethod.GET)
    public Map<String,Object> showMember(HttpServletRequest request){
    Map<String,Object> modelMap = new HashMap<>();
    String groupId = HttpServletRequestUtil.getString(request,"groupId");
    List<MemberVo> memberList = memberDao.getMebmerList(groupId);
    modelMap.put("success",1);
    modelMap.put("info","获取用户列表成功");
    modelMap.put("memberList",memberList);
    return modelMap;
}
    @RequestMapping(value ="/delete",method = RequestMethod.GET)
    public Map<String,Object> delete(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        String groupId = HttpServletRequestUtil.getString(request,"groupId");
        groupDao.deleteGroup(groupId);
        memberDao.deleteGroup(groupId);
        modelMap.put("success",1);
        modelMap.put("info","删除成功");
        return modelMap;
    }
    @RequestMapping(value ="/modify",method = RequestMethod.GET)
    public Map<String,Object> modify(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        String groupId = HttpServletRequestUtil.getString(request,"groupId");
        String name = HttpServletRequestUtil.getString(request,"name");
        groupDao.updateGroup(groupId,name);
        modelMap.put("success",1);
        modelMap.put("info","修改成功");
        return modelMap;
    }
    @RequestMapping(value ="/deleteMember",method = RequestMethod.GET)
    public Map<String,Object> deleteMember(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        String groupId = HttpServletRequestUtil.getString(request,"groupId");
        int userId = HttpServletRequestUtil.getInt(request,"userId");
        Member member=memberDao.getMember(groupId,userId);
        if(member==null){
            modelMap.put("success",0);
            modelMap.put("info","成员不存在");
            return modelMap;
        }
        if(member.getType()==1){
            modelMap.put("success",0);
            modelMap.put("info","权限不足");
            return modelMap;
        }
        memberDao.deleteMember(groupId,userId);
        modelMap.put("success",1);
        modelMap.put("info","删除相应用户成功");
        return modelMap;
    }
    @RequestMapping(value ="/manageMember",method = RequestMethod.GET)
    public Map<String,Object> manageMember(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        String groupId = HttpServletRequestUtil.getString(request,"groupId");
        int userId = HttpServletRequestUtil.getInt(request,"userId");
        int type = HttpServletRequestUtil.getInt(request,"type");
        Member member=memberDao.getMember(groupId,userId);
        if(member==null){
            modelMap.put("success",0);
            modelMap.put("info","成员不存在");
            return modelMap;
        }
        if(member.getType()==1){
            modelMap.put("success",0);
            modelMap.put("info","权限不足");
            return modelMap;
        }
        memberDao.updateMember(groupId,userId,type);
        modelMap.put("success",1);
        modelMap.put("info","修改成功");
        return modelMap;
    }

}
