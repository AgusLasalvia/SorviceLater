
This project was made by Joaquin Gomez( Front-End )
And Agustin Lasalvia( Back-End )


#READ ALL THIS FILE BEFORE START#

`SorvisLater`

This is a solution for those who want to work with a ticket sistem.
Sorvis later y ticket is a solution for Minecraft IT services, based on the existing ServiceNow 

##############INSTALATION###############


install command:
`npm install`

Linux:
Install mysql-server
`sudo apt-get install mysql-server`
 user command:
	"sudo mysql" this will enter you to MySQL as root. 
	Create a database like SorvisLater
	For this, you must type 
 	`CREATE DATABASE SorvisLater;`
	After that, create a user with all privileges to access the database.
 	`CREATE USER 'username'@'%' IDENTIFIED BY 'password';`
	
 And grant it all privileges.
 
`GRANT ALL PRIVILEGES ON SorvisLater.* TO 'username'@'%';`

`FLUSH PRIVILEGES;`

And finaly, user the dump file to load all tables.
Exit SQL and enter de code folder, enter the database forlder.
Then in the terminal type: `mysql -u username -p SorvisLater < dump.sql`


Make sure that your database has the correct IP address,password and username.
If you're using a separate machine, remeber to open your TCP port in you DB machine,
by default mysql uses the port 3306.

inside the server folder run the command `npm install` or `npm i`, then use `npm i -D`.

build:
To build this webapp you need to have Node.js (LTS recomended)
the build command is `npm run build`, it will generate a folder called `dist`.
Inside of it is the compiled TS to JS project.
inside of the `dist` folder, run `node index.js` and there you have you webapp backend 
