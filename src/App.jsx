import { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import ListadoTareas from './components/ListadoTareas';
import FormularioTarea from './components/FormularioTarea';
import Header from './components/Header';

import 'react-calendar/dist/Calendar.css';
import {v4 as uuidv4} from 'uuid'
import './App.css'

function App() {

  const [tareas, setTareas] = useState([]);
  const [filtroTareas, setFiltroTareas] = useState([]);
  const [formularioTareas, mostrarFormularioTareas] = useState(false);
  const [tareaEditar, setTareaEditar] = useState({});

  const [error, setError] = useState(false);

  const [pausa, setPausa] = useState(false);

  const [value, onChange] = useState(new Date());
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaEspañol = value.toLocaleDateString('es-ES', options);

  var utterance = new SpeechSynthesisUtterance();
  utterance.voice = speechSynthesis.getVoices()[5];

  const cadenaReproducir = () => {
    var cadena = filtroTareas.length > 0 ? `Para el ${fechaEspañol} tiene ` : `Para el ${fechaEspañol} no tiene nada `
    for (let i = 0; i < filtroTareas.length; i++){
      cadena += filtroTareas[i].nombre + ' '
    }
    return cadena
  }

  //Funcion que se pasa por props a tarea para eliminar
  const eliminarTarea = id => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  }

  const agregarTarea = (tarea) => {
    //Condicional para editar una tarea o agregar una nueva
    if (tarea.id) {
      const tareasActualizadas = tareas.map(tareaState => tareaState.id === tarea.id ? tarea : tareaState);
      setTareas(tareasActualizadas);
      setTareaEditar({});
    } else {
      tarea.id = uuidv4();
      tarea.fecha = fechaEspañol;
      setTareas([...tareas, tarea])
    }
    
  }

  useEffect(() => {
    setFiltroTareas(tareas.filter(tarea => tarea.fecha === fechaEspañol));
  }, [fechaEspañol, tareas])
  
  const reproducir = () => {
    speechSynthesis.cancel();
    setPausa(false);
    utterance.text = cadenaReproducir();
    speechSynthesis.speak(utterance);
  }
  
  const stopResume = () => {
    if (pausa === false) {
      setPausa(true)
      speechSynthesis.pause();
    }else {
      setPausa(false)
      speechSynthesis.resume();
    }
  }

  const tileClass = ({ date, view }) => {
    const fechaEspañol2 = date.toLocaleDateString('es-ES', options);
    if (view === 'month') {
      const found = tareas.find(tarea => tarea.fecha === fechaEspañol2);
      if(found) {
        return 'blue';
      }
    }
  }

  return (
    <div>
      <Header />

      <div className='columna1'>
        
        <Calendar onChange={onChange} value={value} tileClassName={tileClass}/>

        <div className='bloque-botonera'>

          <i className="bi bi-arrow-counterclockwise icono" />
          
          <i className="bi bi-play icono" onClick={reproducir} />

          <i className="bi bi-pause icono" onClick={stopResume} />

          <i 
            className={formularioTareas ? 'bi bi-x-lg icono' : 'bi bi-plus-lg icono'} 
            onClick={() => {mostrarFormularioTareas(!formularioTareas)}}
          />
          
        </div> 
      </div>
      
      <div className='columna2'>
        <h1>{fechaEspañol}</h1>

        {error ? <p className='error'>Todos los campos son obligatorios</p> : null}
        { formularioTareas ? 
          <FormularioTarea 
            fechaEspañol={fechaEspañol}
            tareaEditar={tareaEditar}
            mostrarFormularioTareas={mostrarFormularioTareas}
            agregarTarea={agregarTarea}
            setError={setError}
          />
          : null
        }

        <ListadoTareas 
          filtroTareas={filtroTareas}
          eliminarTarea={eliminarTarea}
          setTareaEditar={setTareaEditar}
        />

      </div>
    </div>
  )
}

export default App
