import React from "react";

// ====================== MODALES ====================== //
// (los dejas importados si los vas a usar luego)
import ModelAgregarCategoria from './pages/VentanasEmergentes/categoria/ModelAgregarCategoria'
import ModeloEditarCategoria from './pages/VentanasEmergentes/categoria/ModeloEditarCategoria'
import ModelEliminarCategoria from './pages/VentanasEmergentes/categoria/ModelEliminarCategoria'
import ModelAgregarProducto from './pages/VentanasEmergentes/producto/ModelAgregarProducto'
import ModalEditarProducto from './pages/VentanasEmergentes/producto/ModalEditarProducto'
import ModelEliminarProducto from './pages/VentanasEmergentes/producto/ModelEliminarProducto'
import ModelCrearUsuario from './pages/VentanasEmergentes/usuario/ModelCrearUsuario'
import ModelEditarUsuario from './pages/VentanasEmergentes/usuario/ModelEditarUsuario'
import ModaResetUsuario from './pages/VentanasEmergentes/usuario/ModaResetUsuario'
import Modal_Almacen from "./pages/VentanasEmergentes/producto/Modal_Almacen"

// ====================== VISTAS PRINCIPALES ====================== //
import Almacenamiento from './pages/Inventario/Almacenamiento/Almacenamiento'
import Alerta_Stock from './pages/Inventario/Alerta_Stock/Alerta_Stock'
import Categorias from './pages/Inventario/Categorias/Categorias'
import Control_Inventario from './pages/Inventario/Control_Inventario/Control_Inventario'
import Dashboard from './pages/Inventario/Dashboard/Dashboard'
import Historial from './pages/Inventario/Historial/Historial'
import Gestor_Productos from './pages/Inventario/Gestor_Productos/Gestor_Productos'
import Productos_Inactivos from './pages/Inventario/Productos_Inactivos/Productos_Inactivos'

// ====================== CONFIGURACIÓN ====================== //
import { Configuracion } from './pages/Configuraciones/Configuracion/Configuracion'
import ConfiguracionNotificaciones from './pages/Configuraciones/ConfiguracionNotificaciones/Configuracion_notificaciones'
import PerfilUsuario from './pages/Configuraciones/ConfiguracionPerfil/Configuracion_perfil'
import CrearUsuario from './pages/Configuraciones/CrearUsuario/Crear_usuario'
import EditarUsuario from './pages/Configuraciones/EditarUsuario/Editar_usuario'
import EliminarFoto from './pages/Configuraciones/EliminarFoto/Eliminar_foto'
import GestionUsuarios from './pages/Configuraciones/GestionUsuarios/Gestion_usuarios'

// ====================== AUTH ====================== //
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'

// ====================== ROUTER ====================== //
import { Routes, Route } from "react-router-dom"
import Base from './components/Base/Base'

const App = () => {
  return (
    <Routes>

      {/* ===== RUTAS PÚBLICAS ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* ===== RUTAS PRIVADAS CON LAYOUT ===== */}
      <Route path="/app" element={<Base />}>

        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Inventario */}
        <Route path="inventario" element={<Control_Inventario />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="historial" element={<Historial />} />
        <Route path="alertas" element={<Alerta_Stock />} />
        <Route path="almacen" element={<Almacenamiento />} />
        
        
        {/* Usuarios */}
        <Route path="usuarios" element={<GestionUsuarios />} />

        {/* Configuración */}
        <Route path="configuracion" element={<Configuracion />} />

      </Route>

    </Routes>
  );
};

export default App;