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
INSERT INTO `hkm_customer` VALUES ('08772d72-a352-40b0-a5ca-ff4cbc9564c4','Hà Thị Hương',NULL,0,NULL,'2021-01-16 19:54:55',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:54:55','1972-02-11','0964523654','557 Phan Chu Trinh - Tam Kỳ - Quảng Nam','huongl@gmail.com','Nữ','184360595',NULL,NULL,NULL),('13c92a7a-d427-43de-ae8d-f00aecde989c','Trần Ngọc Mai Hương',NULL,0,NULL,'2021-01-16 19:57:34',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:57:34','1999-08-15','0396535687','Phong Điền - Huế','huong@gmail.com','Nữ','196453547',NULL,NULL,NULL),('18233073-2845-48c1-b22e-1ddd24c486a6','Phan Thạch Nguyên',NULL,0,NULL,'2021-01-22 18:13:49',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:13:49','1999-12-10','0874512354','Đức Thuận , Hồng Lĩnh, Hà Tĩnh','nguyen@gmail.com','Nam','184385124',NULL,NULL,NULL),('28a9f28f-7a12-480a-a964-78bcc2244134','Phan Hải Phú',NULL,0,NULL,'2021-01-22 18:01:39',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:01:39','1992-11-04','0345214568','Vinh','phuhai@gmail.com','Nam','186425147',NULL,NULL,NULL),('3abf12d9-9ed4-498f-a4f5-ae656c36986e','Bùi Đình Nam',NULL,0,NULL,'2021-01-22 17:57:07',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 17:57:07','1997-10-22','0364521568','Đức Thuận, Hồng Lĩnh, Hà Tĩnh','namdinh@gmail.com','Nam','184360272',NULL,NULL,NULL),('3dbd9ede-4c28-4fb8-801c-188358fcd2cb','Customer 1',NULL,0,NULL,'2020-12-05 15:40:26',NULL,NULL,'2020-12-05 15:40:26',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('430c5b1f-b224-407c-80ca-7ea347609fa5','Ngô Thị Diệu Linh','8 Hồ Đắc Di',0,NULL,'2021-01-09 15:47:35',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:08:18','1985-12-04','06421564788','Trần Phú','linhngo@gmail.com','Nữ','184360278',NULL,NULL,NULL),('5d07f1d4-f685-44b5-8d87-0ecb69e65a9e','Văn Thị Sương',NULL,0,NULL,'2021-01-22 18:08:01',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:08:01','1992-06-07','0899617547','16 Ngô Quyền, Hà Nội','suongsuong@gmail.com','Nữ','184352574',NULL,NULL,NULL),('6b946cd7-9ced-46fe-9bd0-b1b245f483ce','Trần Quang Dũng',NULL,0,NULL,'2021-01-22 18:14:53',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:14:53','1860-07-15','0974125418','17 Bà Triệu, Huế','dungquang@gmail.com','Nam','134256784',NULL,NULL,NULL),('7174a24a-51eb-4b59-b4e0-416ea48c61a6','Đặng Thị Hoa','Thuê phòng lâu dài',0,NULL,'2021-01-09 15:45:37',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:55:48','1999-12-14','0975462188','Kiệt 89 Hồ Đắc Di','hoadang@gmail.com','Nữ','184365252',NULL,NULL,NULL),('77ef7149-946d-44aa-8a46-8a1c1fb4984c','Hà Diệu Thúy',NULL,0,NULL,'2021-01-22 18:04:37',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:04:37','1985-12-04','0942153874','Đà Nẵng','thuy@gmail.com','Nữ','135425474',NULL,NULL,NULL),('88fb7a8c-88fd-47cb-914c-03fc9185154f','Phan Thị Lưu',NULL,0,NULL,'2021-01-22 17:58:01',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 17:58:01','1984-12-01','0362154235','Hồ Đắc Di, Huế','luu@gmail.com','Nữ','183421275',NULL,NULL,NULL),('9ba58a92-c3cb-45da-be4e-8f428ad71844','Xa Thi Mạn',NULL,0,NULL,'2021-01-22 18:06:22',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:06:22','1971-01-03','0394874577','Phong Điền, Huế','man@gmail.com','Nữ','178451272',NULL,NULL,NULL),('a337b483-7148-4236-8ca8-d9f764044f5d','Nguyễn Lưu Ly',NULL,0,NULL,'2021-01-22 18:00:27',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:00:27','1995-12-11','0942135147','81 Nguyễn Huệ, Huế','lyly@gmail.com','Nữ','196425124',NULL,NULL,NULL),('a7ba4769-8834-4c39-8bd4-88dc185a0ef2','Customer 1',NULL,0,NULL,'2020-12-18 15:10:45',NULL,NULL,'2020-12-18 15:10:45',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('b6b492fa-4a16-4895-ad59-6c0a8fadf5e2','Chu Thị Liêm',NULL,0,NULL,'2021-01-22 18:12:59',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:12:59','1898-04-12','097414526','Nguyễn Hữu Tố, Vinh','liem@gmail.com','Nữ','187451245',NULL,NULL,NULL),('c54f6583-1a9f-440a-9546-4a7deafd7ba9','Võ Văn Ngọc',NULL,0,NULL,'2021-01-22 18:02:59',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 18:02:59','1988-02-09','0921451577','Bắc Hồng, Đà Nẵng','ngoc@gmail.com','Nam','195784325',NULL,NULL,NULL),('d4be005b-38b7-4551-8164-5d7f673460c3','Hồ Gia Hiếu',NULL,0,NULL,'2021-01-16 19:58:38',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:58:38','1974-11-25','0367154356','81 Từ Liêm - Hà Nội','hieuho@gmail.com','Nam','145369875',NULL,NULL,NULL),('e385fbc7-c37d-40a5-938a-8e5d40c5f34a','Trần Thị Xuân Mai',NULL,0,'10ef00e6-3219-44be-b83e-a9604bea4153','2020-12-18 15:15:50','10ef00e6-3219-44be-b83e-a9604bea4153','a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-16 19:56:15','1969-03-15','0976125468','Tôn Thất Dương Kị - An Cựu','maimot@gmail.com','Nữ','19563548',NULL,NULL,NULL),('eddda1b4-1956-4c65-b6ed-64ae4c480adf','Customer 1',NULL,0,NULL,'2020-12-05 15:29:21',NULL,NULL,'2020-12-05 15:29:21',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('f1958543-c74c-416e-992a-756d1dd39c68','Customer 1',NULL,0,NULL,'2020-12-18 14:21:43',NULL,NULL,'2020-12-18 14:21:43',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('fff5eaef-55d8-4984-bd09-edcc8771437c','Nguyễn Hải Đăng',NULL,0,NULL,'2021-01-22 17:59:07',NULL,'a8544b1e-d487-4984-bae7-1c24e1360e2e','2021-01-22 17:59:07','1971-02-08','0371456215','Quận 1, Hồ Chí Minh','haidang@gmail.com','Nam','164253547',NULL,NULL,NULL);
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
