import { useState } from "react";
import api from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/forgot-password", { email });
    try {
      const res = await api.post("/auth/forgot-password", { email });
      alert(res.data.message);
      setMessage(res.data.message);
      setResetLink(res.data.resetLink);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset link");
    }
  };

  return (
    <>
      <form onSubmit={submit}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button>Send Reset Link</button>
      </form>

      {message && <p>{message}</p>}

      {resetLink && (
        <p>
          Reset Link:{" "}
          <a href={resetLink} target="_self" rel="noreferrer">
            {resetLink}
          </a>
        </p>
      )}
    </>
  );
}
