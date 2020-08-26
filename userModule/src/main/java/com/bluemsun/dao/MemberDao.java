package com.bluemsun.dao;

import com.bluemsun.entity.Member;
import com.bluemsun.vo.MemberVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MemberDao {
    List<MemberVo> getMebmerList(@Param("groupId") String groupId);

    void deleteGroup(@Param("groupId") String groupId);

    Member getMember(@Param("groupId") String groupId, @Param("userId") int userId);

    void deleteMember(@Param("groupId") String groupId, @Param("userId") int userId);

    void updateMember(@Param("groupId") String groupId, @Param("userId") int userId, @Param("type") int type);

    void insert(@Param("groupId") String groupId, @Param("userId") Integer userId, @Param("i") int i);

    int checkUser(@Param("userId") Integer userId, @Param("groupId") String groupId);

    int getMebmerListCount(@Param("groupId") String groupId, @Param("search") String search);

    List<MemberVo> getMebmerList2(@Param("groupId") String groupId, @Param("search") String search, @Param("startIndex") int startIndex, @Param("pageSize") int pageSize);
}
