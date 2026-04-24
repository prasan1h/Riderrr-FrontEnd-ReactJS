import React, { useEffect, useState } from "react";
import InspectionCard from "../../components/Admin/InspectionCard";

const Inspection = () => {
  const [data, setData] = useState([]);
  const url = "http://localhost:8080/api/bike/all";

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
      <div className="flex flex-wrap">
        {data.map((bike, index) => (
          <InspectionCard bike={bike} key={index} />
        ))}
      </div>
    </>
  );
};

export default Inspection;
