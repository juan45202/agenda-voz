import React from 'react'

export default function Tarea({id, nombre, fecha, prioridad, eliminarTarea, setTareaEditar}) {
  return (

    <div className='tarea'>
      <h3>{nombre}</h3>
      <p>{prioridad}</p>
      <button className='btn-tarea' onClick={() => eliminarTarea(id)}>Eliminar</button>
      <button onClick={() => setTareaEditar({id, nombre, prioridad, fecha})}>Editar</button>
    </div>
  )
}
