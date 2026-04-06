import React from "react";

function Brand({ data, vehicleDetails, setStep, setVehicleDetails }) {
  const brands = Object.keys(data);

  const handleBrandClick = (brand) => {
    setVehicleDetails({
      ...vehicleDetails,
      brand: brand,
    });

    setStep(2);
  };

  return (
    <div className="px-5 py-10">
      {/* Heading */}
      <p className="text-3xl font-bold pb-10">
        Select the <span className="text-secondary">Brand</span> of your
        two-wheeler
      </p>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => {
          const selected = vehicleDetails.brand === brand;

          return (
            <div
              key={brand}
              onClick={() => handleBrandClick(brand)}
              className={`border rounded-xl p-6 text-center cursor-pointer transition duration-200
              
              ${
                selected
                  ? "border-secondary bg-secondary text-white shadow-md"
                  : "border-gray-300 hover:bg-gray-100 hover:shadow-md"
              }
              
              `}
            >
              <p className="text-lg font-semibold">{brand}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Brand;
