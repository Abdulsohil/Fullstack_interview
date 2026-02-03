import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <Link to="/users">Go to Users List</Link>
      <br /><br />
      <button onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
          alert("Logout successful");
        }} type="button">
        Logout</button>
    </div>
  );
}
