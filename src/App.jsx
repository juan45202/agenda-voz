import { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import ListadoTareas from './components/ListadoTareas';
import FormularioTarea from './components/FormularioTarea';
import Tarea from './components/Tarea';
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

  const cadenaReproducir = () => {
    var cadena = `Para el ${fechaEspañol} tiene `
    for (let i = 0; i < tareas.length; i++){
      cadena += tareas[i].nombre + ' '
    }
    console.log(cadena)
    return cadena
  }
  utterance.text = cadenaReproducir();
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
      <h1>{fechaEspañol}</h1>

      <button onClick={()=> {speechSynthesis.speak(utterance);}}>
        reproducir
      </button>

      <button onClick={() => {mostrarFormularioTareas(true)}}>
        Agregar tarea
      </button>

      { formularioTareas ? 
        <FormularioTarea fechaEspañol={fechaEspañol} tareas={tareas} guardarTareas={guardarTareas} /> 
        : null
      }

      <ListadoTareas tareas={tareas} />
    </div>
  )
}

export default App
