export const obtenerPosiciones = async () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  try {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

    if (!response.ok) {
      throw new Error("Error al obtener la lista de posiciones");
    }

    return response.json();
  } catch (error) {
    console.error("Error en puestosService:", error);
    throw error;
  }
};