import React from 'react'

function StepCounter() {
  return (
   <>
   <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-2">
          <p className="text-sm text-gray-500 font-medium"><span id="stepNumber">1</span>/10</p>
        </div>

        {/* <!-- STEP BUTTONS CARD --> */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <div className="flex items-start gap-2 flex-wrap">
            <button id="backBtn" className="hidden text-gray-500 hover:text-gray-800 mr-2 mt-1 text-xl font-bold">←</button>
            <button className="step-btn text-sm font-semibold rounded-full px-4 py-2 border transition-all">Brand</button>
            <button className="step-btn text-sm font-semibold rounded-full px-4 py-2 border transition-all">Vehicle Type</button>
            <button className="step-btn text-sm font-semibold rounded-full px-4 py-2 border transition-all">Model</button>
            <button className="step-btn text-sm font-semibold rounded-full px-4 py-2 border transition-all">Model Year</button>
            <button className="step-btn text-sm font-semibold rounded-full px-4 py-2 border transition-all">Colour</button>
            <button className="step-btn text-sm font-semibold rounded-full px-4 py-2 border transition-all">Purchase Details</button>
            <button className="step-btn text-sm font-semibold rounded-full px-4 py-2 border transition-all">Owner</button>
            <button className="step-btn text-sm font-semibold rounded-full px-4 py-2 border transition-all">Photos &amp; Registration</button>
            <button className="step-btn text-sm font-semibold rounded-full px-4 py-2 border transition-all ml-8">Inspection</button>
            <button className="step-btn text-sm font-semibold rounded-full px-4 py-2 border transition-all">Contact</button>
          </div>
        </div>
    </div>
   </>
  )
}

export default StepCounter
