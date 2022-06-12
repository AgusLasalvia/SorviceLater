function show() {
     field_name = document.getElementById("username").value;
     field_password = document.getElementById("password").value;
     console.log(`name: ${field_name}, password: ${field_password}`)
     window.location.assign('../Templates/menu.html') // routes to menu.html
}