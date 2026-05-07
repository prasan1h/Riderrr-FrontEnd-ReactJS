import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Inspection({ vehicleDetails, setVehicleDetails, setStep }) {
  const today = new Date().toISOString().split("T")[0];

  const [branches, setBranches] = useState([]);

  const url = `${import.meta.env.VITE_API_URL}/branch/all`;

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = () => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          toast.error("Failed to fetch branches");
          throw new Error("Failed to fetch branches");
        }

        return res.json();
      })
      .then((data) => {
       
        setBranches(data);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle branch selection
    if (name === "inspectionBranchId") {
      const selectedBranch = branches.find(
        (branch) => branch.id === Number(value)
      );

      setVehicleDetails((prev) => ({
        ...prev,
        inspectionBranchId: selectedBranch.id,
        inspectionBranch: selectedBranch.name,
      }));

      return;
    }

    // Handle other fields
    setVehicleDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !vehicleDetails.inspectionDate ||
      !vehicleDetails.inspectionBranchId
    ) {
      return;
    }

    console.log(vehicleDetails);

    setStep(10);
  }

  return (
    <form
      id="step-9"
      onSubmit={handleSubmit}
      className="px-5 sm:px-10 py-8 max-w-xl mx-auto"
    >
      <p className="text-2xl sm:text-3xl font-bold pb-8">
        Inspection Details
      </p>

      {/* Inspection Date */}
      <label className="block text-gray-700 font-medium mb-2">
        Inspection Date
      </label>

      <input
        type="date"
        name="inspectionDate"
        min={today}
        value={vehicleDetails.inspectionDate || ""}
        onChange={handleChange}
        className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl mb-6 focus:outline-none focus:border-secondary"
      />

      {/* Inspection Branch */}
      <label className="block text-gray-700 font-medium mb-2">
        Inspection Branch
      </label>

      <select
        name="inspectionBranchId"
        value={vehicleDetails.inspectionBranchId || ""}
        onChange={handleChange}
        className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl focus:outline-none focus:border-secondary"
      >
        <option value="">- Select Location -</option>

        {branches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}, {branch.city}
          </option>
        ))}
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={
          !vehicleDetails.inspectionDate ||
          !vehicleDetails.inspectionBranchId
        }
        className={`mt-8 w-full py-3 rounded-xl font-semibold text-lg transition
        ${
          vehicleDetails.inspectionDate &&
          vehicleDetails.inspectionBranchId
            ? "bg-secondary text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </form>
  );
}

export default Inspection;