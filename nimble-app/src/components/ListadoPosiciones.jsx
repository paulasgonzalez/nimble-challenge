import { useState } from "react";

function ListadoPosiciones ({ posiciones }) {
  const [repositorios, setRepositorios] = useState({});

  const handleChange = (id, value) => {
    setRepositorios((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <h2>Posiciones Abiertas</h2>
      {posiciones.length > 0 ? (
        <ul>
          {posiciones.map((pos) => (
            <li key={pos.id} style={{ marginBottom: "1rem" }}>
              <p><strong>{pos.title}</strong></p>
              <input
                type="text"
                placeholder="Ingresá aqui la URL de tu repositorio"
                value={repositorios[pos.id] || ""}
                onChange={(e) => handleChange(pos.id, e.target.value)}
                style={{ width: "300px", marginRight: "0.5rem" }}
              />
              <button onClick={()=> enviarPostulacion(pos.id, repositorios[pos.id])}>Submit</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay posiciones disponibles.</p>
      )}
    </div>
  );
}

export default ListadoPosiciones ;
