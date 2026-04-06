import React from "react";

function Owner({ vehicleDetails, setVehicleDetails, setStep }) {
  const owners = [
    { label: "1st Owner", short: "1st" },
    { label: "2nd Owner", short: "2nd" },
    { label: "3rd Owner", short: "3rd" },
    { label: "4+ Owner", short: "4+" },
  ];

  function handleOwnerClick(owner) {
    setVehicleDetails((prev) => ({
      ...prev,
      ownerType: owner,
    }));

    setStep(8);
  }

  return (
    <>
      {/* STEP 7: OWNER */}
      <div id="step-7">
        <p className="text-3xl font-bold pb-8">
          Select <span className="text-secondary">Owner</span> type
        </p>

        <div id="ownerContainer" className="flex gap-4">
          {owners.map((owner) => (
            <div
              key={owner.label}
              onClick={() => handleOwnerClick(owner.label)}
              className={`flex flex-col items-center justify-center w-1/4 border-2 py-8 rounded-2xl cursor-pointer transition-all
                ${
                  vehicleDetails.ownerType === owner.label
                    ? "border-secondary bg-secondary text-white shadow-md scale-105"
                  : "border-gray-300 hover:bg-gray-100 hover:shadow-md"
                }`}
            >
              <span className="bg-blue-100 text-secondary font-bold px-4 py-2 rounded-lg mb-4 text-lg">
                {owner.short}
              </span>

              <p className="text-lg font-medium">{owner.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Owner;
