import React, { useState, useEffect } from 'react'

const FormularioTarea = (
    {   
        fechaEspañol,
        tareaEditar,
        agregarTarea,
        setError,
        mostrarFormularioTareas
    }) => {
    
    const [nombre, setNombre] = useState('');
    const [prioridad, setPrioridad] = useState('');
    
    useEffect(() => {
        if (Object.keys(tareaEditar).length) {
            setNombre(tareaEditar.nombre)
            setPrioridad(tareaEditar.prioridad)
        }
    }, [tareaEditar])

    useEffect(() => {
        setNombre('')
        setPrioridad('')
      }, [fechaEspañol])

    const handleSubmit = e => {

        e.preventDefault();
        if([nombre, prioridad].includes('')) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000);
            return
        }
        if (tareaEditar.id) {
            tareaEditar.nombre = nombre
            tareaEditar.prioridad = prioridad
            agregarTarea(tareaEditar)    
        }else {
            agregarTarea({nombre, prioridad})
        }
        mostrarFormularioTareas(false)
        setNombre('')
        setPrioridad('')
    }

    return (
    
    <div className='contenedor-formulario'>
        <i className="bi bi-x-lg icono derecha" onClick={() => {mostrarFormularioTareas(false)}}></i>
        <form onSubmit={handleSubmit}>
            <div className='campo'>
                <label>Tarea:</label>
                <input 
                    type="text" 
                    name='nombre' 
                    placeholder='Ingrese el nombre de su tarea' 
                    value={nombre} onChange={e => {setNombre(e.target.value)}} 
                />
            </div>
            <div className='campo'>
                <label>Prioridad:</label>
                <select className='lista-prioridades' id='categoria' value={prioridad} onChange={e => {setPrioridad(e.target.value)}}>
                    <option value="">Seleccione una prioridad</option>
                    <option value="importante">Importante</option>
                    <option value="urgente">Urgente</option>
                </select>
            </div>
            <input type="submit" value={ Object.keys(tareaEditar).length ? 'Editar Tarea' : 'Agreagar Tarea'} />
        </form>
    </div>
  )
}

export default FormularioTarea