package com.bluemsun.dao;

import com.bluemsun.vo.GroupVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GroupDao {

    void deleteGroup(@Param("groupId") String groupId);

    void updateGroup (@Param("groupId") String groupId, @Param("name") String name);

    void insert(@Param("groupId") String groupId, @Param("name") String name);

    int checkGroup(@Param("groupId") String groupId);

    List<GroupVo> getGroupByUser(@Param("userId") Integer userId, @Param("search") String search, @Param("startIndex") int startIndex, @Param("pageSize") int pageSize);

    int updateFile(@Param("groupId") String groupId, @Param("md5") String md5, @Param("s") String s);

    int getGroupByUserCount(@Param("userId") Integer userId, @Param("search") String search);

    GroupVo getGroup(@Param("groupId") String groupId, @Param("userId") Integer userId);
}
