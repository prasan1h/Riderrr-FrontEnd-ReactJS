import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-orange-500 flex items-center gap-2">
          <span>👤</span> Manage Users
        </h1>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600">
          <FaUserPlus /> Add Employees
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">

          {/* Table Header */}
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

          {/* Table Body */}
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">

                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.fullName}</td>
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

                <td className="p-4 flex gap-4">
                  <button className="text-blue-500 hover:text-blue-700">
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
  );
};

export default ManageUsers;