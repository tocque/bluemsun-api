package com.bluemsun.service.impl;

import com.bluemsun.dao.UserDao;
import com.bluemsun.dao.RecordDao;
import com.bluemsun.entity.Page;
import com.bluemsun.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PageServiceImpl implements PageService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private RecordDao recordDao;
   public Page userPage(int pageNum){
        int totalRecord = userDao.getUserCount();
       int pageSize = 15;
       Page page = new Page(pageNum,pageSize,totalRecord);
       return page;
    }

    @Override
    public Page recordPage(int pageNum,int userId) {
        int totalRecord = recordDao.gerRecordCount(userId);
        int pageSize = 10;
        Page page = new Page(pageNum,pageSize,totalRecord);
        return page;
    }
}
