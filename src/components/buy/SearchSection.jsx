import React from "react";
import { Search } from "lucide-react";

const SearchSection = ({
  search,
  setSearch,
  dataList,
  setDataList,
  filteredData,
  setFilteredData,
  result,
  setResult
}) => {
  const searchBuy = () => {

    if (search !== "") {
      result = result.filter(
        (bike) =>
          bike.vehicle_model.toLowerCase().includes(search.toLowerCase()) ||
          bike.vehicle_brand.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setResult(result)
    setFilteredData(result);
    console.log("search filtered : ", filteredData);
  };

  return (
    <>
      <section className="flex flex-row justify-between  border-b border-gray-200">
        <div className="px-8 py-2">
          <p className="text-3xl py-2 text-secondary">Book Your Vehicle</p>
          <p className="text-md text-gray-500">
            142 Riderrr Certified Bikes are available in Bengaluru
          </p>
        </div>
        <div className="flex justify-end items-center px-5">
          <div className="m-0 px-2 flex justify-between items-center gap-0 rounded-xl w-96">
            <input
              type="text"
              id="searchBuy"
              placeholder="Search by Brand / Model"
              className="py-3 px-3 m-0 w-full focus:border-secondary focus:px-3 border-2 border-secondary rounded-l-xl"
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="flex items-center border-2 border-secondary p-3 rounded-r-xl"
              onClick={searchBuy}
            >
              <Search className="w-6 mx-1" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchSection;
