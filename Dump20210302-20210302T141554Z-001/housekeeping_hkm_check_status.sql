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
-- Table structure for table `hkm_check_status`
--

DROP TABLE IF EXISTS `hkm_check_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_check_status` (
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
  `display_index` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_19d05d0804175434e2233c00574` (`parentId`),
  CONSTRAINT `FK_19d05d0804175434e2233c00574` FOREIGN KEY (`parentId`) REFERENCES `hkm_check_status` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_check_status`
--

LOCK TABLES `hkm_check_status` WRITE;
/*!40000 ALTER TABLE `hkm_check_status` DISABLE KEYS */;
INSERT INTO `hkm_check_status` VALUES ('0ec8e2b5-1d58-40bb-909d-88fa1b9d123f','Đã kiểm tra','kiểm tra',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:12:50','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:26',NULL,0,NULL,NULL),('14e8d2eb-ee27-48af-a628-a0224c20752d','Đã kiểm tra','kiểm tra',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:14:16','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:28',NULL,0,NULL,NULL),('1bbbba93-1389-443a-925f-979cda271d43','Đã kiểm tra','kiểm tra',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:17:47','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:30',NULL,0,NULL,NULL),('3424d510-8e58-4908-aa94-cfb42496969e','Đã kiểm tra','kiểm tra',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:24:03','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:32',NULL,0,NULL,NULL),('371d579b-be8b-467c-b7b7-f78bb8f76313','Đã kiểm tra','kiểm tra',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:19:51','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:34',NULL,0,NULL,NULL),('3a3763f7-a057-4435-99e7-961d892d164e','Đã kiểm tra','kiểm tra',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:15:48','10ef00e6-3219-44be-b83e-a9604bea4153','a4f98b9b-1be1-456b-aaf7-dd58b1b0e67e','2020-12-18 15:15:48',NULL,0,NULL,NULL),('489ff567-13e2-4088-83e2-f3e2ccd21310','Đã kiểm tra','kiểm tra',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:09:22','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:36',NULL,0,NULL,NULL),('4a69b7b1-2c36-4c99-ba08-4ece38e4b7f7','Đã kiểm tra','kiểm tra',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 14:21:41','10ef00e6-3219-44be-b83e-a9604bea4153',NULL,'2020-12-18 14:21:41',NULL,0,NULL,NULL),('6528c635-0110-4602-880d-78f3913258d3','Đã kiểm tra','kiểm tra',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:21:52','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:38',NULL,0,NULL,NULL),('76a0a4b2-79cf-4dc2-bf5e-f362e4c8d43e','Chưa kiểm tra','kiểm tra',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:21:10','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-12 14:20:25',NULL,0,'red',NULL),('a795d987-23e6-4dea-99bf-3b4b89e805bb','Đang kiểm tra','kiểm tra',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:40:24','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-12 14:20:35',NULL,0,'blue',NULL),('d666e058-c734-4b82-8784-b0393fd467ef','Đã kiểm tra','kiểm tra',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:29:19','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-12 14:20:30',NULL,0,'green',NULL),('da7236a5-8a63-42d4-a253-3bd6892ffd6a','Đã kiểm tra','kiểm tra',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:10:35','10ef00e6-3219-44be-b83e-a9604bea4153','a4f98b9b-1be1-456b-aaf7-dd58b1b0e67e','2020-12-18 15:10:35',NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `hkm_check_status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:01:54
