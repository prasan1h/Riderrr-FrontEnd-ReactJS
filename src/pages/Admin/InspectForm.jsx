import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const InspectForm = () => {
  const { id } = useParams();

  const [inspectData, setInspectData] = useState([]);
  const [formData, setFormData] = useState({
    photos: [],
    outLetPrice: "",
    mileage: "",
    visibility: "Not Visible",
  });
  const url = `${import.meta.env.VITE_API_URL}`;

  const fetchInspectionDetails = () => {
    fetch(`${url}/api/inspection/report/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInspectData(data);
      })
      .catch((e) => console.log(e));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedPhotos = [...formData.photos, ...files];

    if (updatedPhotos?.length > 5) {
      alert("Maximum 5 photos allowed");
      return;
    }

    setFormData({ ...formData, photos: updatedPhotos });
  };

  const removePhoto = (index) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: updatedPhotos });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    let data = new FormData();
    data.append("id", id);
    data.append("outLetPrice", formData.outLetPrice);
    data.append("isVisible", formData.visibility);
    data.append("Mileage", formData.mileage);
    formData.photos.forEach((photo) => {
      data.append("images", photo);
    });

    fetch(`${url}/bike/manager/updates`, {
      method: "PUT",
      body: data,
    })
    .then((res) => {
      if (!res.ok) {
        alert("Failed!!! to update");
        return;
      }
      alert("updated successfully");
      console.log(formData);
      window.location.href = "/admin/inspection";
    })
    .catch((err) => console.log(err));

  };

  useEffect(() => {
    console.log(id);
    fetchInspectionDetails();
  }, []);

  // Inspection report field pairs
  const inspectionFields = [
    {
      label: "vehicle AirFilter Condition",
      key: "AirFilter",
      label2: "vehicle Body Condition",
      key2: "Body",
    },
    {
      label: "vehicle Battery Condition",
      key: "Battery",
      label2: "vehicle Brake Condition",
      key2: "Brake",
    },
    {
      label: "vehicle Tyre Condition",
      key: "Tyre",
      label2: "vehicle Damage Condition",
      key2: "Damage",
    },
    {
      label: "vehicle Engine Condition",
      key: "Engine",
      label2: "vehicle Exhaust Condition",
      key2: "Exhaust",
    },
    {
      label: "vehicle Seat Condition",
      key: "Seat",
      label2: "vehicle Gear Condition",
      key2: "Gear",
    },
    {
      label: "vehicle Paint Condition",
      key: "Body",
      label2: "vehicle Handle Condition",
      key2: "Handles",
    },
    {
      label: "vehicle Light Condition",
      key: "Light",
      label2: "vehicle MeterBoard Condition",
      key2: "MeterBoard",
    },
    {
      label: "vehicle Modification Condition",
      key: "Modification",
      label2: "vehicle Seat Condition",
      key2: "Seat",
    },
    {
      label: "vehicle ShockAbsorber Condition",
      key: "ShockAbsorber",
      label2: "vehicle Wheel Condition",
      key2: "Wheel",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-5">
        {/* Back Link */}
        <div>
          <Link
            to="/admin/inspection"
            className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800 transition-colors"
          >
            ← Back to Vehicles
          </Link>
        </div>

        {/* Vehicle Header Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {/* Header Bar */}
          <div className="bg-indigo-600 px-5 py-4 flex items-center justify-between">
            <h1 className="text-white text-xl font-bold">
              {inspectData?.vehicleId?.Brand}{" "}
              {inspectData?.vehicleId?.Model || "TVS Jupiter"}
            </h1>
            <span className="bg-indigo-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {inspectData?.vehicleId?.RegisterNumber || "KA 03 AC 4321"}
            </span>
          </div>

          {/* Customer Info Row */}
          <div className="px-5 py-5 grid grid-cols-3 gap-4">
            {/* Customer */}
            <div className="flex items-start gap-2">
              <div className="mt-0.5 text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Customer
                </p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">
                  {inspectData?.vehicleId?.customerName || "xyz"}
                </p>
                <p className="text-sm text-gray-600">
                  {inspectData?.vehicleId?.customerPhNo || "8787879990"}
                </p>
              </div>
            </div>

            {/* Scheduled */}
            <div className="flex items-start gap-2">
              <div className="mt-0.5 text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Scheduled
                </p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">
                  {inspectData?.vehicleId?.InspectionDate || "Mar 26, 2026"}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2">
              <div className="mt-0.5 text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Location
                </p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">
                  {inspectData?.vehicleId?.branchId || "bengaluru"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inspection Report Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          {/* Section Title */}
          <div className="flex items-center gap-2 mb-5">
            <div className="text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-gray-800">
              Vehicle Inspection Report
            </h2>
          </div>

          {/* Inspection Fields Grid */}
          <div className="flex flex-col gap-4">
            {inspectionFields.map((field, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-4">
                {/* Left field */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    {field.label}
                  </label>
                  <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 min-h-[36px]">
                    {inspectData[field.key] || ""}
                  </div>
                </div>
                {/* Right field */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    {field.label2}
                  </label>
                  <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 min-h-[36px]">
                    {inspectData[field.key2] || ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Data To Update Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          {/* Section Title */}
          <div className="flex items-center gap-2 mb-5">
            <div className="text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-gray-800">
              Vehicle Data To Update
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {/* Row 1: Outlet Price + Mileage */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Vehicle Outlet Price
                </label>
                <input
                  type="text"
                  name="outLetPrice"
                  placeholder="Enter outlet price"
                  value={formData.outLetPrice}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Vehicle Mileage
                </label>
                <input
                  type="text"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Row 2: Visibility + Images */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Website Visibility
                </label>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                >
                  <option value="false">Not Visible</option>
                  <option value="true">Visible</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Images
                </label>
                <label className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                  <span className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-1 rounded-md cursor-pointer transition-colors">
                    Choose Files
                  </span>
                  <span className="text-sm text-gray-400">
                    {formData.photos.length === 0
                      ? "No file chosen"
                      : `${formData.photos.length} file(s) selected`}
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={formData.photos?.length >= 5}
                  />
                </label>
              </div>
            </div>

            {/* Photo Previews */}
            {formData.photos.length > 0 && (
              <div className="grid grid-cols-5 gap-3 mt-1">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="vehicle"
                      className="w-full h-20 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="button"
            onClick={() => {handleSubmit()}}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm tracking-wide shadow-sm"
          >
            Submit Inspection
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspectForm;
