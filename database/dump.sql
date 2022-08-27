-- MySQL dump 10.19  Distrib 10.3.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: servicelater
-- ------------------------------------------------------
-- Server version	10.3.34-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Admin` (
  `username` varchar(25) NOT NULL,
  `password` varchar(25) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES ('agustin','agus1307','aguslblumenfeld@gmail.com');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `KnowledgeBase`
--

DROP TABLE IF EXISTS `KnowledgeBase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `KnowledgeBase` (
  `KB` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`KB`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `KnowledgeBase`
--

LOCK TABLES `KnowledgeBase` WRITE;
/*!40000 ALTER TABLE `KnowledgeBase` DISABLE KEYS */;
INSERT INTO `KnowledgeBase` VALUES (1,'None','1'),(2,'prueba','cambio'),(3,'asdasdaasda','asdasdaads');
/*!40000 ALTER TABLE `KnowledgeBase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ticket`
--

DROP TABLE IF EXISTS `Ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ticket` (
  `id` int(11) NOT NULL,
  `request_by` varchar(25) DEFAULT NULL,
  `request_for` varchar(25) DEFAULT NULL,
  `service_offering` varchar(50) DEFAULT NULL,
  `item` varchar(70) DEFAULT NULL,
  `contact_type` varchar(60) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `assigned` varchar(25) DEFAULT NULL,
  `category` varchar(60) DEFAULT NULL,
  `symptom` varchar(50) DEFAULT NULL,
  `impact` varchar(20) DEFAULT NULL,
  `urgency` varchar(20) DEFAULT NULL,
  `priority` varchar(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `KB` int(11) NOT NULL,
  `worknotes` varchar(2000) DEFAULT NULL,
  `additional` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assigned` (`assigned`),
  KEY `KB` (`KB`),
  CONSTRAINT `Ticket_ibfk_1` FOREIGN KEY (`assigned`) REFERENCES `Admin` (`username`),
  CONSTRAINT `Ticket_ibfk_2` FOREIGN KEY (`KB`) REFERENCES `KnowledgeBase` (`KB`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ticket`
--

LOCK TABLES `Ticket` WRITE;
/*!40000 ALTER TABLE `Ticket` DISABLE KEYS */;
INSERT INTO `Ticket` VALUES (1,'alberto','culo abierto','pepe','papa','Discord','new','agustin','papo','pepo','medium','medium','3-High','para ppapa',1,'asdasda','asdasdsda'),(2,'asd','asd','asd','asd','Discord','new','agustin','asd','asd','high','high','1-Urgent','para ppapa',1,':  undefined',':  undefined'),(3,'asd','asd','asd','asd','ingame','new','agustin','asd','asd','high','high','1-Urgent','asd',1,'agustin:  undefined','agustin:  undefined');
/*!40000 ALTER TABLE `Ticket` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-17 23:26:51
