import React from "react";
import { useState } from "react";

function Addvehicle({ data = {} }) {
  const brands = Object.keys(data);
   const url = "http://localhost:8080/api/bike/add";


  const colors = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Gray",
    "Silver",
    "Orange",
    "Purple",
    "Brown",
    "Gold",
  ];
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let y = currentYear; y >= 2006; y--) {
    years.push(y);
  }

  const [formData, setFormData] = useState({
    brand: "",
    type: "",
    model: "",
    year: "",
    color: "",
    purchaseDate: "",
    purchasedAmount: "",
    ownerType: "",
    registrationNumber: "",
    inspectionDate: "",
    inspectionBranch: "",
    customerName: "",
    mobile: "",
    email: "",
    photos: [],
  });


  function handleSubmit(e) {
  e.preventDefault();

  let vdata = new FormData();

  vdata.append("brand", formData.brand);
  vdata.append("type", formData.type);
  vdata.append("model", formData.model);
  vdata.append("modelYear", formData.year);
  vdata.append("color", formData.color);
  vdata.append("purchaseDate", formData.purchaseDate);
  vdata.append("PurchasedAmount", formData.purchasedAmount);
  vdata.append("ownerType", formData.ownerType);
  vdata.append("registrationNumber", formData.registrationNumber);
  vdata.append("inspectionDate", formData.inspectionDate);
  vdata.append("inspectionBranch", formData.inspectionBranch);

  vdata.append("customerName", formData.customerName);
  vdata.append("customerPhone", formData.mobile);
  vdata.append("customerEmail", formData.email);

  formData.photos.forEach((photo) => {
    vdata.append("images", photo);
  });

  fetch(url, {
    method: "POST",
    body: vdata,
  })
    .then((res) => {
      if (!res.ok) {
        alert("Try again");
        return;
      }
      alert("Vehicle added successfully");
    })
    .catch((err) => console.log(err));
}

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      alert("Maximum 5 photos allowed");
      return;
    }

    setFormData({
      ...formData,
      photos: files,
    });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

  return (
    <>
      <div className="max-w-5xl mx-auto bg-gray-100 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-8">
          Vehicle Information Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Information */}

          <div>
            <label className="block font-medium mb-1">Brand</label>

            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">-- Select Brand --</option>

              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}

              <option value="Other">Other</option>
            </select>

            {formData.brand === "Other" && (
              <input
                type="text"
                name="brand"
                placeholder="Enter Brand Name"
                className="w-full border rounded-lg p-2 mt-2"
                onChange={handleChange}
              />
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Type</label>
            <select
              name="type"
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option>-- Select Type --</option>
              <option>Bike</option>
              <option>Scooty</option>
              <option>Electric</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Model</label>
            <input
              type="text"
              name="model"
              placeholder="e.g. Pulsar 150"
              className="w-full border rounded-lg p-2"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Model Year</label>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">-- Select Year --</option>

              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">color</label>

            <select
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">-- Select color --</option>

              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          {/* Purchase Details */}

          <h3 className="text-lg font-semibold pt-6">Purchase Details</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Purchase Date</label>
              <input
                type="date"
                name="purchaseDate"
                className="w-full border rounded-lg p-2"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Purchase Amount (₹)
              </label>
              <input
                type="number"
                name="purchasedAmount"
                placeholder="e.g. 60000"
                className="w-full border rounded-lg p-2"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Owner Type</label>
            <select
              name="ownerType"
              className="w-full border rounded-lg p-2"
              onChange={handleChange}
            >
              <option>-- Select Owner Type --</option>
              <option>1st Owner</option>
              <option>2nd Owner</option>
              <option>3rd Owner</option>
              <option value="">4+ Owner</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Vehicle Registration Number
            </label>
            <input
              type="text"
              name="registrationNumber"
              placeholder="e.g. KA 01 AB 1234"
              className="w-full border rounded-lg p-2"
              onChange={handleChange}
            />
          </div>

          {/* Upload Photos */}

          <div>
            <label className="block font-medium mb-1">
              Upload Vehicle Photos (Max 5)
            </label>
            <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer inline-block">
              Choose Files
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-sm mt-2 text-gray-600">
              {formData.photos.length} files selected
            </p>
          </div>

          {/* Inspection Details */}

          <h3 className="text-lg font-semibold pt-6">Inspection Details</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Inspection Date</label>
              <input
                type="date"
                name="inspectionDate"
                className="w-full border rounded-lg p-2"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Inspection Branch
              </label>
              <select
                name="inspectionBranch"
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option>Jalahalli</option>
                <option>City Center</option>
                <option>Main Branch</option>
              </select>
            </div>
          </div>

          {/* Contact Info */}

          <h3 className="text-lg font-semibold pt-6">Contact Information</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              name="customerName"
              placeholder="Full Name"
              className="border rounded-lg p-2"
              onChange={handleChange}
            />

            <input
              type="text"
              name="mobile"
              maxLength={10}
              placeholder="Mobile Number"
              className="border rounded-lg p-2"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="border rounded-lg p-2"
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}

          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg"
            >
              Submit Vehicle Details
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addvehicle;
