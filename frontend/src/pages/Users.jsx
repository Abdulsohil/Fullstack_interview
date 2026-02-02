import { useEffect, useState } from "react";
import api from "../api";
export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);
  return (
    <>
      <h1>Users Page</h1>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </>
  );
}
