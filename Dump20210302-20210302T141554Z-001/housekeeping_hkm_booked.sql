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
-- Table structure for table `hkm_booked`
--

DROP TABLE IF EXISTS `hkm_booked`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_booked` (
  `Id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `delete_flag` tinyint DEFAULT '0',
  `created_by` char(64) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` char(64) DEFAULT NULL,
  `siteId` char(64) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `room_id` varchar(64) DEFAULT NULL,
  `customer_id` varchar(64) DEFAULT NULL,
  `room_status_id` varchar(64) DEFAULT NULL,
  `from_date` datetime DEFAULT NULL,
  `to_date` datetime DEFAULT NULL,
  `parentId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_f17303d124d51d8e20e98f13d83` (`room_id`),
  KEY `FK_43c0dc277fea110949f4a3e244e` (`customer_id`),
  KEY `FK_b0e904a770bbd2b0dfe8f9a0a9d` (`room_status_id`),
  KEY `FK_faaadc19e26acbef70792763eac` (`parentId`),
  CONSTRAINT `FK_43c0dc277fea110949f4a3e244e` FOREIGN KEY (`customer_id`) REFERENCES `hkm_customer` (`Id`),
  CONSTRAINT `FK_b0e904a770bbd2b0dfe8f9a0a9d` FOREIGN KEY (`room_status_id`) REFERENCES `hkm_room_status` (`Id`),
  CONSTRAINT `FK_f17303d124d51d8e20e98f13d83` FOREIGN KEY (`room_id`) REFERENCES `hkm_room` (`Id`),
  CONSTRAINT `FK_faaadc19e26acbef70792763eac` FOREIGN KEY (`parentId`) REFERENCES `hkm_booked` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_booked`
--

LOCK TABLES `hkm_booked` WRITE;
/*!40000 ALTER TABLE `hkm_booked` DISABLE KEYS */;
INSERT INTO `hkm_booked` VALUES ('2121c10a-3889-4054-b2ea-8b9d3745a5ee','B112',NULL,0,NULL,'2021-01-22 18:24:21',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:24:21','67754114-161c-4e6b-9c4c-21c008b2974a','88fb7a8c-88fd-47cb-914c-03fc9185154f','e423fd13-24f5-432f-b227-43c547f51cc0','2021-01-25 00:00:00','2021-01-27 00:00:00',NULL),('25971f79-07f3-4066-9f8f-b992b4d3393c',NULL,NULL,0,NULL,'2020-12-05 15:40:26',NULL,NULL,'2020-12-05 15:40:26','7e26c146-922d-4293-8db6-ca5b073fb6c6','3dbd9ede-4c28-4fb8-801c-188358fcd2cb','dceeb6d4-6063-43c9-b3b1-4be21e3c9669','2020-12-05 22:40:26','2020-12-05 22:40:26',NULL),('42ce7658-54b4-4327-a69b-6f9aa338995b','B105',NULL,0,NULL,'2021-01-22 18:20:43',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:20:43','d6417ec5-9810-410a-b0f1-eb52cc164f45','77ef7149-946d-44aa-8a46-8a1c1fb4984c','e423fd13-24f5-432f-b227-43c547f51cc0','2021-01-23 00:00:00','2021-01-26 00:00:00',NULL),('4bbdd734-9546-4d4c-9ece-8563363b1ba3','B108',NULL,0,NULL,'2021-01-22 18:22:35',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:22:35','308e2923-6185-43b1-86e3-ae46801abe24','fff5eaef-55d8-4984-bd09-edcc8771437c','dceeb6d4-6063-43c9-b3b1-4be21e3c9669','2021-01-20 00:00:00','2021-01-22 00:00:00',NULL),('53ab92ff-ae90-42b1-af37-55222e700d11','B102',NULL,0,NULL,'2021-01-16 11:14:03',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:19:12','82883dc0-eaf3-47a5-be9f-b92770225e00','7174a24a-51eb-4b59-b4e0-416ea48c61a6','e67835c9-1a9f-4abd-8a74-91e43069fa3c','2021-01-20 00:00:00','2021-01-21 00:00:00',NULL),('54ff0020-b182-4b99-98b3-cb77ac638bb2','B111',NULL,0,NULL,'2021-01-22 18:23:52',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:23:52','7f38c4b5-a81f-40ad-8281-3952c831f7a2','18233073-2845-48c1-b22e-1ddd24c486a6','e67835c9-1a9f-4abd-8a74-91e43069fa3c','2021-01-22 00:00:00','2021-01-28 00:00:00',NULL),('59c61e4a-d465-4fe6-abd7-0b336881d8b0','B14',NULL,0,NULL,'2021-01-25 23:06:20',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-25 23:06:20','b2b6b39f-af24-44c9-9965-9fc0e7ad7d3e','9ba58a92-c3cb-45da-be4e-8f428ad71844','dceeb6d4-6063-43c9-b3b1-4be21e3c9669','2021-01-27 00:00:00','2021-01-29 00:00:00',NULL),('631df5bc-4a19-41d6-9de2-babe27afa01b','B106',NULL,0,NULL,'2021-01-22 18:21:29',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:21:29','03d6c0a0-295d-49d3-9f2b-fd2141d1ad40','d4be005b-38b7-4551-8164-5d7f673460c3','e423fd13-24f5-432f-b227-43c547f51cc0','2021-01-20 00:00:00','2021-01-27 00:00:00',NULL),('6c1e5645-ad33-44e6-a308-3019848d6f14','B109',NULL,0,NULL,'2021-01-22 18:23:08',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:23:08','7f38c4b5-a81f-40ad-8281-3952c831f7a2','a337b483-7148-4236-8ca8-d9f764044f5d','e423fd13-24f5-432f-b227-43c547f51cc0','2021-01-19 00:00:00','2021-01-22 00:00:00',NULL),('7e88d109-c411-4c35-b16a-18b0ca6f236e','B113',NULL,0,NULL,'2021-01-22 18:24:48',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:24:48','81e6fa71-769b-4cc0-bb58-31fe555fbe33','13c92a7a-d427-43de-ae8d-f00aecde989c','e67835c9-1a9f-4abd-8a74-91e43069fa3c','2021-01-20 00:00:00','2021-01-27 00:00:00',NULL),('a7639b0c-4489-4d38-857d-3d36124f1634','B110',NULL,0,NULL,'2021-01-22 18:23:29',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:23:29','0b396876-205f-46c3-bb56-089faf8b7b8a','28a9f28f-7a12-480a-a964-78bcc2244134','dceeb6d4-6063-43c9-b3b1-4be21e3c9669','2021-01-14 00:00:00','2021-01-16 00:00:00',NULL),('b014f871-b550-4a0f-94f4-6e2f18218d36',NULL,NULL,0,NULL,'2020-12-18 15:10:45',NULL,NULL,'2020-12-18 15:10:45','ba952a9f-574c-4874-bb2b-70d1452d4618','a7ba4769-8834-4c39-8bd4-88dc185a0ef2','3422ff51-d894-4c84-b18c-07961831241a','2020-12-18 22:10:46','2020-12-18 22:10:46',NULL),('b12f6d5d-2f17-4f9f-b54f-af2d4a34994e','B106',NULL,0,NULL,'2021-01-22 18:21:05',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:21:05','d8318e90-cadd-4c01-a852-6208d31e46cb','08772d72-a352-40b0-a5ca-ff4cbc9564c4','e423fd13-24f5-432f-b227-43c547f51cc0','2021-01-28 00:00:00','2021-01-29 00:00:00',NULL),('b6daa4a3-1b2f-4500-baf5-2cd51866ae25',NULL,NULL,0,NULL,'2020-12-05 15:29:24',NULL,NULL,'2020-12-05 15:29:24','429e32fe-7ca8-4fec-868f-9b5459fa65d7','eddda1b4-1956-4c65-b6ed-64ae4c480adf','62a7254d-6e3c-4962-ab08-0a06eb0aaf5b','2020-12-05 22:29:22','2020-12-05 22:29:22',NULL),('cbd5c082-b3d3-4017-8b20-0dea3bd76298','B104',NULL,0,NULL,'2021-01-22 18:20:15',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:20:15','f022a831-9771-478e-bc6e-146a01a29dd6','b6b492fa-4a16-4895-ad59-6c0a8fadf5e2','e423fd13-24f5-432f-b227-43c547f51cc0','2021-01-20 00:00:00','2021-01-24 00:00:00',NULL),('d6cec536-aa53-43cc-8783-698d1ddc6916',NULL,NULL,0,NULL,'2020-12-18 14:21:43',NULL,NULL,'2020-12-18 14:21:43','7efc5ebe-eb40-4d82-8b4f-a62db346c801','f1958543-c74c-416e-992a-756d1dd39c68','64df5256-4f9d-4ceb-a844-327e4434d540','2020-12-18 21:21:43','2020-12-18 21:21:43',NULL),('df4b0350-2150-4b08-936d-4220d956e734','B103',NULL,0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:15:51','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:19:19','5b4e0d47-d9cb-4afb-919c-ae4dfa4030cb','e385fbc7-c37d-40a5-938a-8e5d40c5f34a','e423fd13-24f5-432f-b227-43c547f51cc0','2021-01-12 00:00:00','2021-01-14 00:00:00',NULL),('e403c9ed-f5e8-4bca-8c6a-7ed8853db63f','B101',NULL,0,NULL,'2021-01-22 18:19:01',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:19:01','a240340f-9c64-4024-8d39-ae41fc644c4d','3abf12d9-9ed4-498f-a4f5-ae656c36986e','e67835c9-1a9f-4abd-8a74-91e43069fa3c','2021-01-12 00:00:00','2021-01-26 00:00:00',NULL),('fbe27ee6-87cd-4519-8470-d8c3c4bf6b16','B107',NULL,0,NULL,'2021-01-22 18:21:58',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:21:58','d4cf6894-ac16-496d-b37d-05a0e97a121d','430c5b1f-b224-407c-80ca-7ea347609fa5','e67835c9-1a9f-4abd-8a74-91e43069fa3c','2021-01-13 00:00:00','2021-01-25 00:00:00',NULL);
/*!40000 ALTER TABLE `hkm_booked` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:02:07
