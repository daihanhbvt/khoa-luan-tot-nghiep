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
-- Table structure for table `prd_group_user`
--

DROP TABLE IF EXISTS `prd_group_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prd_group_user` (
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
  `roles` json DEFAULT NULL,
  `is_default` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `FK_9ec91c673177e00aaabf30b3546` (`parentId`),
  CONSTRAINT `FK_9ec91c673177e00aaabf30b3546` FOREIGN KEY (`parentId`) REFERENCES `prd_group_user` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prd_group_user`
--

LOCK TABLES `prd_group_user` WRITE;
/*!40000 ALTER TABLE `prd_group_user` DISABLE KEYS */;
INSERT INTO `prd_group_user` VALUES ('0092fbd4-4f1a-4044-8fc8-1532696afb7e','User 1','string',0,NULL,'2020-12-03 01:32:50',NULL,'1','2020-12-03 01:32:50',NULL,NULL,0),('149c8cff-7e84-4620-bdcb-d57d271d7ac7','Admin',NULL,0,NULL,'2020-12-18 13:46:23',NULL,'978c5fe6-ba22-4c0c-90d0-b3638231dced','2020-12-18 13:46:23',NULL,'[{\"id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"name\": \"function1\", \"api_url\": \"string\", \"children\": [{\"name\": \"strinG1.1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"ae91d787-7c0c-4f98-9956-93139a0f6cf2\"}, {\"name\": \"func1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"691216cd-8ec2-4b30-b561-043c46969802\"}], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"64d4e5e5-8a71-4549-bad6-d715e3d2e4fd\", \"name\": \"string\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"ec2775ee-20d1-4b4e-8f5b-1110a5b21fbd\", \"name\": \"function21\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}]',1),('2901ab54-d1eb-4259-9474-ef5d89243cb0','Admmin','string',0,NULL,'2020-12-04 19:59:44',NULL,NULL,'2020-12-04 19:59:44',NULL,NULL,0),('7606fc60-7095-4f2f-80eb-10b4a6b0af65','Employee','string',0,NULL,'2020-12-04 20:07:10',NULL,NULL,'2020-12-04 20:07:10',NULL,NULL,0),('9200c852-b4a3-4417-8527-1a9d6553e428','Admin',NULL,0,NULL,'2020-12-18 13:37:51',NULL,'05c3557d-d250-4e38-bc8b-206f24d51ea8','2020-12-18 13:37:51',NULL,'[{\"id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"name\": \"function1\", \"api_url\": \"string\", \"children\": [{\"name\": \"strinG1.1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"ae91d787-7c0c-4f98-9956-93139a0f6cf2\"}, {\"name\": \"func1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"691216cd-8ec2-4b30-b561-043c46969802\"}], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"64d4e5e5-8a71-4549-bad6-d715e3d2e4fd\", \"name\": \"string\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"ec2775ee-20d1-4b4e-8f5b-1110a5b21fbd\", \"name\": \"function21\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}]',1),('99dc47dc-5883-4c81-a328-d30b47633436','Admin',NULL,0,NULL,'2020-12-18 12:57:20',NULL,'b51aa9a2-fd38-48ff-ab63-cd9fa33a721b','2020-12-18 12:57:20',NULL,'[{\"id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"name\": \"function1\", \"api_url\": \"string\", \"children\": [{\"name\": \"strinG1.1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"ae91d787-7c0c-4f98-9956-93139a0f6cf2\"}, {\"name\": \"func1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"691216cd-8ec2-4b30-b561-043c46969802\"}], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"64d4e5e5-8a71-4549-bad6-d715e3d2e4fd\", \"name\": \"string\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"ec2775ee-20d1-4b4e-8f5b-1110a5b21fbd\", \"name\": \"function21\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}]',1),('ad42ba30-b563-4cc2-bbfc-142441236cf2','group1','string',0,NULL,'2020-12-04 15:30:05',NULL,'1','2020-12-04 15:30:05',NULL,NULL,0),('b4064945-80a4-435b-843c-31c3b3176206','Manager','string',0,NULL,'2020-12-04 20:07:56',NULL,NULL,'2020-12-04 20:07:56',NULL,NULL,0),('d4a159c5-6c55-48d2-bfe3-457acbf3c76b','Admin',NULL,0,NULL,'2020-12-18 13:34:59',NULL,'c83dcc0e-5fd7-4f9a-822d-c0d53bfef8c2','2020-12-18 13:34:59',NULL,'[{\"id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"name\": \"function1\", \"api_url\": \"string\", \"children\": [{\"name\": \"strinG1.1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"ae91d787-7c0c-4f98-9956-93139a0f6cf2\"}, {\"name\": \"func1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"691216cd-8ec2-4b30-b561-043c46969802\"}], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"64d4e5e5-8a71-4549-bad6-d715e3d2e4fd\", \"name\": \"string\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"ec2775ee-20d1-4b4e-8f5b-1110a5b21fbd\", \"name\": \"function21\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}]',1),('e364f1b6-4a1b-45df-8065-06bd4b60b966','Admin',NULL,0,NULL,'2020-12-18 13:48:48',NULL,'a4f98b9b-1be1-456b-aaf7-dd58b1b0e67e','2020-12-18 13:48:48',NULL,'[{\"id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"name\": \"function1\", \"api_url\": \"string\", \"children\": [{\"name\": \"strinG1.1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"ae91d787-7c0c-4f98-9956-93139a0f6cf2\"}, {\"name\": \"func1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"691216cd-8ec2-4b30-b561-043c46969802\"}], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"64d4e5e5-8a71-4549-bad6-d715e3d2e4fd\", \"name\": \"string\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"ec2775ee-20d1-4b4e-8f5b-1110a5b21fbd\", \"name\": \"function21\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}]',1),('ee4917f9-273d-4f9c-8ce7-9e6cf2375d2c','Admin','string',0,NULL,'2020-12-04 20:48:04',NULL,'1','2020-12-04 20:50:06',NULL,'[{\"id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"name\": \"function1\", \"api_url\": \"string\", \"children\": [{\"name\": \"strinG1.1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"ae91d787-7c0c-4f98-9956-93139a0f6cf2\"}, {\"name\": \"func1\", \"api_url\": \"string\", \"parent_id\": \"62a7f6e3-b1c9-48c8-8a5b-efafa3d9de8c\", \"permission\": true, \"description\": \"string\", \"application_id\": \"691216cd-8ec2-4b30-b561-043c46969802\"}], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"64d4e5e5-8a71-4549-bad6-d715e3d2e4fd\", \"name\": \"string\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}, {\"id\": \"ec2775ee-20d1-4b4e-8f5b-1110a5b21fbd\", \"name\": \"function21\", \"api_url\": \"string\", \"children\": [], \"permission\": true, \"application\": null, \"description\": \"string\"}]',0),('f9419e0b-2430-46a4-8f37-f5da662bc7e5','string','string',0,NULL,'2020-12-04 19:24:52',NULL,'1','2020-12-04 19:24:52',NULL,NULL,0);
/*!40000 ALTER TABLE `prd_group_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:02:08
