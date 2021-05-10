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
-- Table structure for table `hkm_room_type`
--

DROP TABLE IF EXISTS `hkm_room_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_room_type` (
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
  PRIMARY KEY (`Id`),
  KEY `FK_66b0baeb39d27579ae271068ce3` (`parentId`),
  CONSTRAINT `FK_66b0baeb39d27579ae271068ce3` FOREIGN KEY (`parentId`) REFERENCES `hkm_room_type` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_room_type`
--

LOCK TABLES `hkm_room_type` WRITE;
/*!40000 ALTER TABLE `hkm_room_type` DISABLE KEYS */;
INSERT INTO `hkm_room_type` VALUES ('0de78a77-0b05-4d7f-a58e-50d01ec71f0f','Phòng Vip','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:10:39','10ef00e6-3219-44be-b83e-a9604bea4153','a4f98b9b-1be1-456b-aaf7-dd58b1b0e67e','2020-12-18 15:10:39',NULL,0),('1ffa30e8-faf2-4276-86f1-10f971c57770','Phòng Vip','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:09:54','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:42:54',NULL,0),('4bb4903f-b80f-42ac-ba91-f3cb4d97e333','Phòng Vip','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:40:25','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:42:56',NULL,0),('4d45a30d-2ff6-413e-a506-ab577b01e0cf','Phòng Vip','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:29:20','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:42:59',NULL,0),('504b265b-d487-4cac-9122-ff56ed8c007e','Phòng Vip','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:21:10','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:01',NULL,0),('74b4317b-3689-4025-ba08-0d49d510fa80','Phòng Vip','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:14:16','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:03',NULL,0),('781370b8-87e7-4092-b028-e9560f7cb0af','Phòng Vip','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:15:49','10ef00e6-3219-44be-b83e-a9604bea4153','a4f98b9b-1be1-456b-aaf7-dd58b1b0e67e','2020-12-18 15:15:49',NULL,0),('87933bc2-8eae-4b5b-aec0-40d0e29e04d0','Phòng Vip','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:12:50','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:05',NULL,0),('9bbc3b5a-c7ea-4d27-b08f-d54edeb4fb04','Phòng Vip','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:24:04','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:06',NULL,0),('a064604f-f739-4582-a5a9-a163b897979c','Phòng Vip','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:19:52','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-05 15:19:52',NULL,0),('bcea512f-f7bd-48c1-adc5-893806e45fbf','string','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 14:43:27','10ef00e6-3219-44be-b83e-a9604bea4153','1','2020-12-05 14:43:27',NULL,0),('c0200ef3-6a74-4078-a203-1964ab520310','Phòng thường','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:17:48','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:17',NULL,0),('e9b227d3-2532-4540-9b53-dc6688f6d34d','Phòng Vip','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 14:21:42','10ef00e6-3219-44be-b83e-a9604bea4153',NULL,'2020-12-18 14:21:42',NULL,0),('f38c0458-35f3-42c3-bff7-769e1fd494e1','Phòng Vip','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:21:53','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-09 15:43:09',NULL,0);
/*!40000 ALTER TABLE `hkm_room_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:01:51
