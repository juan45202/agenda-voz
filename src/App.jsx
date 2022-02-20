import { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import ListadoTareas from './components/ListadoTareas';
import FormularioTarea from './components/FormularioTarea';
import 'react-calendar/dist/Calendar.css';
import './App.css'

function App() {

  const [tareas, guardarTareas] = useState([]);
  const [filtroTareas, guardarFiltroTareas] = useState([]);
  const [formularioTareas, mostrarFormularioTareas] = useState(false);
  const [tareaEditar, guardarTareaEditar] = useState({});

  const [pausa, setPausa] = useState(false);

  const [value, onChange] = useState(new Date());
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaEspañol = value.toLocaleDateString('es-ES', options);

  var utterance = new SpeechSynthesisUtterance();
  utterance.voice = speechSynthesis.getVoices()[5];

  useEffect(() => {
    guardarFiltroTareas(tareas.filter(tarea => tarea.fechaEspañol === fechaEspañol));
  }, [fechaEspañol, tareas])
  

  const cadenaReproducir = () => {
    var cadena = filtroTareas.length > 0 ? `Para el ${fechaEspañol} tiene ` : `Para el ${fechaEspañol} no tiene nada `
    
    for (let i = 0; i < filtroTareas.length; i++){
      cadena += filtroTareas[i].nombre + ' '
    }
    return cadena
  }

  //Funcion que se pasa por props a tarea para eliminar
  const eliminarTarea = id => {
    guardarTareas(tareas.filter(tarea => tarea.id !== id));
  }
  const editarTarea = tarea => {
    console.log('editando')
  }
  
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

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
      <h1>{fechaEspañol}</h1>

      <i className="bi bi-arrow-counterclockwise" >
        reiniciar
      </i>
      <button className={pausa === false ? 'bi bi-play' : 'bi bi-pause' }></button>
      <i className="bi bi-play" onClick={reproducir}>Reproducir</i>

      <i className="bi bi-pause" onClick={stopResume}>Pausar</i>
      

      <button onClick={() => {mostrarFormularioTareas(!formularioTareas)}}>
        {formularioTareas ? 'Cerrar' : 'Agregar Tarea'}
      </button>

      { formularioTareas ? 
        <FormularioTarea 
          fechaEspañol={fechaEspañol}
          tareas={tareas}
          tareaEditar={tareaEditar}
          guardarTareas={guardarTareas}
          editarTarea={editarTarea}
        />
        : null
      }

      <ListadoTareas 
        filtroTareas={filtroTareas}
        eliminarTarea={eliminarTarea}
        guardarTareaEditar={guardarTareaEditar}
      />
    </div>
  )
}

export default App
