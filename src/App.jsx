import { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import ListadoTareas from './components/ListadoTareas';
import FormularioTarea from './components/FormularioTarea';
import 'react-calendar/dist/Calendar.css';
import './App.css'

function App() {
  
  const [formularioTareas, mostrarFormularioTareas] = useState(false);
  const [value, onChange] = useState(new Date());

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaEspañol = value.toLocaleDateString('es-ES', options);

  var utterance = new SpeechSynthesisUtterance();
  // utterance.text = `Para el ${fechaEspañol} No tienes ninguna tarea proramada`;
  utterance.voice = speechSynthesis.getVoices()[6];
  
  const [tareas, guardarTareas] = useState([]);

  const [filtroTareas, guardarFiltroTareas] = useState([]);

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

  utterance.text = cadenaReproducir();

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
      <h1>{fechaEspañol}</h1>

      <button onClick={()=> {speechSynthesis.speak(utterance)}}>
        Reproducir
      </button>

      <button onClick={() => {mostrarFormularioTareas(!formularioTareas)}}>
        {formularioTareas ? 'Cerrar' : 'Agregar Tarea'}
      </button>

      { formularioTareas ? 
        <FormularioTarea fechaEspañol={fechaEspañol} tareas={tareas} guardarTareas={guardarTareas} /> 
        : null
      }

      <ListadoTareas filtroTareas={filtroTareas} />
    </div>
  )
}

export default App
