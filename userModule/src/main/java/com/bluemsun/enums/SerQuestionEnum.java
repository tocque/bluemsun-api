package com.bluemsun.enums;

public enum SerQuestionEnum {
    Q1(1,"我的小学班主任叫什么名字"),
    Q2(2,"我现在在哪里上学"),
    Q3(3,"我的父亲叫什么名字"),
    Q4(4,"我的母亲是谁"),
    Q5(5,"我最好的朋友叫什么名字"),
    Q6(6,"我是哪一天出生的"),
    Q7(7,"我的理想是什么"),
    Q8(8,"我最喜欢的东西是什么"),
    Q9(9,"我最看重什么东西"),
    Q10(10,"我小时候的梦想是什么");
    private int state;
    private String stateInfo;
    SerQuestionEnum(int state, String stateInfo) {
        this.state = state;
        this.stateInfo = stateInfo;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getStateInfo() {
        return stateInfo;
    }

    public void setStateInfo(String stateInfo) {
        this.stateInfo = stateInfo;
    }
}
