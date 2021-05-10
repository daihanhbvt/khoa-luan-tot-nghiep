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
-- Table structure for table `hkm_check_list_template_default`
--

DROP TABLE IF EXISTS `hkm_check_list_template_default`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_check_list_template_default` (
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
  `parentId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_f091684cbfb88d99e10992a231f` (`parentId`),
  CONSTRAINT `FK_f091684cbfb88d99e10992a231f` FOREIGN KEY (`parentId`) REFERENCES `hkm_check_list_template_default` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_check_list_template_default`
--

LOCK TABLES `hkm_check_list_template_default` WRITE;
/*!40000 ALTER TABLE `hkm_check_list_template_default` DISABLE KEYS */;
INSERT INTO `hkm_check_list_template_default` VALUES ('056f0b96-82b4-4671-88a4-1b7be7bbb9ca','DSCV1 - Danh sách công việc cho tầng 1',NULL,0,NULL,'2021-01-20 14:00:14',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-24 08:25:40',0,NULL),('9b406156-0c3b-4379-804a-fd9a77726822','Kiểm tra sàn nhà',NULL,0,NULL,'2021-01-20 13:58:56',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-20 13:58:56',0,NULL),('effbabd6-ea08-40c6-9501-27f48ae9cf70','Kiểm tra ga giường và vỏ gối','Kiểm tra xem nhân viên đã thay vỏ ga, gối hay chưa',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 16:41:34','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-20 13:59:32',0,NULL),('f79be758-a6b7-463d-99d7-0bf906a10404','Kiểm tra phòng tắm',NULL,0,NULL,'2021-01-20 13:59:43',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-20 13:59:43',0,NULL);
/*!40000 ALTER TABLE `hkm_check_list_template_default` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:02:05
