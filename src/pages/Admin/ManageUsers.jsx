import React, { useEffect, useState } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaUser, FaBars } from "react-icons/fa";
import AdminNav from "../../components/Admin/AdminNav";
import { toast } from "react-toastify";


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const url = `${import.meta.env.VITE_API_URL}/user`;

  // Fetch users
  const fetchUsers = () => {
    fetch(`${url}/branch/2`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchUsers();
  }, [deleted]);

  // Delete user
  function deleteUser(id) {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  fetch(`${url}/delete/${id}`, { method: "DELETE" })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete user");
      return res.text();
    })
    .then(() => {
      toast.success("User deleted successfully");
      setDeleted(id);
    })
    .catch((e) => {
      toast.error(e.message);
    });
}

  // Open Add Modal
  function openAddModal() {
    setMode("add");

    setFormData({
      id: "",
      name: "",
      email: "",
      phone: "",
      role: "",
      password: "",
    });

    setIsModalOpen(true);
  }

  // Open Edit Modal
  function editUser(user) {
    setMode("edit");

    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      password: "",
    });

    setIsModalOpen(true);
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit (Add + Update)
  function handleSubmit() {
    const endpoint =
      mode === "add" ? `${url}/add` : `${url}/update/${formData.id}`;

    const method = mode === "add" ? "POST" : "PUT";

    fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {if (!res.ok) {
        const text = res.text();
        throw new Error(text || "Request failed");
      }
      return res.json();
    })
      .then(() => {
        toast.success(
        mode === "add"
          ? "Employee added successfully"
          : "Employee updated successfully"
      );

      setIsModalOpen(false);
      fetchUsers();
      })
      .catch((e) => {
      toast.error(e.message || "Something went wrong");
    });
  }

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-[#e6ded3] border-b">
        <h1 className="text-lg font-bold text-orange-600">Riderr</h1>

        <button onClick={() => setIsOpen(!isOpen)}>
          <FaBars size={22} />
        </button>
      </div>

      <AdminNav isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="p-4 sm:p-6 bg-gray-100 min-h-screen flex-1 md:ml-64 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-orange-500 flex items-center gap-2">
            <FaUser /> Manage Users
          </h1>

          <button
            onClick={openAddModal}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 w-full sm:w-auto"
          >
            <FaUserPlus /> Add Employee
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-left min-w-150">
            <thead className="bg-orange-100">
              <tr>
                <th className="p-4">Id</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phone}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        user.role === "MANAGER"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4 flex gap-4 flex-wrap">
                    <button
                      onClick={() => editUser(user)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl w-[90%] sm:w-96 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-orange-500 text-xl font-semibold">
                {mode === "add" ? "Add Employee" : "Edit Employee"}
              </h2>

              <button onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-3"
              />

              <label className="block mb-1">Contact Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                maxLength={10}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-3"
              />

              <label className="block mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-3"
              >
                <option value="">Select Role</option>
                <option value="STAFF">STAFF</option>
                <option value="MANAGER">MANAGER</option>
              </select>

              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                className="w-full border p-2 rounded mb-3"
              />

              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-4"
              />

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
              >
                {mode === "add" ? "Add Employee" : "Update Employee"}
              </button>
            </form>
          </div>
        </div>
      )}
      
    </>
  );
};

export default ManageUsers;
