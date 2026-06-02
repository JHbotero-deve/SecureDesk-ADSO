import { useState } from "react";
function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
async function handleSubmit(e) {
e.preventDefault();
const response = await fetch(
"http://localhost:3000/auth/login",
{ method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, password }) }
);
const data = await response.json();
if (!response.ok) {
setMessage(data.message || "Error de autenticacion");
return;
}
setMessage(
`Bienvenido ${data.user.name} - Rol: ${data.user.role}`
);
}
return (
<div>
<h1>Login SecureDesk ADSO</h1>
<form onSubmit={handleSubmit}>
<input type="email" placeholder="Correo"
value={email}
onChange={(e) => setEmail(e.target.value)} />
<input type="password" placeholder="Contrasena"
value={password}
onChange={(e) => setPassword(e.target.value)} />
<button type="submit">Ingresar</button>
</form>
<p>{message}</p>
</div>
);
}
export default Login;