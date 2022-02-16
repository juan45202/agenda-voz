import React from 'react'
import Tarea from './Tarea'

const ListadoTareas = ({filtroTareas}) => {


  return (
    <>
        <h2>Tareas </h2>
        {filtroTareas.length > 0 ? (filtroTareas.map(tarea => (
            <Tarea 
            nombre={tarea.nombre}
            prioridad={tarea.prioridad}
            />
        )))  : <p>No hay tareas</p>}
    </>
  )
}

export default ListadoTareas