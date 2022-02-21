import React from 'react'
import Tarea from './Tarea'

const ListadoTareas = ({filtroTareas, setTareaEditar, eliminarTarea}) => {
  return (
    <>
        <h2>Tareas </h2>
        {filtroTareas.length > 0 ? (filtroTareas.map(tarea => (
            <Tarea
                key={tarea.id}
                id={tarea.id}
                nombre={tarea.nombre}
                prioridad={tarea.prioridad}
                fecha={tarea.fecha}
                setTareaEditar={setTareaEditar}
                eliminarTarea={eliminarTarea}
            />
        )))  : <p>No hay tareas</p>}
    </>
  )
}

export default ListadoTareas