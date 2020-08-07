package com.bluemsun.util;

import org.junit.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import static org.junit.Assert.*;

public class TimeUtilTest {

    @Test
    public void betweenDay() throws ParseException {
        SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss" );
        Date date = sdf.parse("2019-02-16 21:27:12" );
        System.out.println(date.getTime());
        System.out.println(System.currentTimeMillis());
        System.out.println((System.currentTimeMillis()-date.getTime())/1000/60/60/24);
        int a=TimeUtil.BetweenDay(date);
        System.out.println(a);
    }

    @Test
    public void betweenHour() throws ParseException{
//        SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss" );
//        Date date = sdf.parse("2019-02-16 21:27:12" );
//        System.out.println(date.getTime());
//        System.out.println(System.currentTimeMillis());
//        System.out.println((System.currentTimeMillis()-date.getTime())/1000/60/60);
//        int a=TimeUtil.BetweenHour(date);
        System.out.println(new Date(System.currentTimeMillis()));
    }

}