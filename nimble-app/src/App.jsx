import { useEffect, useState } from "react";
import { traerCandidatoPorEmail } from "./services/candidatoService";


function App(){
  const [datosCandidato, setCandidato] = useState(null);
  const [error, setError] = useState(null);
  const email = import.meta.env.VITE_EMAIL_CANDIDATO;

  useEffect(()=> {
    const obtenerCandidato = async () => {
      try{
        const data = await traerCandidatoPorEmail(email);
        setCandidato(data);
      } catch (err) {
        setError(err.message);
      }
    };

    obtenerCandidato();
  }, []);

  if(error) return <p>Error: {error}</p>;

    return (
    <div>
      <h1>Información del Candidato</h1>
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
    </div>
  );
}
 export default App;