import React, { useEffect } from "react";

const SortSection = ({
  sort,
  setSort,
  dataList,
  setDataList,
  filteredData,
  setFilteredData,
  result,
  setResult
}) => {


  const sortBuy = () => {

    // console.log("sortBuy");

    if (sort === "vehicle_selling_price_lth") {
      result.sort((a, b) => a.vehicle_selling_price - b.vehicle_selling_price);
    } else if (sort === "vehicle_selling_price_htl") {
      result.sort((a, b) => b.vehicle_selling_price - a.vehicle_selling_price);
    } else if (sort === "vehicle_model_year_lth") {
      result.sort((a, b) => a.vehicle_model_year - b.vehicle_model_year);
    } else if (sort === "vehicle_model_year_htl") {
      result.sort((a, b) => b.vehicle_model_year - a.vehicle_model_year);
    } else if (sort === "rating_htl") {
      result.sort((a, b) => b.vehicle_rating - a.vehicle_rating);
    }
    
    // setSort(result);
    setResult(result);
    setFilteredData(result);
    // console.log("sortBuy : ", result);
    // console.log("sort filtered : ", filteredData);
  };

  useEffect(() => {
    sortBuy();
    // console.log("sort",sort);
  }, [sort]);

  return (
    <>
      <div className="flex flex-row justify-between  px-5">
        <div className="flex text-xl gap-2 justify-center items-center">
          <span id="listcount" className="text-md font-semibold"></span>
        </div>
        <div className="flex px-5 items-center gap-1">
          <div className="flex items-center mx-1">
            <p className="text-xl font-semibold">Sort By</p>
          </div>
          <div className="">
            <select
              name="sortBuy"
              id="sortBuy"
              className="border-2 border-secondary px-2 py-1 rounded-md"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="" className="text-gray-200">
                Default
              </option>
              <option value="rating_htl">Ratings</option>
              <option value="vehicle_model_year_lth">
                Model year (low - high)
              </option>
              <option value="vehicle_model_year_htl">
                Model year (high - low)
              </option>
              <option value="vehicle_selling_price_lth">
                Price (low - high)
              </option>
              <option value="vehicle_selling_price_htl">
                Price (high - low)
              </option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default SortSection;
