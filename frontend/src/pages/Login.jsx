import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <form onSubmit={submit}>
      <h1>Login Page</h1>
      <input
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <br />
      <br />
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        length="18"
      />
      <br />
      <br />
      <button>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
