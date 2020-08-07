package com.bluemsun.aop;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.Arrays;

/**
 * @Author:dongml
 * @Description:
 * @Date:10:57 2019/12/16
 */
@Aspect
@Component
public class Log {
    @Pointcut("execution(* com.bluemsun.web.*.*(..))")
    public void declarePointCut(){}

    private static Logger logger = LoggerFactory.getLogger(Log.class);
    @Before("declarePointCut()")
    public void before(JoinPoint joinPoint){
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        logger.info("开始执行"+methodName+"with"+Arrays.asList(args));
    }

    @After("declarePointCut()")
    public void after(JoinPoint joinPoint){
        String methodName = joinPoint.getSignature().getName();
        logger.info(methodName+"执行结束");
    }

}
