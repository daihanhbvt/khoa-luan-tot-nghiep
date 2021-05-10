-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: identity
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `prd_user`
--

DROP TABLE IF EXISTS `prd_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prd_user` (
  `Id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `delete_flag` tinyint DEFAULT '0',
  `created_by` char(64) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` char(64) DEFAULT NULL,
  `siteId` char(64) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `avatar` varchar(150) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `adress` varchar(150) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `parentId` varchar(36) DEFAULT NULL,
  `code` varchar(6) DEFAULT NULL,
  `is_verified` tinyint DEFAULT '0',
  `company_id` varchar(64) DEFAULT NULL,
  `group_user_id` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_466b051a97f9594bb0bb61bc9ce` (`parentId`),
  KEY `FK_d0a47c0dcbce9d2effb6bbb0a5c` (`company_id`),
  KEY `FK_477f283890acb9229f38deb80f2` (`group_user_id`),
  CONSTRAINT `FK_466b051a97f9594bb0bb61bc9ce` FOREIGN KEY (`parentId`) REFERENCES `prd_user` (`Id`),
  CONSTRAINT `FK_477f283890acb9229f38deb80f2` FOREIGN KEY (`group_user_id`) REFERENCES `prd_group_user` (`Id`),
  CONSTRAINT `FK_d0a47c0dcbce9d2effb6bbb0a5c` FOREIGN KEY (`company_id`) REFERENCES `prd_company` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prd_user`
--

LOCK TABLES `prd_user` WRITE;
/*!40000 ALTER TABLE `prd_user` DISABLE KEYS */;
INSERT INTO `prd_user` VALUES ('42d75edc-be6b-4a7b-b7f1-3e8633f12840','Nguyễn Hải Đăng',NULL,0,NULL,'2021-01-25 15:58:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-25 17:06:20',NULL,'1988-05-02','1212121211','hangtun123@gmail.com','Nam','manager','38 Nguyễn Lộ Trạch','Hang Tun','ad069f798c2f5f2d569df3e7a97f',NULL,'q86zqZ',0,NULL,NULL),('4993d565-fd7e-4034-b015-c5c31e1d6bb3','Đặng Ngọc Thạch',NULL,0,NULL,'2021-01-25 14:33:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-25 17:18:04',NULL,'1985-12-01','0899618723','htlipstick@gmail.com2','Nam','manager','28 Tôn Thất Dương Kỵ, Huế','a','d455c2',NULL,'ytTVca',1,'06481330-2bf6-45ac-adff-5e52824f75e4',NULL),('874f9d00-85c2-4f19-9279-ff3a6fe09e96',NULL,NULL,1,NULL,'2021-01-25 13:38:17',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-25 16:15:08',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AEuFcz',0,'06481330-2bf6-45ac-adff-5e52824f75e4',NULL),('8bc323f4-24f7-47cb-ad9c-1cebf85e1cf0',NULL,NULL,1,NULL,'2021-01-25 16:02:15',NULL,NULL,'2021-01-25 17:02:05',NULL,NULL,'ewe','htlipstick@gmail.com',NULL,NULL,NULL,'Hang Tun','9410836f8f28',NULL,'UbhcTZ',0,NULL,NULL),('91e0cb0c-6523-4581-a453-b3f21d3663c5',NULL,NULL,1,NULL,'2021-01-25 16:14:10',NULL,NULL,'2021-01-25 17:02:11',NULL,NULL,'0971461877','17k4081013@hce.edu.vn',NULL,NULL,NULL,'Hang Tun','ad069f798c2f5f2d569df3e7a97f',NULL,'7eBOMU',0,NULL,NULL),('baca06e1-1926-4083-8947-cbfd478e201f','Bùi Thị Thu Hằng',NULL,0,NULL,'2021-01-15 18:57:18',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-25 13:40:03',NULL,'1999-09-02','0971461877','hangtun1231@gmail.com','Nữ','admin','Bắc Hồng - Hồng Lĩnh - Hà Tĩnh','hangtun','',NULL,'lPxmLo',1,'06481330-2bf6-45ac-adff-5e52824f75e4',NULL),('bhsunh4-1999-nj45-moni-ndu54iomnd25','Phạm Thanh Vy',NULL,0,NULL,'2021-01-22 14:19:41',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 14:19:41',NULL,'1972-12-01','0385381368','thanhvy@gmail.com','Nữ','employee','20 Tôn Thất Dương Kỵ','thanhthanh',NULL,NULL,NULL,0,'06481330-2bf6-45ac-adff-5e52824f75e4',NULL),('cedf06e1-1935-4083-8947-cbfd478e154d','Phan Đăng Quang','Nhân viên',0,NULL,'2021-01-14 09:56:23',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 20:16:50',NULL,'1992-08-12','0365245877','quang@gmail.com','Nam','employee','Huế','quangdang','ad069f798c2f5f2d569df3e8n32j',NULL,'Unuiod',1,'06481330-2bf6-45ac-adff-5e52824f75e4',NULL),('e11c9c2f-9ac6-4898-b3ef-cce4cfc6ae35','Nguyễn Thị Nhung','Quản lý phân công công việc cho nhân viên',0,NULL,'2020-12-18 13:48:48',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-25 15:29:39',NULL,'1982-07-12','0971654288','htlipstick@gmail.com1','Nữ','admin','Đức Thuận - Hà Tĩnh','strindfdg','ad069f798c2f5f2d569df3e7a97f',NULL,'KmjxmY',1,'06481330-2bf6-45ac-adff-5e52824f75e4',NULL),('e47bc0d5-fece-4a24-b282-b216e300c69b',NULL,NULL,1,NULL,'2021-01-25 13:43:00',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-25 16:15:04',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Cyzqr3',0,'06481330-2bf6-45ac-adff-5e52824f75e4',NULL),('f371bf3d-dbcd-420c-bc8e-bc26ae727717',NULL,NULL,1,NULL,'2021-01-25 15:50:23',NULL,NULL,'2021-01-25 16:15:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dfef','ad069f798c2f5f2d569df3e7a97f',NULL,'Ju9mCt',0,NULL,NULL),('f605fb60-4f07-4a18-9911-6287546ee18f',NULL,NULL,1,NULL,'2021-01-25 13:43:39',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-25 16:14:57',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'mQBLvi',0,'06481330-2bf6-45ac-adff-5e52824f75e4',NULL),('hvr546e1-1926-4083-8947-cbfd478e201f','Trần Thị Thu Nhàn',NULL,0,NULL,'2021-01-16 19:45:42',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 20:16:50',NULL,'1999-04-21','0985462544','thunhan2104@gmail.c','Nữ','manager','25 Bà Triệu - Phú Hội - Huế',NULL,NULL,NULL,NULL,0,'06481330-2bf6-45ac-adff-5e52824f75e4',NULL),('kml02c2f-9ac6-4898-b3ef-cce4cfc6ae35','Trần Thị Hân',NULL,0,NULL,'2021-01-16 19:44:06',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 20:16:50',NULL,'1982-03-20','0365245125','hanthi@gmail.com','Nữ','employee','4 Bà Triệu - Phú Hội - Huế',NULL,NULL,NULL,NULL,0,'06481330-2bf6-45ac-adff-5e52824f75e4',NULL),('nb256e1-1926-4083-8947-cbfd478e201f','Phạm Minh Châu',NULL,0,NULL,'2021-01-16 19:36:17',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 20:16:50',NULL,'1998-11-20','0875145266','maichau@gmail.com','Nữ','employee','Mai Thúc Loan - Huế','chaumai',NULL,NULL,NULL,0,'06481330-2bf6-45ac-adff-5e52824f75e4',NULL);
/*!40000 ALTER TABLE `prd_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:02:08
