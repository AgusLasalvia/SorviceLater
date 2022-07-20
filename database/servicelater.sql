
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
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`username`)
);


--
-- Dumping data for table `Admin`
--


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
  `description` varchar(255) DEFAULT NULL,
  `KB` int NOT NULL,
  `worknotes` varchar(2000) DEFAULT NULL,
  `aditional` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assigned` (`assigned`),
  KEY `KB` (`KB`),
  CONSTRAINT FOREIGN KEY (`assigned`) REFERENCES `Admin` (`username`),
  CONSTRAINT FOREIGN KEY (`KB`) REFERENCES `KnowledgeBase` (`KB`)
);
