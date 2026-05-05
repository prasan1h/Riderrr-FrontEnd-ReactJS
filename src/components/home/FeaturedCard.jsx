import React from "react";
import BikeImg from "../../assets/bikes/apache-bike-1.png";
import { Dot } from "lucide-react";

const FeaturedCard = ({ bike }) => {
  const url = `${import.meta.env.VITE_API_URL}`;

  const handleClick = (id) => {
    window.location.href = `/buy/${id}`;
  };
  return (
    <>
      <article className="swiper-slide bg-white flex flex-col justify-between border-2 border-gray-400 rounded-xl w-sm h-fit shrink-0 p-1">
        <div className="flex justify-center align-center h-64 relative">
          <img src={`${url}/${bike.images[0]}`} alt="bike thumbnail" className="swiper-slide-img " />
          <span className="absolute bg-blue-500 top-1 left-1 rounded-xl text-xs text-white font-medium px-2 py-1 z-2">
            New Listing
          </span>
        </div>
        <div>
          <div className="flex justify-between px-3 py-1">
            <p className="font-semibold text-2xl">
              {bike.brand} {bike.model}
            </p>
            <p className="bg-gray-100 bottom-1 right-1 rounded-md text-secondary font-medium px-2 py-1">
              ₹ {bike.outLetPrice}
            </p>
          </div>
          <div className="px-3 flex text-sm text-gray-500">
            <p>{bike.modelYear}</p>
            <Dot />
            <p>{bike.Mileage}</p>
            <Dot />
            <p>{bike.inspectionBranch}</p>
          </div>
          <div className="p-3">
            <button
              className="bg-white text-secondary w-full border-2 border-gray-500 rounded-md p-2"
              onClick={() => {
                handleClick(bike.id);
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default FeaturedCard;
