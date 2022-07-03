-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: servicelater
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
CREATE TABLE `Admin` (
  `username` varchar(25) NOT NULL,
  `password` varchar(25) DEFAULT NULL,
  `name` varchar(25) DEFAULT NULL,
  `lastname` varchar(25) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`username`)
);


--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES ('0',NULL,NULL,NULL,NULL),('lasa1307','agus1307','agustin','lasalvia','aguslbluemenfeld@gmail.com');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `KnowledgeBase`
--

DROP TABLE IF EXISTS `KnowledgeBase`;
CREATE TABLE `KnowledgeBase` (
  `KB` int NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`KB`)
);

--
-- Dumping data for table `KnowledgeBase`
--

LOCK TABLES `KnowledgeBase` WRITE;
/*!40000 ALTER TABLE `KnowledgeBase` DISABLE KEYS */;
/*!40000 ALTER TABLE `KnowledgeBase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ticket`
--

DROP TABLE IF EXISTS `Ticket`;

CREATE TABLE `Ticket` (
  `id` int NOT NULL,
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
  PRIMARY KEY (`id`),
  KEY `assigned` (`assigned`),
  CONSTRAINT `Ticket_ibfk_1` FOREIGN KEY (`assigned`) REFERENCES `Admin` (`username`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ticket`
--

LOCK TABLES `Ticket` WRITE;
/*!40000 ALTER TABLE `Ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `Ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Worknotes`
--

DROP TABLE IF EXISTS `Worknotes`;

CREATE TABLE `Worknotes` (
  `note_id` int NOT NULL,
  `ticket_id` int DEFAULT NULL,
  `person` varchar(25) DEFAULT NULL,
  `notes` varchar(900) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`note_id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `person` (`person`),
  CONSTRAINT `Worknotes_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `Ticket` (`id`),
  CONSTRAINT `Worknotes_ibfk_2` FOREIGN KEY (`person`) REFERENCES `Admin` (`username`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Worknotes`
--

LOCK TABLES `Worknotes` WRITE;
/*!40000 ALTER TABLE `Worknotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Worknotes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-25 14:16:38
