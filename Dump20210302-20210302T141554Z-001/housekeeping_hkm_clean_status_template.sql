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
-- Table structure for table `hkm_clean_status_template`
--

DROP TABLE IF EXISTS `hkm_clean_status_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_clean_status_template` (
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
  KEY `FK_bf2f0edadda1218a816f248b6f9` (`parentId`),
  CONSTRAINT `FK_bf2f0edadda1218a816f248b6f9` FOREIGN KEY (`parentId`) REFERENCES `hkm_clean_status_template` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_clean_status_template`
--

LOCK TABLES `hkm_clean_status_template` WRITE;
/*!40000 ALTER TABLE `hkm_clean_status_template` DISABLE KEYS */;
INSERT INTO `hkm_clean_status_template` VALUES ('00e673a3-4054-40bf-a674-a6d96794efd4','Đang dọn dẹp','Nhân viên đang dọn dẹp',0,NULL,'2021-01-12 15:58:51',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-12 15:58:51',NULL,0,'blue'),('33e51dae-2c5b-44c1-af4a-a8b4aeedc015','Đã dọn dẹp','Nhân viên đã dọn dẹp',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:01:56','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-12 15:59:11',NULL,0,'green'),('9fbbb158-1660-4a7f-930e-c00e7067aecc','Chưa dọn dẹp','Nhân viên chưa dọn dẹp',0,NULL,'2021-01-04 14:15:40',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-12 15:59:24',NULL,0,'red');
/*!40000 ALTER TABLE `hkm_clean_status_template` ENABLE KEYS */;
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
