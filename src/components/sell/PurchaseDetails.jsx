import React from 'react'
import { useState } from 'react';
function PurchaseDetails({ setVehicleDetails, setStep}) {
    const [purchaseDate, setPurchaseDate] = useState("");
    const [purchaseAmount, setPurchaseAmount] = useState("");

    function savePurchaseDetails(){
        setVehicleDetails((vehicleDetails) => ({
            ...vehicleDetails,
            purchaseDate: purchaseDate,
            purchaseAmount: purchaseAmount
        }))
        setStep(7);
    }

  return (
    <>
     {/* <!--STEP 6: PURCHASE DETAILS--> */}
          <div id="step-6" className="">
            <p className="text-3xl font-bold pb-8">Enter Purchase Details</p>
            <label className="block text-gray-700 font-medium mb-2">Purchase Date:</label>
            <input
              id="purchaseDate"
              type="date"
              onChange={(e)=> setPurchaseDate(e.target.value)}
              className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl mb-6 focus:outline-none focus:border-secondary" required
            />
            <label className="block text-gray-700 font-medium mb-2">Purchase Amount (₹):</label>
            <input
              id="purchaseAmount"
              type="number"
              onChange={(e) => setPurchaseAmount(e.target.value)}
              className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl focus:outline-none focus:border-secondary" required
            />
            <button id="purchaseBtn" onClick={ savePurchaseDetails} className="mt-8 w-full bg-secondary text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition-all" disabled={!purchaseDate || !purchaseAmount}>
              Continue
            </button>
          </div>
    </>
  )
}

export default PurchaseDetails
