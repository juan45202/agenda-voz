import React from 'react'

export default function Tarea({id, nombre, fecha, prioridad, eliminarTarea, setTareaEditar}) {
  return (
    <div className='tarea'>
      <h4>{nombre}</h4>
      <p>{prioridad}</p>
      <button onClick={() => eliminarTarea(id)}>Eliminar</button>
      <button onClick={() => setTareaEditar({id, nombre, prioridad, fecha})}>Editar</button>
    </div>
  )
}
