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
-- Table structure for table `hkm_room_type_template`
--

DROP TABLE IF EXISTS `hkm_room_type_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_room_type_template` (
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
  KEY `FK_21953c84b57a1208d25dd9bc379` (`parentId`),
  CONSTRAINT `FK_21953c84b57a1208d25dd9bc379` FOREIGN KEY (`parentId`) REFERENCES `hkm_room_type_template` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_room_type_template`
--

LOCK TABLES `hkm_room_type_template` WRITE;
/*!40000 ALTER TABLE `hkm_room_type_template` DISABLE KEYS */;
INSERT INTO `hkm_room_type_template` VALUES ('663fcc9f-5d2c-4a95-b937-84e5b27ff88e','Phòng Vip','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:02:13','10ef00e6-3219-44be-b83e-a9604bea4153',NULL,'2020-12-05 15:02:13',NULL,0),('b680dbc0-2f6b-4c53-91e1-3db5ed42558a','Phòng thường',NULL,0,NULL,'2021-01-04 15:05:31',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-04 15:05:42',NULL,0),('f998ddfe-71f4-49dd-bc6e-2c296ce1e7eb','Vip1',NULL,1,NULL,'2021-01-04 15:05:50',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-04 15:05:53',NULL,0);
/*!40000 ALTER TABLE `hkm_room_type_template` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:02:03
