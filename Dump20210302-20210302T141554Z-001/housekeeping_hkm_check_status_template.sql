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
-- Table structure for table `hkm_check_status_template`
--

DROP TABLE IF EXISTS `hkm_check_status_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_check_status_template` (
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
  KEY `FK_f7d09cf545e09c34b37f39ff881` (`parentId`),
  CONSTRAINT `FK_f7d09cf545e09c34b37f39ff881` FOREIGN KEY (`parentId`) REFERENCES `hkm_check_status_template` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_check_status_template`
--

LOCK TABLES `hkm_check_status_template` WRITE;
/*!40000 ALTER TABLE `hkm_check_status_template` DISABLE KEYS */;
INSERT INTO `hkm_check_status_template` VALUES ('36ed5aa9-7b53-4f9f-b6cc-5ab567f4495d','Đang kiểm tra','Nhân viên đang kiểm tra',0,NULL,'2021-01-12 16:00:32',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-12 16:00:32',NULL,0,'blue'),('60a56fb4-4d23-400c-a72d-7aa7663138d7','Đã kiểm tra','Nhân viên đã kiểm tra',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:01:43','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-12 16:00:59',NULL,0,'green'),('6d64da6f-8b2f-469d-927d-36eaa3e29438','Chưa kiểm tra','Nhân viên chưa kiểm tra',0,NULL,'2021-01-04 14:38:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-12 16:01:27',NULL,0,'red');
/*!40000 ALTER TABLE `hkm_check_status_template` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:01:58
