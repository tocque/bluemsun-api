package com.bluemsun.socket;

import com.alibaba.fastjson.JSON;
import com.bluemsun.entity.Update;
import com.bluemsun.vo.MemberVo;
import com.bluemsun.vo.NotifyVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

//websocket不是单例模式，spring会自动建立多个实例
@Component
@ServerEndpoint(value = "/notify/{userId}")
public class Notify {

    private static Logger logger = LoggerFactory.getLogger(Notify.class);
    private Integer userId;
    private Session session;
    private static Map<Integer,Notify> userList = new ConcurrentHashMap();

    @OnOpen
    public void onOpen(@PathParam("userId") Integer userId, Session session) {
        if(userId!=null||userId!=0){
            logger.info("现在连接的客户编码为：" + userId);
            this.userId = userId;
            this.session = session;
            userList.put(userId,this);
            Map<String,Object> modelMap = new HashMap<>();
            modelMap.put("success",1);
            modelMap.put("info","websocket连接成功");
            String modelString = JSON.toJSONString(modelMap);
            session.getAsyncRemote().sendText(modelString);
        }
    }
    @OnClose
    public void onClose() {
        Map<String,Object> modelMap = new HashMap<>();
        modelMap.put("success",1);
        modelMap.put("info","websocket断开成功");
        String modelString = JSON.toJSONString(modelMap);
        session.getAsyncRemote().sendText(modelString);
        logger.info("连接：{} 关闭", this.userId);
    }

    @OnError
    public void onError( Throwable error) {
        logger.debug("用户id为：{}的连接发送错误", this.userId);
        error.printStackTrace();
    }

    public static void sendNotify(NotifyVo notify, List<MemberVo> userIdList){
        for(MemberVo i : userIdList){
            if(userList.get(i.getUserId())!=null){
                Map<String,Object> modelMap = new HashMap<>();
                modelMap.put("success",1);
                modelMap.put("info","有新消息");
                modelMap.put("update",notify);
                String modelString = JSON.toJSONString(modelMap);
                userList.get(i.getUserId()).session.getAsyncRemote().sendText(modelString);
                logger.info("连接：{} 发送", i.getUserId());
            }
        }
}
}
