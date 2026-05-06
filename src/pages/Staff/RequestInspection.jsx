import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import BikeCard from "../../components/Staff/BikeCard";
import StaffNav from "../../components/Staff/StaffNav";

import { FaMotorcycle } from "react-icons/fa6";

const RequestInspection = () => {
  const [data, setData] = useState([]);

  const url = `${import.meta.env.VITE_API_URL}`;
  const fetchData = () => {
    fetch(`${url}/bike/pendingAll`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((e) => console.log("error", e));
  };

  const handleStatusChange = (id) => {
    toast.success("Vehicle status updated");
    setData((prev) => prev.filter((bike) => bike.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <StaffNav />
      <div className="relative w-full">
        <div className="absolute left-68 top-4 text-black">
          <p className="text-3xl font-semibold flex items-center gap-3">
            <FaMotorcycle />
            Hello Staff, here is the list of requests...
          </p>
        </div>
        <div className="absolute flex justify-center flex-wrap bg-gray-100 left-64 top-20">
          {data.map((bike, index) => (
            <BikeCard bike={bike} key={index}     onStatusChange={handleStatusChange}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default RequestInspection;
