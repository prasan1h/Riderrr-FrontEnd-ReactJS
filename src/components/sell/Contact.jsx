import React from "react";
import { useState } from "react";

function Contact({ setVehicleDetails, setStep, startsell, showstep }) {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");

  function submitDetails() {
    setVehicleDetails((vehicleDetails) => ({
      ...vehicleDetails,
      Name: Name,
      Phone: Phone,
      Email: Email,
    }
    ));
    
    alert("Vehicle details submitted successfully!");
    setStep(0);
    startsell(true);
    showstep(false);

  }

  return (
    <>
      <div id="step-10" className="">
        <p className="text-3xl font-bold pb-8">
          Contact <span className="text-secondary">Information</span>
        </p>
        <div className="max-w-lg mx-auto">
          <label className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input
            id="contactName"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl mb-5 focus:outline-none focus:border-secondary"
            required
          />
          <label className="block text-gray-700 font-medium mb-2">
            Mobile Number
          </label>
          <input
            id="contactPhone"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your 10 digit mobile number"
            maxLength="10"
            className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl mb-5 focus:outline-none focus:border-secondary"
            required
          />
          <label className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            id="contactEmail"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            type="email"
            className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl mb-6 focus:outline-none focus:border-secondary"
            required
          />
          <button
            onClick={submitDetails}
            className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all"
            disabled={!Name || !Phone || !Email}
          >
            Submit Vehicle Details
          </button>
        </div>
      </div>
    </>
  );
}

export default Contact;
