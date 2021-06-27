package com.bluemsun.schedule;

import com.bluemsun.dao.RecordDao;
import com.bluemsun.dao.UserDao;
import com.bluemsun.entity.Record;
import com.bluemsun.entity.User;
import com.bluemsun.util.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class KillOutTimeUser {
    @Autowired
    private UserDao userDao;
    @Autowired
    private RecordDao recordDao;
//@Scheduled(cron = "0/10 * * * * ? ")
    public void killOutTime(){
//    List<User> userList=userDao.getAllUser();
//    for(User user : userList){
//        if (user.getAvailable()==1){
//            continue;
//        }else if(user.getAvailable()==0){
//            if (TimeUtil.BetweenHour(user.getCreateTime())>=2){
//                userDao.deleteUser(user.getUserId());
//            }else if (user.getAvailable()==-1){
//                if (TimeUtil.BetweenHour(user.getLastEditTime())>=(24*7)){
//                    recordDao.deleteUserRecord(user.getUserId());
//                }
//            }
//        }
//    }
}
}
