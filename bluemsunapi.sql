/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50716
 Source Host           : 127.0.0.1:3306
 Source Schema         : bluemsunapi

 Target Server Type    : MySQL
 Target Server Version : 50716
 File Encoding         : 65001

 Date: 26/08/2020 17:10:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_group
-- ----------------------------
DROP TABLE IF EXISTS `tb_group`;
CREATE TABLE `tb_group`  (
  `group_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `group_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `json_file` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `md5` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NOT NULL,
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_group
-- ----------------------------
INSERT INTO `tb_group` VALUES ('2', 'a', '/jsonStorage/375cea17-a290-4749-be54-d17c74820a69.log', 'sjifengkalj', '0000-00-00 00:00:00');
INSERT INTO `tb_group` VALUES ('460379', '修改项目名', NULL, NULL, '0000-00-00 00:00:00');
INSERT INTO `tb_group` VALUES ('7db337', '蓝旭工作室答题系统', NULL, NULL, '0000-00-00 00:00:00');
INSERT INTO `tb_group` VALUES ('9f3059', '答题系统', NULL, NULL, '2020-08-26 10:54:58');
INSERT INTO `tb_group` VALUES ('f0f393', 'asdasds', NULL, NULL, '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for tb_member
-- ----------------------------
DROP TABLE IF EXISTS `tb_member`;
CREATE TABLE `tb_member`  (
  `group_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` int(10) NOT NULL,
  `type` int(10) NOT NULL,
  PRIMARY KEY (`group_id`, `user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_member
-- ----------------------------
INSERT INTO `tb_member` VALUES ('2', 4, 1);
INSERT INTO `tb_member` VALUES ('2', 5, 1);
INSERT INTO `tb_member` VALUES ('460379', 6, 1);
INSERT INTO `tb_member` VALUES ('7db337', 6, 1);
INSERT INTO `tb_member` VALUES ('9f3059', 5, 3);
INSERT INTO `tb_member` VALUES ('9f3059', 6, 1);
INSERT INTO `tb_member` VALUES ('f0f393', 6, 1);

-- ----------------------------
-- Table structure for tb_record
-- ----------------------------
DROP TABLE IF EXISTS `tb_record`;
CREATE TABLE `tb_record`  (
  `user_id` int(10) NOT NULL,
  `login_time` datetime(0) NOT NULL,
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `record_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`record_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 267 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_record
-- ----------------------------
INSERT INTO `tb_record` VALUES (4, '2020-08-25 16:12:53', '0:0:0:0:0:0:0:1', 220);
INSERT INTO `tb_record` VALUES (4, '2020-08-25 17:10:46', '0:0:0:0:0:0:0:1', 221);
INSERT INTO `tb_record` VALUES (4, '2020-08-25 17:14:51', '0:0:0:0:0:0:0:1', 222);
INSERT INTO `tb_record` VALUES (4, '2020-08-25 18:01:34', '0:0:0:0:0:0:0:1', 223);
INSERT INTO `tb_record` VALUES (4, '2020-08-25 18:19:21', '0:0:0:0:0:0:0:1', 224);
INSERT INTO `tb_record` VALUES (4, '2020-08-25 18:58:56', '0:0:0:0:0:0:0:1', 225);
INSERT INTO `tb_record` VALUES (5, '2020-08-25 20:20:55', '0:0:0:0:0:0:0:1', 226);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 09:31:43', '192.168.199.143', 227);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 09:33:59', '192.168.199.143', 228);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 09:35:02', '192.168.199.143', 229);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 09:39:01', '192.168.199.143', 230);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 09:40:12', '192.168.199.143', 231);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 09:40:43', '192.168.199.143', 232);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 09:41:21', '192.168.199.143', 233);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 09:41:46', '192.168.199.143', 234);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 09:42:06', '192.168.199.143', 235);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 09:44:06', '192.168.199.143', 236);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 09:57:11', '192.168.199.143', 237);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 10:09:31', '192.168.199.143', 238);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 10:13:45', '192.168.199.143', 239);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 10:28:36', '192.168.199.143', 240);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 10:36:55', '192.168.199.143', 241);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 10:46:22', '192.168.199.143', 242);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 10:46:30', '192.168.199.143', 243);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 10:46:55', '192.168.199.143', 244);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 10:48:44', '192.168.199.143', 245);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 10:49:46', '192.168.199.143', 246);
INSERT INTO `tb_record` VALUES (5, '2020-08-26 10:56:06', '192.168.199.143', 247);
INSERT INTO `tb_record` VALUES (5, '2020-08-26 10:56:11', '192.168.199.143', 248);
INSERT INTO `tb_record` VALUES (5, '2020-08-26 11:04:48', '192.168.199.143', 249);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 11:05:07', '192.168.199.143', 250);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 11:05:46', '192.168.199.143', 251);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 11:06:09', '192.168.199.143', 252);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 11:06:44', '192.168.199.143', 253);
INSERT INTO `tb_record` VALUES (5, '2020-08-26 15:46:50', '192.168.199.143', 254);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 15:54:11', '192.168.199.143', 255);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 15:55:13', '192.168.199.143', 256);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 15:57:05', '192.168.199.143', 257);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 15:58:02', '192.168.199.143', 258);
INSERT INTO `tb_record` VALUES (5, '2020-08-26 15:59:53', '192.168.199.143', 259);
INSERT INTO `tb_record` VALUES (5, '2020-08-26 16:02:12', '192.168.199.143', 260);
INSERT INTO `tb_record` VALUES (5, '2020-08-26 16:04:29', '192.168.199.143', 261);
INSERT INTO `tb_record` VALUES (5, '2020-08-26 16:07:36', '192.168.199.143', 262);
INSERT INTO `tb_record` VALUES (5, '2020-08-26 16:09:30', '192.168.199.143', 263);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 16:09:55', '192.168.199.143', 264);
INSERT INTO `tb_record` VALUES (5, '2020-08-26 16:48:24', '192.168.199.143', 265);
INSERT INTO `tb_record` VALUES (6, '2020-08-26 17:01:50', '192.168.199.143', 266);

-- ----------------------------
-- Table structure for tb_update
-- ----------------------------
DROP TABLE IF EXISTS `tb_update`;
CREATE TABLE `tb_update`  (
  `group_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` int(10) NOT NULL,
  `update_time` datetime(0) NOT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_update
-- ----------------------------
INSERT INTO `tb_update` VALUES ('2', 4, '2020-08-12 20:40:00', 2);
INSERT INTO `tb_update` VALUES ('2', 5, '2020-08-25 20:39:47', 3);
INSERT INTO `tb_update` VALUES ('d09d92', 4, '2020-08-25 20:47:03', 4);
INSERT INTO `tb_update` VALUES ('d09d92', 4, '2020-08-25 20:47:08', 5);
INSERT INTO `tb_update` VALUES ('d09d92', 4, '2020-08-25 20:47:09', 6);
INSERT INTO `tb_update` VALUES ('2', 4, '2020-08-25 20:50:37', 7);
INSERT INTO `tb_update` VALUES ('2', 4, '2020-08-25 20:52:08', 8);
INSERT INTO `tb_update` VALUES ('2', 4, '2020-08-25 21:13:35', 9);
INSERT INTO `tb_update` VALUES ('2', 4, '2020-08-25 21:16:37', 10);
INSERT INTO `tb_update` VALUES ('2', 4, '2020-08-25 21:17:52', 11);
INSERT INTO `tb_update` VALUES ('2', 4, '2020-08-25 21:20:21', 12);
INSERT INTO `tb_update` VALUES ('2', 4, '2020-08-25 21:25:26', 13);

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user`  (
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_time` datetime(0) NOT NULL,
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('myname', '937669965@qq.com', 'test', '2020-08-25 16:12:52', 4);
INSERT INTO `tb_user` VALUES ('sss', '1', '1', '2020-08-25 20:20:17', 5);
INSERT INTO `tb_user` VALUES ('潘炳名', '2544967914@qq.com', '123123', '2020-08-26 09:31:43', 6);

SET FOREIGN_KEY_CHECKS = 1;
