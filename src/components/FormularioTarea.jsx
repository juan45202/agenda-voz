import React, { useState } from 'react'

const FormularioTarea = ({fechaEspañol, tareas, guardarTareas}) => {
    
    const [nombre, setNombre] = useState('');
    const [prioridad, setPrioridad] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        guardarTareas(
            [...tareas, {nombre, prioridad, fechaEspañol}]
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
                <option value="">--- Seleccione una prioridad ---</option>
                <option value="importante">Importante</option>
                <option value="urgente">Urgente</option>
            </select>
            <input type="submit" value="agregar" />
        </form>
    </div>
  )
}

export default FormularioTarea