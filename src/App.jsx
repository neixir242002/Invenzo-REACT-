// import React from 'react'

import { Configuracion } from "./Conmponents/Configuracion/Configuracion";
import ConfiguracionNotificaciones from "./conmponents/ConfiguracionNotificaciones/Configuracion_notificaciones";
import PerfilUsuario from "./conmponents/ConfiguracionPerfil/Configuracion_perfil";
import CrearUsuario from "./conmponents/CrearUsuario/Crear_usuario";
import EditarUsuario from "./conmponents/EditarUsuario/Editar_usuario";
import EliminarFoto from "./conmponents/EliminarFoto/Eliminar_foto";
import GestionUsuarios from "./conmponents/GestionUsuarios/Gestion_usuarios";


const App = () => {
  return (
    <>
      <Configuracion/>
      <ConfiguracionNotificaciones/>
      <PerfilUsuario/>
      <CrearUsuario/>
      <EditarUsuario/>
      <EliminarFoto/>
      <GestionUsuarios/>
      
    </>
  )
}

export default App;