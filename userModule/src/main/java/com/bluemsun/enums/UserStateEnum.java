package com.bluemsun.enums;

public enum UserStateEnum {
    //登录
    CHECK(0,"用户邮箱等待验证"),
    OFFLINE(-1,"用户已被封禁"),
    SUCCESS(1,"成功登录"),
    NEEDUPDATE(2,"需要修改密码"),
    //NULLUSER(-1001,"该用户未注册"),
    ERORRMSG(-1000,"用户密码或者登录名错误"),
    ERRORCHECK(-1003,"验证码错误"),
//    UNUSUALIP(-1002,"用户IP不为常用登录地"),
//    ALERADYLOGIN(-1003,"用户已登录"),
    NOLOGIN(-1002,"用户未登录"),
    //字段验证
    REPEATMSG(-1,"该用户字段重复"),
    ENABLEMSG(1,"该用户字段可用"),
    //用户注册
    REGISTERSUCCESS(1,"用户注册成功，等待验证邮箱"),
    REGISTERERROR(-1,"用户注册失败，未知错误"),
    //找回密码
    EXIST(1,"该用户存在"),
    NOEXIST(-1,"该用户不存在"),
    UNCHECK(-1000,"用户未审核或者已被封号"),
    //更改密码
    SERDENY(-1000,"密保问题或者原密码错误"),
    SERSAFE(1,"密保通过"),
    PASSWORDUPDATE(1,"密码更新成功"),
    CHECKSERWAR(-1,"密保问题或者验证字段错误"),
    PASSWORDFAIL(-1001,"密码更新失败，服务器端错误"),
    //个人页面
    GETPERSONSUCCESS(1,"获得用户信息成功"),
    GETPESONFAIL(-1,"获得用户信息失败"),
    //用户管理
    SUCCESSGETLIST(1,"获得列表成功"),
    FAILGETLIST(-1,"获得列表失败"),
    SUCCESSUPDATE(1,"成功修改"),
    FAILUPDATE(-1,"修改失败"),
    NOADMIN(-1000,"无操作权限"),
    //邮箱检验
    REGISTERCHECKSUCCESS(1,"邮箱验证成功"),
    REGISTERCHECKFAIL(-1,"邮箱验证超时");
    private int state;
    private String stateInfo;
    UserStateEnum(int state, String stateInfo) {
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
