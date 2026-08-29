import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
async function handleSubmit(e) {
  e.preventDefault();
  setMessage("");
  setLoading(true);
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message || "Error de autenticacion");
      return;
    }

    setMessage(`Bienvenido ${data.user.name} - Rol: ${data.user.role}`);
    if (onLogin) onLogin(data);
    navigate("/");
  } catch (error) {
    setMessage("No se pudo conectar al backend. Verifica que el servidor esté corriendo en http://localhost:3000");
  } finally {
    setLoading(false);
  }
}
return (
  <div>
    <h1>Login SecureDesk ADSO</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        id="password"
        name="password"
        autoComplete="current-password"
        placeholder="Contrasena"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
    <p>{message}</p>
  </div>
);
}
export default Login;