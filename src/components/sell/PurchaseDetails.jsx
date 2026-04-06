import React from "react";

function PurchaseDetails({ vehicleDetails, setVehicleDetails, setStep }) {

  function handleChange(e) {
    const { name, value } = e.target;

    setVehicleDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function savePurchaseDetails() {
    setStep(7);
  }

  return (
    <>
      {/* STEP 6: PURCHASE DETAILS */}
      <div id="step-6">
        <p className="text-3xl font-bold pb-8">Enter Purchase Details</p>

        <label className="block text-gray-700 font-medium mb-2">
          Purchase Date:
        </label>

        <input
          type="date"
          name="purchaseDate"
            max={new Date(Date.now() - 86400000).toISOString().split("T")[0]}
          value={vehicleDetails.purchaseDate || ""}
          onChange={handleChange}
          className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl mb-6 focus:outline-none focus:border-secondary"
        />

        <label className="block text-gray-700 font-medium mb-2">
          Purchase Amount (₹):
        </label>

        <input
          type="number"
          name="purchaseAmount"
          value={vehicleDetails.purchaseAmount || ""}
          onChange={handleChange}
          className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl focus:outline-none focus:border-secondary"
        />

        <button
          onClick={savePurchaseDetails}
          className="mt-8 w-full bg-secondary text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition-all"
          disabled={!vehicleDetails.purchaseDate || !vehicleDetails.purchaseAmount}
        >
          Continue
        </button>
      </div>
    </>
  );
}

export default PurchaseDetails;