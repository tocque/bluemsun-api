package com.bluemsun.dao;

import com.bluemsun.entity.Record;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

public interface RecordDao {
    /**
     * 插入登录数据
     * @param userId
     * @param loginTime
     * @param ip
     * @return
     */
    int insertRecord(@Param("userId") int userId, @Param("loginTime") Date loginTime,@Param("ip") String ip);

    /**
     * 获得用户登录记录
     * @param userId
     * @return
     */
    List<Record> getRecord(@Param("userId") int userId,@Param("startIndex") int startIndex,@Param("pageSize") int pageSize);

    /**
     * 获得记录数
     * @param userId
     * @return
     */
    int gerRecordCount(@Param("userId") int userId);

    /**
     * 删除所有记录
     * @param userId
     * @return
     */
    int deleteUserRecord(@Param("userId")int userId);

    /**
     * 获得所有记录
     * @param userId
     * @return
     */
    List<Record> getUserAllRecord(@Param("userId")int userId);
}
