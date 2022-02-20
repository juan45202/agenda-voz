import React, { useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'

const FormularioTarea = (
    {   fechaEspañol, 
        tareas, 
        tareaEditar, 
        guardarTareas,
        editarTarea
    
    }) => {
    
    const [nombre, setNombre] = useState('');
    const [prioridad, setPrioridad] = useState('');
    
    useEffect(() => {
        if (Object.keys(tareaEditar).length) {
            setNombre(tareaEditar.nombre)
            setPrioridad(tareaEditar.prioridad)
        }
    }, [tareaEditar])

    
    const handleSubmit = e => {
        e.preventDefault();
        
        //Hacer codigo para editar y agregar la tarea
        
        guardarTareas(
            [...tareas, {id: uuidv4() ,nombre, prioridad, fechaEspañol}]
        );
        setNombre('')
        setPrioridad('')
    }

    return (
    
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Tarea: 
                <input type="text" name='nombre' value={nombre} onChange={e => {setNombre(e.target.value)}} />
            </label>
            <label>Prioridad</label>
            <select id='categoria' value={prioridad} onChange={e => {setPrioridad(e.target.value)}}>
                <option value="">Seleccione una prioridad</option>
                <option value="importante">Importante</option>
                <option value="urgente">Urgente</option>
            </select>
            <input type="submit" value={ Object.keys(tareaEditar).length ? 'Editar Tarea' : 'Agreagar Tarea'} />
        </form>
    </div>
  )
}

export default FormularioTarea