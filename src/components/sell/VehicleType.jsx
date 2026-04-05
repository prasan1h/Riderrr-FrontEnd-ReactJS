import React from "react";

function VehicleType({ vehicleDetails, setStep, setVehicleDetails, data }) {

  // Get types for selected brand
  const brandTypes = data?.[vehicleDetails.brand] || {};

  // Extract types that have models
  const types = Object.entries(brandTypes)
    .filter(([type, models]) => models && models.length > 0)
    .map(([type]) => type);

  function handleTypeClick(type) {
    setVehicleDetails({
      ...vehicleDetails,
      type: type
    });

    setStep(3);
  }

  return (
    <div id="step-2" className="px-5 py-10">

      {/* Heading */}
      <p className="text-3xl font-bold pb-8">
        Select the <span className="text-secondary">Type</span> of your two-wheeler
      </p>

      {/* Type Cards */}
      <div className="flex gap-6 flex-wrap">

        {types.map((type) => {

          const selected = vehicleDetails.type === type;

          return (
            <div
              key={type}
              onClick={() => handleTypeClick(type)}
              className={`flex flex-col items-center justify-center w-52 py-10 rounded-2xl cursor-pointer transition-all border-2
              
              ${
                selected
                  ? "border-secondary bg-secondary text-white shadow-md scale-105"
                  : "border-gray-300 hover:border-secondary hover:bg-gray-100"
              }
              
              `}
            >

              {/* Icon Box */}
              <div className="bg-gray-100 rounded-xl p-4 mb-4">
                <i className="h-10 w-10 text-gray-500"></i>
              </div>

              {/* Type Name */}
              <p
                className={`text-xl font-semibold ${
                  selected ? "text-white" : "text-gray-700"
                }`}
              >
                {type}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default VehicleType;