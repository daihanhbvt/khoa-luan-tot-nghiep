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
-- Table structure for table `hkm_clean_status`
--

DROP TABLE IF EXISTS `hkm_clean_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_clean_status` (
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
  `display_index` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_4d65c941910b7633e1801a38d7a` (`parentId`),
  CONSTRAINT `FK_4d65c941910b7633e1801a38d7a` FOREIGN KEY (`parentId`) REFERENCES `hkm_clean_status` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_clean_status`
--

LOCK TABLES `hkm_clean_status` WRITE;
/*!40000 ALTER TABLE `hkm_clean_status` DISABLE KEYS */;
INSERT INTO `hkm_clean_status` VALUES ('1b662a18-75c3-4bf5-b01b-ec57d72ee373','dff sdfsd','',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-09 12:51:55','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:52:22',NULL,0,NULL,NULL),('1c2ceaa4-f14e-42b0-b79d-09c0c0618bdc','??ang d???n d???p','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:40:24','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:45:02',NULL,0,NULL,NULL),('25717859-a48a-490e-916b-ebc2dc03f413','???? d???n d???p','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 14:21:41','10ef00e6-3219-44be-b83e-a9604bea4153',NULL,'2020-12-18 14:21:41',NULL,0,NULL,NULL),('26e97b8e-0872-40cb-9653-c904dcd0a514','???? d???n d???p','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:29:20','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:24:09',NULL,0,NULL,NULL),('2eae4746-a7f4-4631-ac59-569526bae5f3','??ang d???n d???p','Nh??n vi??n ch??a d???n d???p',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:21:10','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-13 10:30:36',NULL,0,'blue',NULL),('41eb7e32-98d4-4ed9-a63d-0f1e0795f7a3','???? d???n d???p','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:12:50','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:24:22',NULL,0,NULL,NULL),('53cacda9-e62d-49ac-8072-73c9dcb0dc05','Khong thich don dep','',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-09 12:48:17','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:48:26',NULL,0,NULL,NULL),('5867f001-c106-4b14-8c63-5bcd31c30b0d','???? d???n d???p','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:09:33','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:24:26',NULL,0,NULL,NULL),('5a73628c-6791-4de0-844c-1bd0e09d7809','dff sdfsd','',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-09 12:52:49','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-05 13:29:28',NULL,0,NULL,NULL),('60cc7281-16cb-4659-bbd3-6a94f1e86cf5','dff sdfsd','',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-09 12:50:55','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:51:36',NULL,0,NULL,NULL),('65dc6647-9ed2-4943-a2b1-0c808ab98c11','dff sdfsd','',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-09 12:52:31','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:52:46',NULL,0,NULL,NULL),('6a86b116-75b8-494f-b24f-60390233859d','???? d???n d???p','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:17:47','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:24:29',NULL,0,NULL,NULL),('91b0f6b7-acc2-4d85-a79e-de37d581c8f3','???? d???n d???p','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:10:37','10ef00e6-3219-44be-b83e-a9604bea4153','a4f98b9b-1be1-456b-aaf7-dd58b1b0e67e','2020-12-18 15:10:37',NULL,0,NULL,NULL),('9537c604-e146-43e2-a8d0-b5a609741fa9','???? d???n d???p','Nh??n vi??n ???? d???n d???p',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:21:53','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-13 10:30:22',NULL,0,'green',NULL),('9613b5df-de0a-4355-8559-858e6b4d3e63','dff sdfsd','',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-09 13:11:32','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-05 13:29:25',NULL,0,NULL,NULL),('96bf4e5e-34b8-4820-ba6a-968bc799b5f7','Kh??ng th??ch d???n d???p','',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-09 12:46:15','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:46:51',NULL,0,NULL,NULL),('98fcf631-1308-4aca-a351-d37446acf99b','???? d???n d???p','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:14:16','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:24:31',NULL,0,NULL,NULL),('996456ee-5c57-43db-906f-f7962424bd1f','dff sdfsd','',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-09 12:48:45','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:48:52',NULL,0,NULL,NULL),('9ddc8617-ea3f-43ec-9828-d2a33e7522cc','Chua don dep',NULL,1,NULL,'2021-01-05 13:29:20',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-05 13:29:30',NULL,0,NULL,NULL),('af566380-dbf1-46ef-bb97-27eca25c596c','Kh??ng th??ch d???n d???p','123123',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-09 12:45:26','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:45:39',NULL,0,NULL,NULL),('c5b5c361-7ef3-4600-94d5-5c0b1edd711a','dff sdfsd','',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-09 12:50:45','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:51:30',NULL,0,NULL,NULL),('cd04e0af-5f56-4ca3-bb52-72c18caa6f94','???? d???n d???p','string',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:19:52','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:44:55',NULL,0,NULL,NULL),('d9037414-1f7d-4518-9412-168063ebb865','dff sdfsd','',1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-09 12:50:01','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2020-12-09 12:50:13',NULL,0,NULL,NULL),('f056be23-80c9-4128-95eb-3419942ca668','Ch??a d???n d???p','Nh??n vi??n ch??a d???n d???p ph??ng',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 15:24:03','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-12 14:19:11',NULL,0,'red',NULL),('f668c9b8-632c-40d1-a86f-57b6e3d566dc','???? d???n d???p','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:15:49','10ef00e6-3219-44be-b83e-a9604bea4153','a4f98b9b-1be1-456b-aaf7-dd58b1b0e67e','2020-12-18 15:15:49',NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `hkm_clean_status` ENABLE KEYS */;
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
