import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";

const API_BASE = "http://localhost:3000";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchIncidents();
  }, [token]);

  async function fetchIncidents() {
    try {
      const response = await fetch(`${API_BASE}/incidents`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || "Error al obtener incidentes");
        return;
      }
      setIncidents(data.incidents || []);
    } catch (error) {
      setMessage("No se pudo conectar al backend de incidentes.");
    }
  }

  function handleLogout() {
    setToken("");
    setUser(null);
    setIncidents([]);
    setMessage("");
  }

  function handleOnLogin(data) {
    setToken(data.token);
    setUser(data.user);
    setMessage(`Bienvenido ${data.user.name} - Rol: ${data.user.role}`);
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLogin={handleOnLogin} />}
      />
      <Route
        path="/"
        element={
          token ? (
            <div>
              <h1>SecureDesk ADSO - Incidentes</h1>
              <p>{message}</p>
              <p>
                Usuario: {user?.name} ({user?.role})
              </p>
              <button onClick={handleLogout}>Cerrar sesión</button>

              <section>
                <h2>Últimos incidentes</h2>
                {incidents.length === 0 ? (
                  <p>No hay incidentes registrados.</p>
                ) : (
                  <ul>
                    {incidents.map((incident) => (
                      <li key={incident.id}>
                        <strong>{incident.title}</strong> - {incident.severity} - {incident.reporterEmail}
                        <div>{incident.description}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;