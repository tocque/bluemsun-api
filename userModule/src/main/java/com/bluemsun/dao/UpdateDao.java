package com.bluemsun.dao;

import com.bluemsun.entity.Update;
import com.bluemsun.vo.NotifyVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UpdateDao {
    List<NotifyVo> getOneUserNotify(@Param("userId") Integer userId, @Param("startIndex") int startIndex, @Param("pageSize") int pageSize);

    int insert(Update update);

    NotifyVo getNotify(@Param("id") Integer id);

    int getListCount(@Param("userId") Integer userId);
}
