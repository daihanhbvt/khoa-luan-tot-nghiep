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
-- Table structure for table `hkm_check_list_template`
--

DROP TABLE IF EXISTS `hkm_check_list_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_check_list_template` (
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
  `room_type_id` varchar(64) DEFAULT NULL,
  `floors_id` varchar(64) DEFAULT NULL,
  `room_id` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `REL_b6401d0fda11206fa1ab1f0be2` (`room_type_id`),
  UNIQUE KEY `REL_4c7b00876bd174b554c5c5b0eb` (`floors_id`),
  UNIQUE KEY `REL_f441c0e1d391f3fffc72dadfb3` (`room_id`),
  KEY `FK_06e88513f931c4652f999119174` (`parentId`),
  CONSTRAINT `FK_06e88513f931c4652f999119174` FOREIGN KEY (`parentId`) REFERENCES `hkm_check_list_template` (`Id`),
  CONSTRAINT `FK_4c7b00876bd174b554c5c5b0eb7` FOREIGN KEY (`floors_id`) REFERENCES `hkm_floors` (`Id`),
  CONSTRAINT `FK_b6401d0fda11206fa1ab1f0be2d` FOREIGN KEY (`room_type_id`) REFERENCES `hkm_room_type` (`Id`),
  CONSTRAINT `FK_f441c0e1d391f3fffc72dadfb35` FOREIGN KEY (`room_id`) REFERENCES `hkm_room` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_check_list_template`
--

LOCK TABLES `hkm_check_list_template` WRITE;
/*!40000 ALTER TABLE `hkm_check_list_template` DISABLE KEYS */;
INSERT INTO `hkm_check_list_template` VALUES ('324ff337-8d2f-4fd8-93dc-40078d2ff5b0','string',NULL,1,NULL,'2021-01-01 15:27:10',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-01 15:33:31',NULL,0,NULL,NULL,NULL),('660ed1a0-0ac6-4eb0-9647-200c69aca3e2','Dọn dẹp phòng Vip tầng 1',NULL,0,NULL,'2021-01-01 15:36:44',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-25 13:14:29',NULL,0,'4bb4903f-b80f-42ac-ba91-f3cb4d97e333',NULL,NULL),('794abf8f-37d4-42d4-a62a-a63e6ca2110d','fewfwef',NULL,1,NULL,'2021-01-01 15:24:34',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-01 15:33:36',NULL,0,NULL,NULL,NULL),('a2907257-9cdc-44df-84cf-d45f82b1a809','Dọn dẹp phòng thường tầng 1',NULL,0,NULL,'2021-01-01 15:34:05',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-25 13:14:28',NULL,0,'c0200ef3-6a74-4078-a203-1964ab520310','cf6e6423-8517-4051-b5e8-e765be88b150','0fd7a9bd-93f0-4af9-87e6-8d290ec47703'),('baccb724-68c8-49db-bbab-f1826622e759','sadsad',NULL,1,NULL,'2021-01-01 15:23:35',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-01 15:33:33',NULL,0,NULL,NULL,NULL),('feb35064-d3fd-4ea4-bc6c-47c3c5389684','checklist template',NULL,1,NULL,'2021-01-01 15:14:41',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-01 15:44:57',NULL,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `hkm_check_list_template` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:01:56
