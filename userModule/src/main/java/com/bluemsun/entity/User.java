package com.bluemsun.entity;

import java.util.Date;

public class User {
    private String username;
    private String password;
//    private Integer status;
//    private Integer available;
    private Integer userId;
    private Date createTime;
//    private Date lastEditTime;
    private String email;
//    private Integer securityQuestion;
//    private String questionAnswer;

//    public Date getLastEditTime() {
//        return lastEditTime;
//    }
//
//    public void setLastEditTime(Date lastEditTime) {
//        this.lastEditTime = lastEditTime;
//    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

//    public Integer getSecurityQuestion() {
//        return securityQuestion;
//    }
//
//    public void setSecurityQuestion(Integer securityQuestion) {
//        this.securityQuestion = securityQuestion;
//    }
//
//    public String getQuestionAnswer() {
//        return questionAnswer;
//    }
//
//    public void setQuestionAnswer(String questionAnswer) {
//        this.questionAnswer = questionAnswer;
//    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    public Integer getStatus() {
//        return status;
//    }
//
//    public void setStatus(Integer status) {
//        this.status = status;
//    }
//
//    public Integer getAvailable() {
//        return available;
//    }
//
//    public void setAvailable(Integer available) {
//        this.available = available;
//    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
