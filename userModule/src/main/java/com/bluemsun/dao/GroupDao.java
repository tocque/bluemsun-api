package com.bluemsun.dao;

import com.bluemsun.entity.Group;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GroupDao {

    void deleteGroup(@Param("groupId") String groupId);

    void updateGroup (@Param("groupId") String groupId, @Param("name") String name);

    void insert(@Param("groupId") String groupId, @Param("name") String name);

    int checkGroup(@Param("groupId") String groupId);

    List<Group> getGroupByUser(Integer userId);

    int updateFile(@Param("groupId") String groupId, @Param("md5") String md5, @Param("s") String s);
}
