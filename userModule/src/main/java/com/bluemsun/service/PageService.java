package com.bluemsun.service;

import com.bluemsun.entity.Page;

public interface PageService {
    Page userPage(int pageNum);
    Page recordPage(int pageNum,int userId);
}
