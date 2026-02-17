import { useEffect, useState } from "react";
import { traerCandidatoPorEmail } from "./services/candidatoService";
import { obtenerPosiciones } from "./services/posicionesService";


function App(){
  const [datosCandidato, setCandidato] = useState(null);
  const [posiciones, setPosiciones] = useState([]);
  const [error, setError] = useState(null);
  const email = import.meta.env.VITE_EMAIL_CANDIDATO;

  useEffect(()=> {
    const obtenerDatos = async () => {
      try{
        const candidato = await traerCandidatoPorEmail(email);
        setCandidato(candidato);

        const listaPosiciones = await obtenerPosiciones();
        setPosiciones(listaPosiciones);
      } catch (err) {
        setError(err.message);
      }
    };

    obtenerDatos();
  }, []);

  if(error) return <p>Error: {error}</p>;

    return (
    <div>
      <h2>Información del Candidato</h2>
      {datosCandidato ? (
        <div>
          <p>UUID: {datosCandidato.uuid}</p>
          <p>Nombre: {datosCandidato.firstName}</p>
          <p>Apellido: {datosCandidato.lastName}</p>
          <p>Email: {datosCandidato.email}</p>
          <p>ID candidato: {datosCandidato.candidateId}</p>
          <p>ID aplicación: {datosCandidato.applicationId}</p>
        </div>
      ) : (
        <p>Obteniendo información...</p>
      )}

<br />
       <h2>Posiciones Abiertas</h2>
      {posiciones.length > 0 ? (
        <ul>
          {posiciones.map((pos) => (
            <li key={pos.id}>{pos.title}</li>
          ))}
        </ul>
      ) : (
        <p>Cargando posiciones...</p>
      )}
    </div>
  );

  
}


 export default App;