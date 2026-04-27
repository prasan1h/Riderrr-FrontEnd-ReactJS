import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

function BranchForm({ isOpen, onClose, onSuccess, mode, data }) {
  const url = `${import.meta.env.VITE_API_URL}/branch`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    location: "",
    phone: "",
    address: "",
  });

  // editing
  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData({
        id: data.id,
        name: data.name || "",
        email: data.email || "",
        city: data.city || "",
        location: data.location || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    }
  }, [mode, data]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //add branch
  function handleSubmit(e) {
    e.preventDefault();
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
      .then((res) => {
        if (!res.ok) {
          const text = res.text();
          throw new Error(text || "Request failed");
        }
        return res.json();
      })
      .then(() => {
        toast.success(
          mode === "add" ? (
            <span className="text-green-600 font-semibold">
              Branch added successfully
            </span>
          ) : (
            <span className="text-green-600 font-semibold">
              Branch updated successfully
            </span>
          ),
        );
        onSuccess();
        onClose();
      })
      .catch((e) => {
        toast.error(e.message || "Something went wrong");
      });
  }

  useEffect(() => {
    if (isOpen && mode === "add") {
      setFormData({
        name: "",
        email: "",
        city: "",
        location: "",
        phone: "",
        address: "",
      });
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        {/*  Box */}
        <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {mode === "add" ? "Add Branch" : "Edit Branch"}
            </h2>
            <button onClick={onClose}>
              <FiX size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="name">Branch Name</label>
            <input
              type="text"
              name="name"
              placeholder="Branch Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg"
            />

            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg"
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg"
            />

            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg"
            />

            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              maxLength={10}
              placeholder="Enter Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg"
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
              >
                {mode === "add" ? "Add Branch" : "Update Branch"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BranchForm;
