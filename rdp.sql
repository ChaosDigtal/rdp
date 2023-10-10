/*
 Navicat Premium Data Transfer

 Source Server         : management
 Source Server Type    : MySQL
 Source Server Version : 80100 (8.1.0)
 Source Host           : localhost:3306
 Source Schema         : rdp

 Target Server Type    : MySQL
 Target Server Version : 80100 (8.1.0)
 File Encoding         : 65001

 Date: 10/10/2023 21:30:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for connections
-- ----------------------------
DROP TABLE IF EXISTS `connections`;
CREATE TABLE `connections`  (
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `connectionType` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `connectionUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `connectionStatus` enum('online','offline') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `connectionImage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of connections
-- ----------------------------
INSERT INTO `connections` VALUES ('Fantasy', 'Full Control', 'https://fantasy.com', 'online', 'fantasy.jpg', 'Hey, there! I am Fantasy.');
INSERT INTO `connections` VALUES ('Yoga', 'View Only', 'https://yoga.com', 'online', 'yoga.jpg', 'Hey, there! I am Yoga.');
INSERT INTO `connections` VALUES ('Jacob', 'VIew Only', 'https://jacob.com', 'offline', 'jacob.jpg', 'Hey, there! I am Jacob.');
INSERT INTO `connections` VALUES ('Yamamoto', 'Full Control', 'https://yamamoto.com', 'online', 'yamamoto.jpg', 'Hey, there! I am Yamamoto.');
INSERT INTO `connections` VALUES ('Slobodan', 'View Only', 'https://slobodan.com', 'offline', 'slobodan.jpg', 'Hey, there! I am Slobodan.');
INSERT INTO `connections` VALUES ('Jake', 'Full Control', 'https://jake.com', 'online', 'jake.jpg', 'Hey, there! I am Jake.');
INSERT INTO `connections` VALUES ('James', 'View Only', 'https://james.com', 'online', 'james.jpg', 'Hey, there! I am James.');
INSERT INTO `connections` VALUES ('Hamilton', 'Full Control', 'https://hamilton.com', 'offline', 'hamilton.jpg', 'Hey, there! I am Hamilton.');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('Digital Chaos', 'digitalchaos2003@gmail.com');
INSERT INTO `users` VALUES ('Creative Dev', 'creativedev0809@gmail.com');

SET FOREIGN_KEY_CHECKS = 1;
