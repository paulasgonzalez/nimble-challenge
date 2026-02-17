export const traerCandidatoPorEmail = async(email) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    try{
        const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);

        if(!response.ok){
            throw new Error("Error al obtener datos del candidato")
        }

        const data = await response.json();
        return data;
    } catch(error){
        console.error("Error en candidatosService: ", error);
        throw error;
    }
};
