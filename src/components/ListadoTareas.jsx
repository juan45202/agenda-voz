import React from 'react'
import Tarea from './Tarea'

const ListadoTareas = ({tareas}) => {
  return (
    <>

        <h2>Tareas </h2>

        {tareas.map(tarea => (
            <Tarea 
                nombre={tarea.nombre}
                prioridad={tarea.prioridad}    
            />
        ))}

    </>
  )
}

export default ListadoTareas