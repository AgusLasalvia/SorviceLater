#####################################
This project was made by Joaquin Gomez( Front-End )
And Agustin Lasalvia( Back-End )
#####################################

#Sorvis Later
This is a solution for those who want to work with a ticket sistem.
Sorvis later y ticket base solution for Minecraft IT services.

##############INSTALATION###############
run command:
	npm install

Linux:
Install mysql-server
	sudo apt-get install mysql-server
 user command:
	"sudo mysql" this will enter you to MySQL as root. 
	Create a database like SorvisLater
	For this, you must type "CREATE DATABASE SorvisLater;"
	After that, create a user with all privileges to access de database.
		CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
	And grant it all privileges.
		GRANT ALL PRIVILEGES ON SorvisLater.* TO 'username'@'localhost';
		FLUSH PRIVILEGES;
	And finaly, user the dump file to load all tables.
	Exit SQL and enter de code folder, enter the database forlder.
	Then in the terminal type:
		mysql -u username -p SorvisLater < dump.sql


Make shure that your database has the correct IP address,password and username.

to run the file user node index.js
