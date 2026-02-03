import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <Link to="/dashboard">Back to Dashboard</Link>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email} - {u.role} - {u.status } - {u.createdAt}
          </li>
        ))}
      </ul>
    </div>
  );
}
