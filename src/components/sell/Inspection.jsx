import React from 'react'
import { useState } from 'react';

function Inspection({setVehicleDetails, setStep}) {

    const [inspectionDate, setInspectionDate] = useState("");
    const [inspectionBranch, setInspectionBranch] =useState("");

      function saveInspectionDetails() {
            setVehicleDetails((vehicleDetails) => ({
                 ...vehicleDetails,
                 inspectionDate: inspectionDate,
                 inspectionBranch: inspectionBranch
    }));

    setStep(10);
  }

  return (
    <>
     <div id="step-9" className="">
            <p className="text-3xl font-bold pb-8">Inspection Details</p>
            <label className="block text-gray-700 font-medium mb-2">Inspection Date</label>
            <input
              id="inspectionDate"
              onChange={(e) => setInspectionDate(e.target.value)}
              type="date"
              className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl mb-6 focus:outline-none focus:border-secondary"
            />
            <label className="block text-gray-700 font-medium mb-2">Inspection Branch</label>
            <select
              onChange={(e) => setInspectionBranch(e.target.value)}
              id="inspectionBranch"
              className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl focus:outline-none focus:border-secondary"
            >
              <option value="">- select Location -</option>
              <option value="Jalhalli">Jalhalli, Bengaluru</option>
              <option value="Koramangala">Koramangala, Bengaluru</option>
              <option value="Whitefield">Whitefield, Bengaluru</option>
              <option value="Jayanagar">Jayanagar, Bengaluru</option>
            </select>
            <button onClick={saveInspectionDetails} className="mt-8 w-full bg-secondary text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition-all" disabled={!inspectionDate || !inspectionBranch}>
              Continue
            </button>
          </div>
    </>
  )
}

export default Inspection
