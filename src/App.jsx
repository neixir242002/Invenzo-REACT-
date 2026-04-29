import React from 'react'
<<<<<<< HEAD

//====================== Page models pantallas emergentes Imports ========================//
import ModelAgregarCategoria from './pages/VentanasEmergentes/categoria/ModelAgregarCategoria'
import ModeloEditarCategoria from './pages/VentanasEmergentes/categoria/ModeloEditarCategoria'
import ModelEliminarCategoria from './pages/VentanasEmergentes/categoria/ModelEliminarCategoria'
import ModelAgregarProducto from './pages/VentanasEmergentes/producto/ModelAgregarProducto'
import ModalEditarProducto from './pages/VentanasEmergentes/producto/ModalEditarProducto'
import ModelEliminarProducto from './pages/VentanasEmergentes/producto/ModelEliminarProducto'
import ModelCrearUsuario from './pages/VentanasEmergentes/usuario/ModelCrearUsuario'
import ModelEditarUsuario from './pages/VentanasEmergentes/usuario/ModelEditarUsuario'
import ModaResetUsuario from './pages/VentanasEmergentes/usuario/ModaResetUsuario'

//====================== Page de las pantallas principales Imports ========================//
import Almacenamiento from './pages/Inventario/Almacenamiento/Almacenamiento'
import Alerta_Stock from './pages/Inventario/Alerta_Stock/Alerta_Stock'
import Categorias from './pages/Inventario/Categorias/Categorias'
import Control_Inventario from './pages/Inventario/Control_Inventario/Control_Inventario'
import Dashboard from './pages/Inventario/Dashboard/Dashboard'
import Historial from './pages/Inventario/Historial/Historial'
import Gestor_Productos from './pages/Inventario/Gestor_Productos/Gestor_Productos'
import Productos_Inactivos from './pages/Inventario/Productos_Inactivos/Productos_Inactivos'


//====================== Page de las configuraciones Imports ========================//
import { Configuracion } from './pages/Configuraciones/Configuracion/Configuracion'
import ConfiguracionNotificaciones from './pages/Configuraciones/ConfiguracionNotificaciones/Configuracion_notificaciones'
import PerfilUsuario from './pages/Configuraciones/ConfiguracionPerfil/Configuracion_perfil'
import CrearUsuario from './pages/Configuraciones/CrearUsuario/Crear_usuario'
import EditarUsuario from './pages/Configuraciones/EditarUsuario/Editar_usuario'
import EliminarFoto from './pages/Configuraciones/EliminarFoto/Eliminar_foto'
import GestionUsuarios from './pages/Configuraciones/GestionUsuarios/Gestion_usuarios'

//====================== Page de el Home Imports ========================//
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { Routes,Route } from "react-router-dom"
import Base from './components/Base/Base'

=======
// import Almacenamiento from './Componetes/Inventario/Almacenamiento/Almacenamiento'
// import Alerta_Stock from './Componetes/Inventario/Alerta_Stock/Alerta_Stock'
import Control_Inventario from './Componetes/Inventario/Control_Inventario/Control_Inventario'
>>>>>>> 2d97dd30e7542195a6b78a83b4244a52d546e99d

const App = () => {
  return (
    <>
<<<<<<< HEAD
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas con layout Base */}
        <Route path="/app" element={<Base />}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="inventario" element={<Control_Inventario />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="historial" element={<Historial />} />
          <Route path="alertas" element={<Alerta_Stock />} />
          <Route path="almacen" element={<Almacenamiento />} />
          <Route path="usuarios" element={<GestionUsuarios />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>
      </Routes>

    </>
  )
}

=======
      {/* <Almacenamiento/> */}
      {/* <Alerta_Stock/> */}
      <Control_Inventario/>
    </>
  )
}
>>>>>>> 2d97dd30e7542195a6b78a83b4244a52d546e99d
export default App
