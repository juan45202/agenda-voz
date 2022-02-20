import React from 'react'

export default function Tarea({id, nombre, prioridad, eliminarTarea, guardarTareaEditar}) {

  return (
    <div className='tarea'>
      <h4>{nombre}</h4>
      <p>{prioridad}</p>
      <button onClick={() => eliminarTarea(id)}>Eliminar</button>
      <button onClick={() => guardarTareaEditar({nombre})}>Editar</button>
    </div>
  )
}
