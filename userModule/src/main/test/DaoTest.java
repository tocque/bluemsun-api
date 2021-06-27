import com.bluemsun.dao.UserDao;
import com.bluemsun.entity.User;
import com.bluemsun.util.MD5Util;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.Random;

public class DaoTest extends BaseTest {
@Autowired
private UserDao userDao;
    private static Logger logger = LoggerFactory.getLogger(DaoTest.class);
    @Test
public void testUserDao(){
//       for(int i = 100;i>0;i--){
//           User user = new User();
//           user.setUsername("user"+i);
//           user.setSecurityQuestion(i%10+1);
//           user.setEmail(1000+""+i+"@qq.com");
//           user.setCreateTime( new Date(System.currentTimeMillis()));
//           user.setLastEditTime(new Date(System.currentTimeMillis()));
//           String password = MD5Util.getMd5("password"+i,32);
//           user.setPassword(password);
//           String answer=MD5Util.getMd5("answer"+i,32);
//           user.setQuestionAnswer(answer);
//          userDao.uploadRegisterInfo(user);
//           //1为普通用户2为管理员
//           int status;
//           int available;
//           Random r = new Random();
//           status =(i+r.nextInt(1000000))%2+1;
//           if(status==2){
//                available=1;
//           }else available = (i+r.nextInt(1000000))%3; ;
//           //0为验证邮箱，1为可用，2为封号
//           Date d =new Date(System.currentTimeMillis());
//           System.out.println(d);
//           System.out.println(user.getCreateTime());
//           System.out.println(user.getLastEditTime());
//           userDao.UpdateUserAvailableAndStatus(user.getUserId(),available,status);       }
//   int a = userDao.UpdateUserAvai lableAndStatus(2,1,1);
//   System.out.println(a);
//   Integer b = userDao.getUserAvailable("aa");
//   System.out.println(b);
//    logger.info("kkkk");
//  List<User> userList = userDao.listNowUser(0,15);
//   for(User user : userList){
//       System.out.println(user.getUserName());}
   // user=userDao.getUserInfo(1);
    //System.out.println(user.getUserName());
//    List<Copy> copyList = copyDao.listOneHomeworkAllCopy(3);
//    for (Copy c: copyList){
//        System.out.println(c.getUserId());
//        User user = userDao.getUserInfo(c.getUserId());
//        System.out.println(user.getUserName());
//        System.out.println(c.getBelongHomework().getHomeworkName());
//    }
//    List<Homework> homeworkList = homeworkDao.listNowHomework(0,15,null);
//    for (Homework h:homeworkList){
//        System.out.println(h.getHomeworkName());
//    }
}

}
