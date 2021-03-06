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
-- Table structure for table `hkm_customer`
--

DROP TABLE IF EXISTS `hkm_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hkm_customer` (
  `Id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `delete_flag` tinyint DEFAULT '0',
  `created_by` char(64) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_by` char(64) DEFAULT NULL,
  `siteId` char(64) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `birthday` date DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `identity_card` varchar(20) DEFAULT NULL,
  `login_code` varchar(6) DEFAULT NULL,
  `logincode_expired` varchar(6) DEFAULT NULL,
  `parentId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_9433373181243ebda9778cdaa8f` (`parentId`),
  CONSTRAINT `FK_9433373181243ebda9778cdaa8f` FOREIGN KEY (`parentId`) REFERENCES `hkm_customer` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hkm_customer`
--

LOCK TABLES `hkm_customer` WRITE;
/*!40000 ALTER TABLE `hkm_customer` DISABLE KEYS */;
INSERT INTO `hkm_customer` VALUES ('08772d72-a352-40b0-a5ca-ff4cbc9564c4','H?? Th??? H????ng',NULL,0,NULL,'2021-01-16 19:54:55',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:54:55','1972-02-11','0964523654','557 Phan Chu Trinh - Tam K??? - Qu???ng Nam','huongl@gmail.com','N???','184360595',NULL,NULL,NULL),('13c92a7a-d427-43de-ae8d-f00aecde989c','Tr???n Ng???c Mai H????ng',NULL,0,NULL,'2021-01-16 19:57:34',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:57:34','1999-08-15','0396535687','Phong ??i???n - Hu???','huong@gmail.com','N???','196453547',NULL,NULL,NULL),('18233073-2845-48c1-b22e-1ddd24c486a6','Phan Th???ch Nguy??n',NULL,0,NULL,'2021-01-22 18:13:49',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:13:49','1999-12-10','0874512354','?????c Thu???n , H???ng L??nh, H?? T??nh','nguyen@gmail.com','Nam','184385124',NULL,NULL,NULL),('28a9f28f-7a12-480a-a964-78bcc2244134','Phan H???i Ph??',NULL,0,NULL,'2021-01-22 18:01:39',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:01:39','1992-11-04','0345214568','Vinh','phuhai@gmail.com','Nam','186425147',NULL,NULL,NULL),('3abf12d9-9ed4-498f-a4f5-ae656c36986e','B??i ????nh Nam',NULL,0,NULL,'2021-01-22 17:57:07',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 17:57:07','1997-10-22','0364521568','?????c Thu???n, H???ng L??nh, H?? T??nh','namdinh@gmail.com','Nam','184360272',NULL,NULL,NULL),('3dbd9ede-4c28-4fb8-801c-188358fcd2cb','Customer 1',NULL,0,NULL,'2020-12-05 15:40:26',NULL,NULL,'2020-12-05 15:40:26',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('430c5b1f-b224-407c-80ca-7ea347609fa5','Ng?? Th??? Di???u Linh','8 H??? ?????c Di',0,NULL,'2021-01-09 15:47:35',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:08:18','1985-12-04','06421564788','Tr???n Ph??','linhngo@gmail.com','N???','184360278',NULL,NULL,NULL),('5d07f1d4-f685-44b5-8d87-0ecb69e65a9e','V??n Th??? S????ng',NULL,0,NULL,'2021-01-22 18:08:01',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:08:01','1992-06-07','0899617547','16 Ng?? Quy???n, H?? N???i','suongsuong@gmail.com','N???','184352574',NULL,NULL,NULL),('6b946cd7-9ced-46fe-9bd0-b1b245f483ce','Tr???n Quang D??ng',NULL,0,NULL,'2021-01-22 18:14:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:14:53','1860-07-15','0974125418','17 B?? Tri???u, Hu???','dungquang@gmail.com','Nam','134256784',NULL,NULL,NULL),('7174a24a-51eb-4b59-b4e0-416ea48c61a6','?????ng Th??? Hoa','Thu?? ph??ng l??u d??i',0,NULL,'2021-01-09 15:45:37',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:55:48','1999-12-14','0975462188','Ki???t 89 H??? ?????c Di','hoadang@gmail.com','N???','184365252',NULL,NULL,NULL),('77ef7149-946d-44aa-8a46-8a1c1fb4984c','H?? Di???u Th??y',NULL,0,NULL,'2021-01-22 18:04:37',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:04:37','1985-12-04','0942153874','???? N???ng','thuy@gmail.com','N???','135425474',NULL,NULL,NULL),('88fb7a8c-88fd-47cb-914c-03fc9185154f','Phan Th??? L??u',NULL,0,NULL,'2021-01-22 17:58:01',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 17:58:01','1984-12-01','0362154235','H??? ?????c Di, Hu???','luu@gmail.com','N???','183421275',NULL,NULL,NULL),('9ba58a92-c3cb-45da-be4e-8f428ad71844','Xa Thi M???n',NULL,0,NULL,'2021-01-22 18:06:22',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:06:22','1971-01-03','0394874577','Phong ??i???n, Hu???','man@gmail.com','N???','178451272',NULL,NULL,NULL),('a337b483-7148-4236-8ca8-d9f764044f5d','Nguy???n L??u Ly',NULL,0,NULL,'2021-01-22 18:00:27',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:00:27','1995-12-11','0942135147','81 Nguy???n Hu???, Hu???','lyly@gmail.com','N???','196425124',NULL,NULL,NULL),('a7ba4769-8834-4c39-8bd4-88dc185a0ef2','Customer 1',NULL,0,NULL,'2020-12-18 15:10:45',NULL,NULL,'2020-12-18 15:10:45',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('b6b492fa-4a16-4895-ad59-6c0a8fadf5e2','Chu Th??? Li??m',NULL,0,NULL,'2021-01-22 18:12:59',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:12:59','1898-04-12','097414526','Nguy???n H???u T???, Vinh','liem@gmail.com','N???','187451245',NULL,NULL,NULL),('c54f6583-1a9f-440a-9546-4a7deafd7ba9','V?? V??n Ng???c',NULL,0,NULL,'2021-01-22 18:02:59',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:02:59','1988-02-09','0921451577','B???c H???ng, ???? N???ng','ngoc@gmail.com','Nam','195784325',NULL,NULL,NULL),('d4be005b-38b7-4551-8164-5d7f673460c3','H??? Gia Hi???u',NULL,0,NULL,'2021-01-16 19:58:38',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:58:38','1974-11-25','0367154356','81 T??? Li??m - H?? N???i','hieuho@gmail.com','Nam','145369875',NULL,NULL,NULL),('e385fbc7-c37d-40a5-938a-8e5d40c5f34a','Tr???n Th??? Xu??n Mai',NULL,0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:15:50','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:56:15','1969-03-15','0976125468','T??n Th???t D????ng K??? - An C???u','maimot@gmail.com','N???','19563548',NULL,NULL,NULL),('eddda1b4-1956-4c65-b6ed-64ae4c480adf','Customer 1',NULL,0,NULL,'2020-12-05 15:29:21',NULL,NULL,'2020-12-05 15:29:21',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('f1958543-c74c-416e-992a-756d1dd39c68','Customer 1',NULL,0,NULL,'2020-12-18 14:21:43',NULL,NULL,'2020-12-18 14:21:43',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('fff5eaef-55d8-4984-bd09-edcc8771437c','Nguy???n H???i ????ng',NULL,0,NULL,'2021-01-22 17:59:07',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 17:59:07','1971-02-08','0371456215','Qu???n 1, H??? Ch?? Minh','haidang@gmail.com','Nam','164253547',NULL,NULL,NULL);
/*!40000 ALTER TABLE `hkm_customer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 20:01:50
