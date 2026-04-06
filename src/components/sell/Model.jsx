import React from "react";

function Model({ vehicleDetails, setVehicleDetails, setStep, data }) {

  // Get models safely
  const models = data?.[vehicleDetails.brand]?.[vehicleDetails.type] || [];

  function handleModelClick(model) {
    setVehicleDetails({
      ...vehicleDetails,
      model: model
    });

    setStep(4);
  }

  return (
    <div className="px-20 py-10 border-2">

      {/* Heading */}
      <p className="text-3xl font-bold pb-10">
        Select the <span className="text-secondary">Model</span> of your two-wheeler
      </p>

      {/* Model Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {models.map((model) => {

          const selected = vehicleDetails.model === model;

          return (
            <div
              key={model}
              onClick={() => handleModelClick(model)}
              className={`border rounded-xl p-6 text-center cursor-pointer transition duration-200
              
              ${
                selected
                  ? "border-secondary bg-secondary text-white shadow-md scale-105"
                  : "border-gray-300 hover:bg-gray-100 hover:shadow-md"
              }
              
              `}
            >
              <p
                className={`text-lg font-semibold ${
                  selected ? "text-white" : "text-gray-700"
                }`}
              >
                {model}
              </p>
            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Model;