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
-- Table structure for table `hkm_check_list_template_item`
--

DROP TABLE IF EXISTS `hkm_check_list_template_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_check_list_template_item` (
  `Id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `delete_flag` tinyint DEFAULT '0',
  `created_by` char(64) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` char(64) DEFAULT NULL,
  `siteId` char(64) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `check_list_template_id` varchar(64) DEFAULT NULL,
  `parentId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_443a4f47a6427533e9dcd4c2df1` (`check_list_template_id`),
  KEY `FK_fb2e1cd0c788d35fcbc93fd52f2` (`parentId`),
  CONSTRAINT `FK_443a4f47a6427533e9dcd4c2df1` FOREIGN KEY (`check_list_template_id`) REFERENCES `hkm_check_list_template` (`Id`),
  CONSTRAINT `FK_fb2e1cd0c788d35fcbc93fd52f2` FOREIGN KEY (`parentId`) REFERENCES `hkm_check_list_template_item` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_check_list_template_item`
--

LOCK TABLES `hkm_check_list_template_item` WRITE;
/*!40000 ALTER TABLE `hkm_check_list_template_item` DISABLE KEYS */;
INSERT INTO `hkm_check_list_template_item` VALUES ('062gyd7e-295d-49d3-9f2b-fd2141d1ad40','Sắp xếp bàn ghế ',NULL,0,NULL,'2021-01-24 13:24:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-24 13:24:53','a2907257-9cdc-44df-84cf-d45f82b1a809',NULL),('12kmncde-1245-49d3-9f2b-fd2141d1ad40','Đổ rác',NULL,0,NULL,'2021-01-24 13:24:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-24 13:24:53','a2907257-9cdc-44df-84cf-d45f82b1a809',NULL),('48hdgcve-295d-49d3-4d8efd2141d1ad40','Dọn dẹp phòng tắm',NULL,0,NULL,'2021-01-24 13:24:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-24 13:24:53','a2907257-9cdc-44df-84cf-d45f82b1a809',NULL),('75kmduc7-295d-49d3-9f2b-fd2141d1ad40','Lau sàn nhà',NULL,0,NULL,'2021-01-24 13:24:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-24 13:24:53','a2907257-9cdc-44df-84cf-d45f82b1a809',NULL),('a7c8ehu8-295d-49d3-9f2b-fd2141d1ad40','Cọ bồn cầu',NULL,0,NULL,'2021-01-24 13:24:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-24 13:24:53','a2907257-9cdc-44df-84cf-d45f82b1a809',NULL),('mi845iju-295d-2135-9f2b-fd2141d1ad40','Bổ sung giấy lau tay và giấy vệ sinh (nếu hết)',NULL,0,NULL,'2021-01-24 13:24:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-24 13:24:53','a2907257-9cdc-44df-84cf-d45f82b1a809',NULL),('minhg124-1926-4083-8947-cbfd478e201f','Thay ga giường, vỏ gối',NULL,0,NULL,'2021-01-24 13:24:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-24 13:24:53','a2907257-9cdc-44df-84cf-d45f82b1a809',NULL),('nu82du85-295d-49d3-9f2b-fd2141d1ad40','Lau các cửa',NULL,0,NULL,'2021-01-24 13:24:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-24 13:24:53','a2907257-9cdc-44df-84cf-d45f82b1a809',NULL),('nu8d9eby-295d-49d3-9f2b-fd2141d1ad40','Lau phòng tắm',NULL,0,NULL,'2021-01-24 13:24:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-24 13:24:53','a2907257-9cdc-44df-84cf-d45f82b1a809',NULL),('vyby06e1-1926-4083-8947-cbfd478e201f','Lau bàn ghế',NULL,0,NULL,'2021-01-24 13:24:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-24 13:24:53','a2907257-9cdc-44df-84cf-d45f82b1a809',NULL);
/*!40000 ALTER TABLE `hkm_check_list_template_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:02:04
