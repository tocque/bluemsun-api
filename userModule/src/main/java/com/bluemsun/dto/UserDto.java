package com.bluemsun.dto;

import com.bluemsun.entity.User;

import java.util.List;

public class UserDto {
   private List<User> userList;
   private User user;
   private Integer state;
   private String stateInfo;
//出现错误
    public UserDto(Integer state, String stateInfo) {
        this.state = state;
        this.stateInfo = stateInfo;
    }

    public UserDto(User user, Integer state, String stateInfo) {
        this.user = user;
        this.state = state;
        this.stateInfo = stateInfo;
    }

    public UserDto(List<User> userList, Integer state, String stateInfo) {
        this.userList = userList;
        this.state = state;
        this.stateInfo = stateInfo;
    }


    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getStateInfo() {
        return stateInfo;
    }

    public void setStateInfo(String stateInfo) {
        this.stateInfo = stateInfo;
    }
}
