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
-- Table structure for table `prd_application`
--

DROP TABLE IF EXISTS `prd_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prd_application` (
  `Id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `delete_flag` tinyint DEFAULT '0',
  `created_by` char(64) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` char(64) DEFAULT NULL,
  `siteId` char(64) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `hostname` varchar(255) DEFAULT NULL,
  `parentId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_9ebefceeeec551dec9d68c1d8f3` (`parentId`),
  CONSTRAINT `FK_9ebefceeeec551dec9d68c1d8f3` FOREIGN KEY (`parentId`) REFERENCES `prd_application` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prd_application`
--

LOCK TABLES `prd_application` WRITE;
/*!40000 ALTER TABLE `prd_application` DISABLE KEYS */;
INSERT INTO `prd_application` VALUES ('0743dd55-b876-4797-a273-860d9e7a3b52','string','string',0,NULL,'2020-12-03 01:36:49',NULL,NULL,'2020-12-03 01:36:49',NULL,NULL),('27229883-619a-4d12-b53d-64e34b324737','Appli 1','abc',0,NULL,'2020-12-03 02:42:03',NULL,NULL,'2020-12-03 02:42:03',NULL,NULL),('28b90949-c4c0-46c0-a1c0-7ab1dd79e5a2','abc','string',0,NULL,'2020-12-04 15:23:22',NULL,NULL,'2020-12-04 15:23:22',NULL,NULL),('691216cd-8ec2-4b30-b561-043c46969802','appli 1','abc',0,NULL,'2020-12-03 01:40:51',NULL,NULL,'2020-12-03 01:40:51',NULL,NULL),('ae91d787-7c0c-4f98-9956-93139a0f6cf2','House Keeeping Management','string',0,NULL,'2020-12-02 04:37:48',NULL,NULL,'2020-12-18 12:44:29','localhost',NULL),('c38f8a53-0882-4289-a167-58e164749cd9','appli 21','abc',0,NULL,'2020-12-03 02:17:01',NULL,NULL,'2020-12-03 02:17:01',NULL,NULL);
/*!40000 ALTER TABLE `prd_application` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:02:10
