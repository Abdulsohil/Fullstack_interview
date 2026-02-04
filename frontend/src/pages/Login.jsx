import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  //hello
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      console.log("Login success:", res.data); // debug

      login(res.data.token); // store token
      navigate("/dashboard");
      // window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div id="loginContainer">
      <form onSubmit={submit} id="loginForm">
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
        <button
          style={{ marginLeft: "-1px" }}
          onClick={() => {
            window.location.href = "/forgot-password";
          }}
          id="FPBtn"
        >
          forgot password
        </button>
        {error && (
          <p id="error" style={{ color: "red" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
