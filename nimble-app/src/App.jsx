import { useEffect, useState } from "react";
import { traerCandidatoPorEmail } from "./services/candidatoService";
import { obtenerPosiciones } from "./services/posicionesService";
import ListadoPosiciones from "./components/listadoPosiciones";
import Swal from 'sweetalert2';


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
      applicationId: datosCandidato.applicationId, //agregué este campo ya que probando hacer POST desde Postman me indicaba que era requerido
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

        Swal.fire({
          icon: "success",
          title: "¡Postulación enviada!",
          text: `Te postulaste a ${titulo}`,
          confirmButtonColor: "#1cae65"
        });
        } else {
            Swal.fire({
              icon: "error",
              title: "No se pudo enviar la postulación",
              text: data.message || "Intenta nuevamente",
              confirmButtonColor: "#d33"
            });
      }
    } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: err.message || "Error inesperado",
          confirmButtonColor: "#d33"
        });
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
          Swal.fire({
          icon: "error",
          title: "Error al cargar datos",
          text: err.message || "Ocurrió un error inesperado",
          confirmButtonColor: "#d33"
        });
      }
    };

    obtenerDatos();
  }, []);

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