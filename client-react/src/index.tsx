import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Asegúrate de tener un archivo CSS si deseas estilos globales
import App from './App'; // Este es el componente principal de tu aplicación

// Crea el nodo raíz de la aplicación
const rootElement = document.getElementById('root') as HTMLElement;

// Renderiza el componente App en el DOM
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
