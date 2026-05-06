import { useState } from "react";
import { data, useParams, Link } from "react-router";

const fields = [
  { id: "AirFilter", label: "vehicle AirFilter Condition" },
  { id: "Body", label: "vehicle Body Condition" },
  { id: "Battery", label: "vehicle Battery Condition" },
  { id: "Brake", label: "vehicle Brake Condition" },
  { id: "Tyre", label: "vehicle Tyre Condition" },
  { id: "Damage", label: "vehicle Damage Condition" },
  { id: "Engine", label: "vehicle Engine Condition" },
  { id: "Exhaust", label: "vehicle Exhaust Condition" },
  { id: "Seat", label: "vehicle Seat Condition" },
  { id: "Gear", label: "vehicle Gear Condition" },
  { id: "Handles", label: "vehicle Handle Condition" },
  { id: "Light", label: "vehicle Light Condition" },
  { id: "MeterBoard", label: "vehicle MeterBoard Condition" },
  {
    id: "Modification",
    label: "vehicle Modification Condition",
    isModification: true,
  },
  { id: "ShockAbsorber", label: "vehicle ShockAbsorber Condition" },
  { id: "Wheel", label: "vehicle Wheel Condition" },
];

const DropdownField = ({ label, value, onChange, isModification }) => {
  const options = isModification ? ["YES", "NO"] : ["OK", "NOT OK"];

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500 tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer"
        >
          <option value="" disabled>
            Select
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const InspectVehicle = () => {
  const initialState = fields.reduce((acc, f) => {
    acc[f.id] = "";
    return acc;
  }, {});

  const url = `${import.meta.env.VITE_API_URL}`;
  const { id } = useParams();

  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (id, val) => {
    setFormData((prev) => ({ ...prev, [id]: val }));
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEmpty = Object.values(formData).some((v) => v === "");
    if (hasEmpty) {
      setError("Please select a value for all fields before submitting.");
      return;
    }

    fetch(`${url}/api/inspection/submit?vehicleId=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (!res.ok) {
        alert("failed");
        return;
      }
      res.json();
    });

    console.log("Inspection Data:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleReset = () => {
    setFormData(initialState);
    setSubmitted(false);
    setError("");
  };

  const leftFields = fields.filter((_, i) => i % 2 === 0);
  const rightFields = fields.filter((_, i) => i % 2 === 1);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className=" bg-[#f6f3f1] flex items-center justify-center">
          <div className="bg-transparent rounded-2xl w-full max-w-6xl p-1 pb-4">
            <Link
              to={`/InspectVehicle`}
              className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800 transition-colors"
            >
              ← Back
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏍️</span>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Vehicle Inspection Report
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Fill in all condition fields below
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <div className="flex flex-col gap-5">
                {leftFields.map((f) => (
                  <DropdownField
                    key={f.id}
                    label={f.label}
                    value={formData[f.id]}
                    onChange={(val) => handleChange(f.id, val)}
                    isModification={f.isModification}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-5">
                {rightFields.map((f) => (
                  <DropdownField
                    key={f.id}
                    label={f.label}
                    value={formData[f.id]}
                    onChange={(val) => handleChange(f.id, val)}
                    isModification={f.isModification}
                  />
                ))}
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>
            )}

            <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl py-3 text-sm transition-colors duration-150 shadow-sm"
              >
                {submitted ? "✓ Submitted!" : "Submit Report"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-xl py-3 text-sm transition-colors duration-150"
              >
                Reset
              </button>
            </div>
            {submitted && (
              <p className="mt-3 text-center text-sm text-green-600 font-medium">
                ✅ Inspection report submitted successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InspectVehicle;
