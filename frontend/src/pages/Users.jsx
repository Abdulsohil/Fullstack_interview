import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = () => {
    api.get("/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/users/${editingId}`, form);
      setEditingId(null);
    } else {
      await api.post("/users", form);
    }

    setForm({ name: "", email: "", password: "", role: "USER" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div id="userManagement">
      <h2>User Management</h2>
      <Link to="/Dashboard">Go to DashBoard</Link>
      <br />
      <br />
      <form id="userForm" onSubmit={handleSubmit}>
        <label htmlFor="Name">Name : </label>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          id="Name"
        />
        <br />
        <br />
        <label htmlFor="Email">Email : </label>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          id="Email"
          disabled={editingId}
        />
        <br />
        <br />
        <label htmlFor="Password">Password : </label>
        {!editingId && (
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            id="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        )}
        <br />
        <br />
        <label htmlFor="Role">Role : </label>
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <br />
        <button>{editingId ? "Update User" : "Create User"}</button>
      </form>

      <hr />

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} &ndash; {u.email} &ndash; {u.role} &ndash; {u.status}{" "}
            &ndash; {new Date(u.createdAt).toLocaleString()} &ndash;{" "}
            {new Date(u.updatedAt).toLocaleString()}
            <br />
            <br />
            <button className="size" onClick={() => handleEdit(u)}>
              Edit
            </button>
            <button
              className="Btn1 size btnsize"
              onClick={() => handleDelete(u._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
