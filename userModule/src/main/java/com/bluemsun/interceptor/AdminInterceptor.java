package com.bluemsun.interceptor;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bluemsun.cache.JedisUtil;
import com.bluemsun.dao.MemberDao;
import com.bluemsun.entity.Member;
import com.bluemsun.entity.User;
import com.bluemsun.util.HttpServletRequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

public class AdminInterceptor extends HandlerInterceptorAdapter {
    @Autowired
    private JedisUtil.Strings jedisUtilStrings;
    @Autowired
    private JedisUtil.Keys jedisUtilKeys;
    @Autowired
    private MemberDao memberDao;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if ("OPTIONS".equals(request.getMethod())){
            return true;
        }
        Map<String,Object> modelMap = new HashMap<>();
        String token = request.getHeader("token");
        String userString = jedisUtilStrings.get(token);
        JSONObject userJSON = JSON.parseObject(userString);
        User user = JSON.toJavaObject(userJSON,User.class);
        String groupId = HttpServletRequestUtil.getString(request,"groupId");
        Member member=memberDao.getMember(groupId,user.getUserId());
        if(member==null||member.getType()==3||member.getType()==2){
            PrintWriter out = response.getWriter();
            out.print("noAdmin");
            response.setStatus(401);
            out.flush();
            return false;
        }
//        String token = request.getHeader("token");
//        String userString = jedisUtilString.get(token);
//        JSONObject userJSON = JSON.parseObject(userString);
//        User user = JSON.toJavaObject(userJSON,User.class);
//        if (user.getStatus()!=2){
//            PrintWriter out = response.getWriter();
//            out.println("<html>");
//            out.println("<script>");
//            out.println("window.location.href=\"http://blunmsun.work:8080/personPage\"");
//            out.println("</script>");
//             out.println("</html>");
//            return false;
//        }
       return true;
    }
}
