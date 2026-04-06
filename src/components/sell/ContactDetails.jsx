import React from "react";

function ContactDetails({
  vehicleDetails,
  setVehicleDetails,
  setStep,
  startsell,
  showstep}
) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setVehicleDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function submitDetails() {
    alert("Vehicle details submitted successfully!");

    setStep(0);
    startsell(true);
    showstep(false);
  }

  return (
    <>
      <div id="step-10">
        <p className="text-3xl font-bold pb-8">
          Contact <span className="text-secondary">Information</span>
        </p>

        <div className="max-w-lg mx-auto">
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

          <label className="block text-gray-700 font-medium mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            name="Phone"
            value={vehicleDetails.Phone || ""}
            onChange={handleChange}
            placeholder="Enter your 10 digit mobile number"
            maxLength="10"
            className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl mb-5 focus:outline-none focus:border-secondary"
          />

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
          />

          <button
            onClick={submitDetails}
            disabled={
              !vehicleDetails.Name ||
              !vehicleDetails.Phone ||
              !vehicleDetails.Email
            }
            className={`w-full py-4 rounded-xl font-bold text-lg transition
            ${
              vehicleDetails.Name &&
              vehicleDetails.Phone &&
              vehicleDetails.Email
                ? "bg-secondary text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit Vehicle Details
          </button>
        </div>
      </div>
    </>
  );
}

export default ContactDetails;
