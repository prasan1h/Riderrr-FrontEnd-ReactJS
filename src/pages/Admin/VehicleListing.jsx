import React, { useEffect, useState } from "react";
import AdminNav from "../../components/Admin/AdminNav";
import VehicleListCard from "../../components/Admin/VehicleListCard";

const VehicleListing = () => {
  const [data, setData] = useState([]);
  const url = "http://localhost:8080/bike/all";

  const fetchData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((e) => console.log("error", e));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AdminNav />
      <div className="relative w-full ">
        <div className=" text-black">
          <p className="absolute left-68 text-3xl">
            Vehicles in your list...
          </p>
        </div>
        <div className="absolute flex justify-start flex-wrap bg-blue-100 left-64 top-12">
          {data.map((bike, index) => (
            <VehicleListCard bike={bike} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default VehicleListing;
