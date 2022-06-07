CREATE DATABASE Ticket;

USE Ticket;

CREATE TABLE User(username varchar(25) PRIMARY KEY,
password varchar(25));

CREATE TABLE Client(username varchar(25) PRIMARY KEY,
email varchar(50),
CONSTRAINT FOREIGN KEY(username) REFERENCES User(username));

CREATE TABLE Admin(username varchar(25)PRIMARY KEY,
name varchar(25),
lastname varchar(25),
email varchar(50));

CREATE TABLE Ticket(id int(7),
request_by varchar(25),
request_for varchar(25),
service_offering varchar(50),
item varchar(70),
assigned varchar(25),
symptom varchar(50),
impact varchar(20),
urgency varchar(20),
ticket_priority varchar(20),
configuration_idem varchar(50),
CONSTRAINT FOREIGN KEY (request_by) REFERENCES User(username),
CONSTRAINT FOREIGN KEY (request_for) REFERENCES User(username),
CONSTRAINT FOREIGN KEY (assigned) REFERENCES Admin(username),
CONSTRAINT FOREIGN KEY (service_offering) REFERENCES Problem(type)


CREATE TABLE worknotes(note_id int(20) PRIMARY KEY,
ticket_id int(7),
person varchar(25),
notes varchar(255),
time time,
date date,
CONSTRAINT FOREIGN KEY (ticket_id) REFERENCES Ticket(id),
CONSTRAINT FOREIGN KEY (person) REFERENCES User(username));