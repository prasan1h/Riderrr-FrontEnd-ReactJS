import React from 'react'

function Owner({ setVehicleDetails, setStep }) {

    function handleownerClick(owner) {
    setVehicleDetails((vehicleDetails) => ({
      ...vehicleDetails,
      ownerType:owner
    }));

    setStep(8);
  }

  return (
    <>
    {/* <!--STEP 7: OWNER--> */}
          <div id="step-7" className="" >
            <p className="text-3xl font-bold pb-8">
              Select <span className="text-secondary">Owner</span> type
            </p>
            <div id="ownerContainer" className="flex gap-4" >
              <div className="option flex flex-col items-center justify-center w-1/4 border-2 border-gray-200 py-8 rounded-2xl cursor-pointer hover:border-secondary transition-all" onClick={() => handleownerClick("1st Owner")}>
                <span className="bg-blue-100 text-secondary font-bold px-4 py-2 rounded-lg mb-4 text-lg">1st</span>
                <p className="text-lg font-medium">1st Owner</p>
              </div>
              <div className="option flex flex-col items-center justify-center w-1/4 border-2 border-gray-200 py-8 rounded-2xl cursor-pointer hover:border-secondary transition-all" onClick={() => handleownerClick("2nd Owner")}>
                <span className="bg-blue-100 text-secondary font-bold px-4 py-2 rounded-lg mb-4 text-lg">2nd</span>
                <p className="text-lg font-medium">2nd Owner</p>
              </div>
              <div className="option flex flex-col items-center justify-center w-1/4 border-2 border-gray-200 py-8 rounded-2xl cursor-pointer hover:border-secondary transition-all" onClick={() => handleownerClick("3rd Owner")}>
                <span className="bg-blue-100 text-secondary font-bold px-4 py-2 rounded-lg mb-4 text-lg">3rd</span>
                <p className="text-lg font-medium">3rd Owner</p>
              </div>
              <div className="option flex flex-col items-center justify-center w-1/4 border-2 border-gray-200 py-8 rounded-2xl cursor-pointer hover:border-secondary transition-all" onClick={() => handleownerClick("4+ Owner")}>
                <span className="bg-blue-100 text-secondary font-bold px-4 py-2 rounded-lg mb-4 text-lg">4+</span>
                <p className="text-lg font-medium">4+ Owner</p>
              </div>
            </div>
          </div>
    </>
  )
}

export default Owner
