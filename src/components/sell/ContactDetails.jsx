import React from "react";
import { toast } from "react-toastify";

function ContactDetails({
  vehicleDetails,
  setVehicleDetails,
  setStep,
  startsell,
  showstep,
}) {
  const url = `${import.meta.env.VITE_API_URL}/bike/add`;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    vehicleDetails.Email || "",
  );
  const isFormValid =
    vehicleDetails.Name && vehicleDetails.Phone?.length === 10 && isEmailValid;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setVehicleDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function submitDetails() {
    let vdata = new FormData();
    vdata.append("brand", vehicleDetails.brand);
    vdata.append("type", vehicleDetails.type);
    vdata.append("model", vehicleDetails.model);
    vdata.append("modelYear", vehicleDetails.year);
    vdata.append("color", vehicleDetails.color);
    vdata.append("purchaseDate", vehicleDetails.purchasedDate);
    vdata.append("PurchasedAmount", vehicleDetails.purchasedAmount);
    vdata.append("ownerType", vehicleDetails.ownerType);
    vdata.append("inspectionDate", vehicleDetails.inspectionDate);
    vdata.append("inspectionBranch", vehicleDetails.inspectionBranch);
    vdata.append("customerName", vehicleDetails.Name);
    vdata.append("customerPhone", vehicleDetails.Phone);
    vdata.append("customerEmail", vehicleDetails.Email);
    vdata.append("registrationNumber", vehicleDetails.registrationNumber);
    vdata.append("branchId",vehicleDetails.inspectionBranchId);

    Object.values(vehicleDetails.images).forEach((img) => {
      if (img) {
        vdata.append("images", img);
      }
    });

    fetch(url, {
      method: "POST",
      body: vdata,
    })
      .then((res) => {
        if (!res.ok) {
        toast.error("try again");
          return;
        }
        toast.success("vehicle added");
        setStep(0);
        startsell(true);
        showstep(false);
      })
      .catch((err) => {
       console.log(err);
        toast.error("try again");
      });

    console.log(vehicleDetails);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitDetails();
      }}
      id="step-10"
      className="px-5 sm:px-10 py-8"
    >
      <p className="text-2xl sm:text-3xl font-bold pb-8 text-center sm:text-left">
        Contact <span className="text-secondary">Information</span>
      </p>

      <div className="max-w-lg mx-auto">
        {/* Name */}
        <label className="block text-gray-700 font-medium mb-2">
          Full Name
        </label>

        <input
          type="text"
          name="Name"
          value={vehicleDetails.Name || ""}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl mb-5 focus:outline-none focus:border-secondary"
        />

        {/* Phone */}
        <label className="block text-gray-700 font-medium mb-2">
          Mobile Number
        </label>

        <input
          type="tel"
          name="Phone"
          value={vehicleDetails.Phone || ""}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            handleChange({
              target: { name: "Phone", value },
            });
          }}
          placeholder="Enter your 10 digit mobile number"
          maxLength="10"
          className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl mb-5 focus:outline-none focus:border-secondary"
        />

        {/* Email */}
        <label className="block text-gray-700 font-medium mb-2">
          Email Address
        </label>

        <input
          type="email"
          name="Email"
          value={vehicleDetails.Email || ""}
          onChange={handleChange}
          placeholder="Enter your email address"
          className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl mb-6 focus:outline-none focus:border-secondary"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl font-bold text-lg transition
        ${
          isFormValid
            ? "bg-secondary text-white hover:opacity-90"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        >
          Submit Vehicle Details
        </button>
      </div>
    </form>
  );
}
export default ContactDetails;
