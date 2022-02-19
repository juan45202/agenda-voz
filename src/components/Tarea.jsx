import React from 'react'

export default function Tarea({nombre, prioridad, eliminarTarea, guardarTareaEditar}) {

  return (
    <div className='tarea'>
      
      <h4>{nombre}</h4>
      <p>{prioridad}</p>
      <button onClick={() => eliminarTarea(nombre)}>Eliminar</button>
      <button onClick={() => guardarTareaEditar({nombre})}>Editar</button>
    </div>
  )
}
