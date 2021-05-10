-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: housekeeping
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
-- Table structure for table `hkm_room_status`
--

DROP TABLE IF EXISTS `hkm_room_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_room_status` (
  `Id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `delete_flag` tinyint DEFAULT '0',
  `created_by` char(64) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` char(64) DEFAULT NULL,
  `siteId` char(64) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `parentId` varchar(36) DEFAULT NULL,
  `is_default` tinyint NOT NULL DEFAULT '0',
  `color` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_6d3f88d2c7fd7ca298701d5dbbb` (`parentId`),
  CONSTRAINT `FK_6d3f88d2c7fd7ca298701d5dbbb` FOREIGN KEY (`parentId`) REFERENCES `hkm_room_status` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_room_status`
--

LOCK TABLES `hkm_room_status` WRITE;
/*!40000 ALTER TABLE `hkm_room_status` DISABLE KEYS */;
INSERT INTO `hkm_room_status` VALUES ('0c07d212-c6be-4db4-8169-b44bff497257','Phòng co nguoi','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:14:15','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-05 13:43:58',NULL,0,NULL),('19a0bbba-1afb-4dff-ab15-dd1ab15a3956','abc',NULL,1,NULL,'2021-01-11 11:14:27',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-11 11:14:30',NULL,0,NULL),('2bc1f985-d948-4be7-a1d3-a0ff03eff372','Phòng trống','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:21:52','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-05 13:44:05',NULL,0,NULL),('3422ff51-d894-4c84-b18c-07961831241a','Phòng trống','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:10:30','10ef00e6-3219-44be-b83e-a9604bea4153','a4f98b9b-1be1-456b-aaf7-dd58b1b0e67e','2020-12-18 15:10:30',NULL,1,NULL),('35b38777-0407-4cff-ac56-c790f177084c','Phòng trống','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:21:52','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-05 13:44:08',NULL,1,NULL),('38baf2b1-52dd-44fc-8c1e-074db26b7169','Phòng trống','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:29:19','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:42:03',NULL,0,NULL),('54449be5-d3c8-429f-88d9-e1bf4a54b5cb','Phòng trống','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:19:51','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:42:06',NULL,0,NULL),('58b353ad-01e5-40f2-9de8-89b53da11a49','Phòng trống','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:17:46','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:42:08',NULL,0,NULL),('62a7254d-6e3c-4962-ab08-0a06eb0aaf5b','Phòng trống','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:29:19','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:42:10',NULL,1,NULL),('64df5256-4f9d-4ceb-a844-327e4434d540','Phòng trống','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 14:21:40','10ef00e6-3219-44be-b83e-a9604bea4153',NULL,'2020-12-18 14:21:40',NULL,1,NULL),('6fd1e18b-c7c6-4629-a6a8-b81065973d58','Phòng trống','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:09:04','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:42:12',NULL,0,NULL),('7e5a04e8-754c-479f-873d-88ea6a3ba1ce','Phòng trống','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:40:24','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:42:14',NULL,0,NULL),('7eda0c30-9808-4297-ae70-948d55326644','Phòng trống','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:21:10','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-05 13:43:38',NULL,1,NULL),('8797df75-8ed8-4c65-9ead-2eb8fc303aa4','Phòng trống','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 14:40:39','10ef00e6-3219-44be-b83e-a9604bea4153','1','2020-12-05 14:40:39',NULL,0,NULL),('a55e13ad-3768-436e-8be9-7b38e575ce09','Phòng trống','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:21:10','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-05 13:43:41',NULL,0,NULL),('b5691e69-7f2f-466b-81d4-11fb85074d73','Phòng trống','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:15:48','10ef00e6-3219-44be-b83e-a9604bea4153','a4f98b9b-1be1-456b-aaf7-dd58b1b0e67e','2020-12-18 15:15:48',NULL,0,NULL),('c9c617f4-7112-4735-b036-aed653729182','Phòng trống','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:15:48','10ef00e6-3219-44be-b83e-a9604bea4153','a4f98b9b-1be1-456b-aaf7-dd58b1b0e67e','2020-12-18 15:15:48',NULL,1,NULL),('cea205e9-32f8-4721-9417-54cd53bd4513','Phòng trống','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:10:32','10ef00e6-3219-44be-b83e-a9604bea4153','a4f98b9b-1be1-456b-aaf7-dd58b1b0e67e','2020-12-18 15:10:32',NULL,0,NULL),('d3581144-73cc-45c3-9154-f3b04fe61b3b','Phòng trống','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 14:21:41','10ef00e6-3219-44be-b83e-a9604bea4153',NULL,'2020-12-18 14:21:41',NULL,0,NULL),('dceeb6d4-6063-43c9-b3b1-4be21e3c9669','Phòng trống','Phòng không có người ở',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:40:24','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-13 10:32:07',NULL,1,'red'),('df2b3630-ac3e-4043-9ecc-46b99e2fcb48','Có người','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 10:03:31','10ef00e6-3219-44be-b83e-a9604bea4153','1','2020-12-05 10:03:31',NULL,0,NULL),('e423fd13-24f5-432f-b227-43c547f51cc0','Khách trong phòng','Khách có ở trong phòng',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:24:02','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-13 10:31:49',NULL,1,'blue'),('e67835c9-1a9f-4abd-8a74-91e43069fa3c','Khách ra ngoài','Khách không có ở trong phòng',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:12:49','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-12 15:56:34',NULL,0,'green'),('e95832a4-00f4-471a-9594-14d628b0041e','Phòng trống','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:24:03','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:42:17',NULL,0,NULL),('f1bf9f46-402f-416d-938e-e519760d158d','string','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 10:01:41','10ef00e6-3219-44be-b83e-a9604bea4153','1','2020-12-05 10:01:41',NULL,0,NULL);
/*!40000 ALTER TABLE `hkm_room_status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:01:53
