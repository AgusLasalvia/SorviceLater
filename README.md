
# 🎫 SorvisLater

**SorvisLater** is an IT ticketing system solution for **Minecraft** servers, inspired by **ServiceNow**.  
It is designed to facilitate the management of support requests in communities and technical servers.

---

## 👨‍💻 Authors

- 🎨 **Joaquín Gómez** – *Front-End*
- 🛠️ **Agustín Lasalvia** – *Back-End*

---

## ⚙️ Full Installation

### 🔧 Prerequisites

Before getting started, make sure you have installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- MySQL Server

---

### 🧱 Steps (Linux)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-user/SorvisLater.git
   cd SorvisLater
   ```

2. **Install MySQL Server:**

   ```bash
   sudo apt-get install mysql-server
   ```

3. **Login to MySQL as root:**

   ```bash
   sudo mysql
   ```

4. **Create the database and user:**

   Inside the MySQL client:

   ```sql
   CREATE DATABASE SorvisLater;
   CREATE USER 'sorvis_user'@'%' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON SorvisLater.* TO 'sorvis_user'@'%';
   FLUSH PRIVILEGES;
   EXIT;
   ```

5. **Import tables using the dump:**

   Make sure you are in the `database` folder of the project and run:

   ```bash
   cd database
   mysql -u sorvis_user -p SorvisLater < dump.sql
   ```

> 🛑 If you are using a separate machine for the database, make sure to open port **3306** (default for MySQL).

6. **Go back to the server folder and install dependencies:**

   ```bash
   cd ../server
   npm install
   npm i -D
   ```

7. **Build the backend:**

   ```bash
   npm run build
   ```

   This will generate a `dist/` folder with the backend compiled from TypeScript.

8. **Run the server:**

   ```bash
   cd dist
   node index.js
   ```

---

## 🌐 Database Connection

Check that your configuration file has the correct details:

- Server IP
- Username: `sorvis_user`
- Password: `your_password`
- Port: `3306` (default)
- Database: `SorvisLater`

---

## 🧪 Quick Test

1. Make sure the MySQL service is running:

   ```bash
   sudo service mysql start
   ```

2. Start the backend if you haven’t already:

   ```bash
   cd server/dist
   node index.js
   ```

3. Done! Your API should be up and running, ready to receive requests.

---

## 🤝 Contributions

Want to contribute? You're welcome!  
You can:

- Open an issue with your questions or suggestions
- Fork the repo and submit a pull request

---

## 📄 License

This project is open source under the terms defined by its authors.  
Feel free to use, modify, and adapt it as you wish ✨

---

Thanks for using **SorvisLater** 💙
