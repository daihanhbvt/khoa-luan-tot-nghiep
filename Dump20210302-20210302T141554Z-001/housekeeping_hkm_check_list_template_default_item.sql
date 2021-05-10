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
-- Table structure for table `hkm_check_list_template_default_item`
--

DROP TABLE IF EXISTS `hkm_check_list_template_default_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_check_list_template_default_item` (
  `Id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `delete_flag` tinyint DEFAULT '0',
  `created_by` char(64) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` char(64) DEFAULT NULL,
  `siteId` char(64) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `check_list_template_default_id` varchar(64) DEFAULT NULL,
  `is_default` tinyint NOT NULL DEFAULT '0',
  `parentId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_378076cb5befa50d76c1a1c8fa9` (`check_list_template_default_id`),
  KEY `FK_9f4aec73f454c09180b9a4767b4` (`parentId`),
  CONSTRAINT `FK_378076cb5befa50d76c1a1c8fa9` FOREIGN KEY (`check_list_template_default_id`) REFERENCES `hkm_check_list_template_default` (`Id`),
  CONSTRAINT `FK_9f4aec73f454c09180b9a4767b4` FOREIGN KEY (`parentId`) REFERENCES `hkm_check_list_template_default_item` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_check_list_template_default_item`
--

LOCK TABLES `hkm_check_list_template_default_item` WRITE;
/*!40000 ALTER TABLE `hkm_check_list_template_default_item` DISABLE KEYS */;
INSERT INTO `hkm_check_list_template_default_item` VALUES ('f374f3c7-8af3-49e4-b0a1-11c0eced3f6b','Dọn giường','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 16:42:00','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-24 08:26:00','effbabd6-ea08-40c6-9501-27f48ae9cf70',0,NULL);
/*!40000 ALTER TABLE `hkm_check_list_template_default_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:02:02
