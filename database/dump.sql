
DROP TABLE IF EXISTS `Admin`;

CREATE TABLE `Admin` (
  `username` varchar(25) NOT NULL,
  `password` varchar(25) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` int(40) DEFAULT NULL, 
  PRIMARY KEY (`username`)
);

INSERT INTO `Admin` VALUES ('agustin','agus1307','aguslblumenfeld@gmail.com',098816883);

DROP TABLE IF EXISTS `KnowledgeBase`;

CREATE TABLE `KnowledgeBase` (
  `KB` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`KB`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `Ticket`;

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
);
