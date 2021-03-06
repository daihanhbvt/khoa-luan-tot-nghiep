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
-- Table structure for table `hkm_hotel`
--

DROP TABLE IF EXISTS `hkm_hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_hotel` (
  `Id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `delete_flag` tinyint DEFAULT '0',
  `created_by` char(64) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` char(64) DEFAULT NULL,
  `siteId` char(64) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(150) DEFAULT NULL,
  `owner` varchar(150) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `start` varchar(150) DEFAULT NULL,
  `company_id` char(64) DEFAULT NULL,
  `parentId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_962627cda3bfe4fb87926e4838b` (`parentId`),
  CONSTRAINT `FK_962627cda3bfe4fb87926e4838b` FOREIGN KEY (`parentId`) REFERENCES `hkm_hotel` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_hotel`
--

LOCK TABLES `hkm_hotel` WRITE;
/*!40000 ALTER TABLE `hkm_hotel` DISABLE KEYS */;
INSERT INTO `hkm_hotel` VALUES ('08ea938a-92b2-4bc2-ab4c-d32a5d9ddf6f','Robin',NULL,0,NULL,'2021-01-22 16:32:19',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 16:32:19','robin@gmail.com','B??i ????nh To???i','0345213256','08 Loseby, ???? N???ng','5',NULL,NULL),('0e9a990d-3ca8-4778-ac7b-b9223a46e405','Dreams',NULL,0,NULL,'2021-01-22 16:30:41',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 16:30:41','dream@gmail.com','Tr???n ????ng Kh??i','0235456288','410 V?? Nguy??n Gi??p, ???? N???ng','4',NULL,NULL),('138f511f-7c97-41f2-a425-4d58e3b2bef4','Cherry',NULL,0,NULL,'2021-01-05 14:30:49',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:22:59','cherry@gmail.com','B??i ????nh Nam','08764561235','18 Phan B???i Ch??u - H?? N???i','4',NULL,NULL),('29ecde6b-e6e3-4e70-ad2a-e2bdc262f95d','Hotel 1',NULL,0,NULL,'2020-12-18 15:10:40',NULL,NULL,'2020-12-18 15:10:40',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('535456ce-8db5-4305-8fec-3524ee0e113e','Marry',NULL,0,NULL,'2021-01-22 16:22:22',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 16:22:22','marry@mr.vn','Mai Huy???n Trang','0899632578','42/48 Ng?? Quy???n, Hu???','4',NULL,NULL),('5660671e-3286-4afe-b6ab-91a3969388a0','Hotel 1',NULL,0,NULL,'2020-12-05 15:12:51',NULL,NULL,'2020-12-05 15:12:51',NULL,NULL,NULL,NULL,NULL,'2204d44a-88d1-4187-a8cf-a1b352263f3e',NULL),('57c78802-ac9e-43cf-ab86-5202727c1ad1','Hotel 1',NULL,0,NULL,'2020-12-18 14:21:42',NULL,NULL,'2020-12-18 14:21:42',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('585bc41e-7859-4aa9-a219-162fc7417c88','Hotel 1',NULL,0,NULL,'2020-12-05 15:21:11',NULL,NULL,'2020-12-05 15:21:11',NULL,NULL,NULL,NULL,NULL,'2204d44a-88d1-4187-a8cf-a1b352263f3e',NULL),('5871b4ab-3786-4e0f-958a-a2b278af39d4','Halais',NULL,0,NULL,'2021-01-22 16:27:50',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 16:27:50','halais@ha.vn','Phan Nh?? ??','0863458235','48 Tr???n Nh??n T??ng, Nguy???n B???nh Khi??m, H?? N???i','5',NULL,NULL),('61f5db13-32e8-431b-ad7b-9d39b1bc5943','Hotel 1',NULL,0,NULL,'2020-12-05 15:21:53',NULL,NULL,'2020-12-05 15:21:53',NULL,NULL,NULL,NULL,NULL,'2204d44a-88d1-4187-a8cf-a1b352263f3e',NULL),('6345408b-79f6-475a-a5c5-fed6ff2dbfe8','Bally',NULL,0,NULL,'2021-01-22 16:16:17',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 16:16:17','bally@gmail.com','Nguy???n Thanh Nga','036526478','50A H??ng V????ng, Hu???, Th???a Thi??n Hu???','3',NULL,NULL),('6546e7b7-d400-49fd-a8f4-d2d4818f0ab9','Lan Anh',NULL,0,NULL,'2021-01-22 16:25:49',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 16:25:49','lananh@la.vn','Nguy???n Quang Ph?????c','0976325456','17E Phan ????nh Ph??ng, Qu???n Ba ????nh, H?? N???i','3',NULL,NULL),('74d16c3d-8621-4902-b81b-1a423521de07','M?????ng Thanh',NULL,0,NULL,'2021-01-22 16:37:58',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 16:37:58','muongthanh@gmail.com','Nguy???n Th??? Ng??n','0784362548','167 Nguy???n Phong S???c, H??ng Dung, Hu???','5',NULL,NULL),('809f70ca-e721-4545-9a83-41fe794754d0','Hotel 1',NULL,0,NULL,'2020-12-05 15:17:48',NULL,NULL,'2020-12-05 15:17:48',NULL,NULL,NULL,NULL,NULL,'2204d44a-88d1-4187-a8cf-a1b352263f3e',NULL),('8e02eb93-9227-420d-829d-5b0b43dc3297','Hotel 1',NULL,0,NULL,'2020-12-05 15:40:25',NULL,NULL,'2020-12-05 15:40:25',NULL,NULL,NULL,NULL,NULL,'2204d44a-88d1-4187-a8cf-a1b352263f3e',NULL),('9a4fcf37-f825-4dd8-a8c7-9ee7c2a954af','L??ng C??',NULL,0,NULL,'2021-01-22 16:18:51',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 16:18:51','langco@gmail.com','Tr???n V??n Minh','0973625488','Ph?? Vinh, Ph?? L???c, Hu???','5',NULL,NULL),('a4b1165d-ae8f-4209-9247-c9738ed1d850','werwe',NULL,1,NULL,'2021-01-01 08:03:26',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-01 13:57:07','wgweg','sadfsaf',NULL,NULL,NULL,NULL,NULL),('a8b8fd28-6f1e-4fab-bb43-3642e239891b','Raon Apartment',NULL,0,NULL,'2021-01-22 16:34:11',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 16:34:11','raon@gmail.com','Ho??ng V??n Khi??m','0866357235','97A Ho??ng B??ch S??n, ???? N???ng','4',NULL,NULL),('ae6547f4-2b2d-4f37-ba13-3ee91a7e1b26','Hotel 1',NULL,1,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:15:49','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-05 14:31:02',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('b04f6703-1ee6-4a0e-8627-d979b75c191d','Kh??ch s???n Apple','wefewf',1,NULL,'2021-01-01 13:52:37',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-12 03:05:12','dwqd','wqdqwd','wqwefwef',NULL,'wefwef',NULL,NULL),('b2cae820-4dd3-40a2-9bb3-062e08ba2279','Hotel 1',NULL,0,NULL,'2020-12-05 15:19:52',NULL,NULL,'2020-12-05 15:19:52',NULL,NULL,NULL,NULL,NULL,'2204d44a-88d1-4187-a8cf-a1b352263f3e',NULL),('b61991f8-35fa-4995-8805-f95021e6396c','Hotel 1',NULL,0,NULL,'2020-12-05 15:24:04',NULL,NULL,'2020-12-05 15:24:04',NULL,NULL,NULL,NULL,NULL,'2204d44a-88d1-4187-a8cf-a1b352263f3e',NULL),('b68dadf1-5542-4b11-bf9a-1f8bb67aec59','Hotel 1',NULL,0,NULL,'2020-12-05 09:41:16',NULL,NULL,'2020-12-05 09:41:16',NULL,NULL,NULL,NULL,NULL,'123',NULL),('c52c76d5-764d-4800-990f-96e6c287369c','string','string',0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-05 09:32:02','10ef00e6-3219-44be-b83e-a9604bea4153','1','2020-12-05 09:32:02','string','string','string','string','string','string',NULL),('d2d0c1a4-ff36-49db-8097-aaf50e04011a','Hoang Ngan',NULL,0,NULL,'2021-01-22 16:36:05',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 16:36:05','hoangngan@gmail.com','Mai Ho??ng Ng??n','0397625358','15 Nguy???n S??? Qu???, Vinh','5',NULL,NULL),('d5b25775-5344-4383-b7e3-2197bb5c8da1','Hotel 1',NULL,0,NULL,'2020-12-05 15:29:20',NULL,NULL,'2020-12-05 15:29:20',NULL,NULL,NULL,NULL,NULL,'2204d44a-88d1-4187-a8cf-a1b352263f3e',NULL),('e63d8a9f-70c1-491e-b04b-da728ee1c39d','Alat','Kh??ch s???n t???i Hu???',0,NULL,'2021-01-01 08:05:25',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:23:51','alat@gmail.com','Nguy???n Ng???c Thu Uy??n','0972153544','89 H??? ?????c Di - An C???u - Hu???','5',NULL,NULL),('eef0a444-7418-4334-90a6-516de8f5292f','Hotel 1',NULL,0,NULL,'2020-12-05 15:09:56',NULL,NULL,'2020-12-05 15:09:56',NULL,NULL,NULL,NULL,NULL,'2204d44a-88d1-4187-a8cf-a1b352263f3e',NULL),('f466fb38-7b3f-4fe1-b8e7-f79fbbe97a5d','Hotel 1',NULL,0,NULL,'2020-12-05 15:14:16',NULL,NULL,'2020-12-05 15:14:16',NULL,NULL,NULL,NULL,NULL,'2204d44a-88d1-4187-a8cf-a1b352263f3e',NULL),('fb015211-41ab-48be-81a9-52eab7763eb0','3S','Kh??ch s???n Abi ???????c ????nh gi?? 5 sao ',0,NULL,'2021-01-10 14:43:01',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:21:30','3si@gmail.com','Tr???n Th??? Thu Nh??n','0138452146','412 ?????c Thu???n - TX H???ng L??nh - T???nh H?? T??nh','5',NULL,NULL);
/*!40000 ALTER TABLE `hkm_hotel` ENABLE KEYS */;
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
