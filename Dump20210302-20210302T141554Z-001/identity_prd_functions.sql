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
-- Table structure for table `prd_functions`
--

DROP TABLE IF EXISTS `prd_functions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prd_functions` (
  `Id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `delete_flag` tinyint DEFAULT '0',
  `created_by` char(64) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` char(64) DEFAULT NULL,
  `siteId` char(64) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `api_url` varchar(150) DEFAULT NULL,
  `application_id` varchar(64) DEFAULT NULL,
  `parent_id` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_769a51cbac42eae98ec2966040d` (`application_id`),
  KEY `FK_0f6e11b1712fa9d457df75577e1` (`parent_id`),
  CONSTRAINT `FK_0f6e11b1712fa9d457df75577e1` FOREIGN KEY (`parent_id`) REFERENCES `prd_functions` (`Id`),
  CONSTRAINT `FK_769a51cbac42eae98ec2966040d` FOREIGN KEY (`application_id`) REFERENCES `prd_application` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prd_functions`
--

LOCK TABLES `prd_functions` WRITE;
/*!40000 ALTER TABLE `prd_functions` DISABLE KEYS */;
INSERT INTO `prd_functions` VALUES ('09b5effc-bd24-48d8-a01e-601f63b6022d','func1','fff',0,NULL,'2020-12-03 02:42:46',NULL,NULL,'2020-12-03 02:42:46','acd','27229883-619a-4d12-b53d-64e34b324737',NULL),('62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c','function1','string',0,NULL,'2020-12-02 04:41:22',NULL,'1','2020-12-02 04:41:22','string','ae91d787-7c0c-4f98-9956-93139a0f6cf2',NULL),('64d4e5e5-8a71-4549-bad6-d715e3d2e4fd','string','string',0,NULL,'2020-12-02 04:39:07',NULL,'1','2020-12-02 04:39:07','string','ae91d787-7c0c-4f98-9956-93139a0f6cf2',NULL),('bfcd9ce7-2bcb-4304-bac9-660d8fe54706','strinG1.1','string',0,NULL,'2020-12-02 04:48:57',NULL,'1','2020-12-02 04:48:57','string','ae91d787-7c0c-4f98-9956-93139a0f6cf2','62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c'),('c5429d65-f5d7-4cf4-bc25-61007195b523','bb','string',0,NULL,'2020-12-04 15:24:06',NULL,NULL,'2020-12-04 15:24:06','string','28b90949-c4c0-46c0-a1c0-7ab1dd79e5a2',NULL),('da1ca5b8-d46d-49e8-8c83-9bd1c719a71c','func1','string',0,NULL,'2020-12-03 01:49:40',NULL,NULL,'2020-12-03 01:49:40','string','691216cd-8ec2-4b30-b561-043c46969802','62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c'),('da1d73fc-db7d-4d17-a6e8-e63cdf6848c0','cc','string',0,NULL,'2020-12-04 15:26:24',NULL,NULL,'2020-12-04 15:26:24','string','28b90949-c4c0-46c0-a1c0-7ab1dd79e5a2',NULL),('ec2775ee-20d1-4b4e-8f5b-1110a5b21fbd','function21','string',0,NULL,'2020-12-02 04:41:41',NULL,'1','2020-12-02 04:41:41','string','ae91d787-7c0c-4f98-9956-93139a0f6cf2',NULL);
/*!40000 ALTER TABLE `prd_functions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:02:09
