# 🎫 SorvisLater

**SorvisLater** es una solución de sistema de tickets IT para servidores **Minecraft**, inspirado en **ServiceNow**.  
Está pensado para facilitar la gestión de solicitudes de soporte en comunidades y servidores técnicos.

---

## 👨‍💻 Autores

- 🎨 **Joaquín Gómez** – *Front-End*
- 🛠️ **Agustín Lasalvia** – *Back-End*

---

## ⚙️ Instalación completa

### 🔧 Requisitos

Antes de comenzar, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) (LTS recomendado)
- MySQL Server

---

### 🧱 Pasos a seguir (Linux)

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/SorvisLater.git
   cd SorvisLater
   ```

2. **Instalar MySQL Server:**

   ```bash
   sudo apt-get install mysql-server
   ```

3. **Ingresar a MySQL como root:**

   ```bash
   sudo mysql
   ```

4. **Crear la base de datos y el usuario:**

   Dentro del cliente de MySQL:

   ```sql
   CREATE DATABASE SorvisLater;
   CREATE USER 'sorvis_user'@'%' IDENTIFIED BY 'tu_contraseña';
   GRANT ALL PRIVILEGES ON SorvisLater.* TO 'sorvis_user'@'%';
   FLUSH PRIVILEGES;
   EXIT;
   ```

5. **Importar las tablas usando el dump:**

   Asegurate de estar en la carpeta `database` del proyecto y ejecutá:

   ```bash
   cd database
   mysql -u sorvis_user -p SorvisLater < dump.sql
   ```

> 🛑 Si usás una máquina distinta para la base de datos, asegurate de abrir el puerto **3306** (por defecto de MySQL).

6. **Volver a la carpeta del servidor e instalar dependencias:**

   ```bash
   cd ../server
   npm install
   npm i -D
   ```

7. **Build del backend:**

   ```bash
   npm run build
   ```

   Esto generará una carpeta `dist/` con el backend compilado desde TypeScript.

8. **Ejecutar el servidor:**

   ```bash
   cd dist
   node index.js
   ```

---

## 🌐 Conexión a la base de datos

Verificá que tu archivo de configuración tenga los datos correctos:

- IP del servidor
- Usuario: `sorvis_user`
- Contraseña: `tu_contraseña`
- Puerto: `3306` (por defecto)
- Base de datos: `SorvisLater`

---

## 🧪 Prueba rápida

1. Asegurate de que el servicio MySQL esté activo:

   ```bash
   sudo service mysql start
   ```

2. Iniciá el backend si no lo hiciste ya:

   ```bash
   cd server/dist
   node index.js
   ```

3. ¡Listo! Tu API debería estar corriendo y lista para recibir peticiones.

---

## 🤝 Contribuciones

¿Querés colaborar? ¡Sos bienvenido!  
Podés:

- Abrir un issue con tus dudas o sugerencias
- Hacer un fork y enviar un pull request

---

## 📄 Licencia

Este proyecto es de código abierto bajo los términos definidos por sus autores.  
Usalo, modificálo y adaptálo como quieras ✨

---

Gracias por usar **SorvisLater** 💙
