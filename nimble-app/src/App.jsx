import { useEffect, useState } from "react";
import { traerCandidatoPorEmail } from "./services/candidatoService";
import { obtenerPosiciones } from "./services/posicionesService";
import ListadoPosiciones from "./components/listadoPosiciones";


function App(){
  const [datosCandidato, setCandidato] = useState(null);
  const [posiciones, setPosiciones] = useState([]);
  const [error, setError] = useState(null);
  const email = import.meta.env.VITE_EMAIL_CANDIDATO;

  const aplicarPosicion = async (jobId, repoUrl) => {
    if (!datosCandidato) return;

    const body = {
      uuid: datosCandidato.uuid,
      jobId,
      candidateId: datosCandidato.candidateId,
      applicationId: datosCandidato.candidateId, //agregué este campo ya que probando hacer POST desde Postman me indicaba que era requerido
      repoUrl
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/candidate/apply-to-job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        const posicion = posiciones.find(pos => pos.id === jobId);
        const titulo = posicion ? posicion.title : jobId;

        console.log(`Postulación enviada para posición: ${titulo}`);
      } else {
        console.error(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
    <div style={{ padding: "2rem" }}>
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
    <ListadoPosiciones posiciones={posiciones} enviarPostulacion={aplicarPosicion}/>
    </div>
  );

  
}


 export default App;