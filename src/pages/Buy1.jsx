import React from "react";
import { useEffect, useState } from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import BikeCard from "../components/buy/BikeCardBuy";
import FilterSection from "../components/buy/FilterSection";
import SearchSection from "../components/buy/SearchSection";
import SortSection from "../components/buy/SortSection";

const Buy1 = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  let [result, setResult] = useState([]);
  const [filters, setFilters] = useState({
    brand: [],
    year: [],
    color: [],
    price: [],
  });

  useEffect(() => {
    fetch("/data/reride_dummy_bikes_80_realistic.json")
      .then((res) => res.json())
      .then((data) => { setDataList(data); setFilteredData(data) });
  }, []);

  useEffect(() => {
    setResult([...dataList]);
    console.log("buy result : ", result);
    result = result.filter((bike) => {
      const brandMatch =
        filters.brand?.length === 0 ||
        filters.brand?.includes(bike.vehicle_brand);

      const colorMatch =
        filters.color?.length === 0 ||
        filters.color?.includes(bike.vehicle_colour);

      const priceMatch =
        filters.price?.length === 0 ||
        filters.price?.some((range) => {
          const [min, max] = range.split("-");
          return (
            bike.vehicle_selling_price >= +min &&
            bike.vehicle_selling_price <= +max
          );
        });

      const yearMatch =
        filters.year?.length === 0 ||
        filters.year?.some((range) => {
          const [min, max] = range.split("-");
          return (
            bike.vehicle_model_year >= +min && bike.vehicle_model_year <= +max
          );
        });

      return brandMatch && colorMatch && priceMatch && yearMatch;
    });

    setFilteredData(result);
  }, [dataList, search, filters, sort]);

  return (
    <>
      <Nav />
      <div>
        <SearchSection
          dataList={dataList}
          setDataList={setDataList}
          setSearch={setSearch}
          search={search}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
          result={result}
          setResult={setResult}
        />

        <section className="flex">
          <FilterSection
            filters={filters}
            setFilters={setFilters}
            result={result}
            setResult={setResult}
          />

          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center bg-green-100">
              <div className="flex items-center p-5">
                <p className="">
                  {filteredData.length} out of {dataList.length} bikes
                </p>
              </div>
              <div>
                <SortSection
                  sort={sort}
                  setSort={setSort}
                  dataList={dataList}
                  setDataList={setDataList}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  result={result}
                  setResult={setResult}
                />
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-center flex-wrap bg-red-100">
                {filteredData.slice(0, visibleCount).map((bike, i) => (
                  <BikeCard key={i} bike={bike} />
                ))}
              </div>

              <div className="flex justify-center">
                {visibleCount < filteredData.length && (
                <button
                  onClick={() => setVisibleCount((prev) => prev + 9)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Load More
                </button>
              )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Buy1;
