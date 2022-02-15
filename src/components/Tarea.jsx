import React from 'react'

export default function Tarea({nombre, prioridad}) {

  return (

    <div className='tarea'>
      <h4>{nombre}</h4>
      <p>{prioridad}</p>
    </div>
    
    
  )
}
