# 上传json

## 1.接口描述

接口请求域名:json/upload
上传json文件
请求方式:post

## 2.输入参数

| 参数名称  | 必选  |  类型  |         描述         |
| :-------: | :---: | :----: | :------------------: |
| groupId | 是 | String | 组id |
| md5 | 是 | String | jsonmd5 |
| jsonFile | 是 | file | json文件 |

## 3.输出参数

|  参数名称  |  类型  |         描述         |
| :-------: | :----: | :------------------: |
| success | int | 状态值,1成功,0失败 |
| info | string | 状态描述 |

## 4.用例

### 输入

```json
{
    "groupId":"AXDV64",
    "md5":"asdasdadasd12e312",
    "jsonFile":
}
```

### 输出

```json
{
    "success":1,
    "info":"文件上传成功成功"
}
```

