import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    const res = await axios.get(`http://localhost:5000/api/users?search=${search}`);
    setUsers(res.data);
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/users/${editId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/users", form);
      }
      setForm({ name: "", email: "", phone: "" });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user._id);
  };

  const lastIndex = page * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const paginatedUsers = users.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <input
        className="border rounded px-3 py-2 mb-4 w-full"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-col gap-2 mb-4">
        <input
          className="border rounded px-3 py-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border rounded px-3 py-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border rounded px-3 py-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Phone</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((u) => (
            <tr key={u._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.phone}</td>
              <td className="border px-4 py-2">
                <button className="text-blue-500 mr-2" onClick={() => handleEdit(u)}>
                  Edit
                </button>
                <button className="text-red-500" onClick={() => handleDelete(u._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
