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
-- Table structure for table `prd_group_user_template`
--

DROP TABLE IF EXISTS `prd_group_user_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prd_group_user_template` (
  `Id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `delete_flag` tinyint DEFAULT '0',
  `created_by` char(64) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` char(64) DEFAULT NULL,
  `siteId` char(64) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_default` tinyint NOT NULL DEFAULT '0',
  `roles` json DEFAULT NULL,
  `parentId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_312736220e5890c6fcb84ffa90e` (`parentId`),
  CONSTRAINT `FK_312736220e5890c6fcb84ffa90e` FOREIGN KEY (`parentId`) REFERENCES `prd_group_user_template` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prd_group_user_template`
--

LOCK TABLES `prd_group_user_template` WRITE;
/*!40000 ALTER TABLE `prd_group_user_template` DISABLE KEYS */;
INSERT INTO `prd_group_user_template` VALUES ('65b60e07-e3db-42d9-b998-1f61ecb7df12','Admin',NULL,0,NULL,'2020-12-18 12:40:16',NULL,NULL,'2020-12-18 12:40:16',1,'[{\"id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"name\": \"function1\", \"api_url\": \"string\", \"children\": [{\"name\": \"strinG1.1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"ae91d787-7c0c-4f98-9956-93139a0f6cf2\"}, {\"name\": \"func1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"691216cd-8ec2-4b30-b561-043c46969802\"}], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"64d4e5e5-8a71-4549-bad6-d715e3d2e4fd\", \"name\": \"string\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"ec2775ee-20d1-4b4e-8f5b-1110a5b21fbd\", \"name\": \"function21\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}]',NULL);
/*!40000 ALTER TABLE `prd_group_user_template` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:02:12
