import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await api.post(`/auth/reset-password/${token}`, { password });
    alert("Password reset successful");
    navigate("/");
  };

  return (
    <form onSubmit={submit}>
      <h2>Reset Password</h2>
      <Link to="/users">Go to Users List</Link>
      <br />
      <br />
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button>Reset Password</button>
    </form>
  );
}
