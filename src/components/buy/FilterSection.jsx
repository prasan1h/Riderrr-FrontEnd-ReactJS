import React, { useEffect } from "react";

const FilterSection = ({ filters, setFilters, result, setResult }) => {

  const filterBuy = () => {
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
  };

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prev) => {
      if (checked) {
        // add value
        return {
          ...prev,
          [name]: [...prev[name], value],
        };
      } else {
        // remove value
        return {
          ...prev,
          [name]: prev[name].filter((item) => item !== value),
        };
      }
    });
  };

  const clearFilters = () => {
    setFilters({ brand: [], year: [], color: [], price: [] });
  };


  useEffect(() => {
    filterBuy();
    console.log("filter section : ", filters);
  },[filters]);

  return (
    <>
      <aside className="w-75 sticky top-0 h-fit bg-blue-100">
        <div className="flex flex-row justify-between px-8 py-5 static top-0 right-0 left-0 text-secondary">
          <p className="text-2xl font-semibold">Filters</p>
          <button className="underline" onClick={clearFilters}>
            Clear all
          </button>
        </div>
        <div className="px-8 py-5">
          <div className="flex flex-col gap-1 mb-3">
            <div className="text-2xl">Price Range :</div>
            <div className="flex flex-row flex-wrap gap-2">
              <label className=" cursor-pointer text-white">
                <input
                  type="checkbox"
                  name="price"
                  value="0-150000"
                  className="peer hidden"
                  onChange={handleFilterChange}
                />
                <span className=" text-xs bg-secondary px-2 py-1 border-2  border-secondary rounded-full  peer-checked:bg-white peer-checked:text-secondary peer-checked:border-secondary">
                  Below 1.5L
                </span>
              </label>
              <label className=" cursor-pointer text-white">
                <input
                  type="checkbox"
                  name="price"
                  value="150000-250000"
                  className="peer hidden"
                  onChange={handleFilterChange}
                />
                <span className=" text-xs bg-secondary px-2 py-1 border-2  border-secondary rounded-full  peer-checked:bg-white peer-checked:text-secondary peer-checked:border-secondary">
                  1.5L - 2.5L
                </span>
              </label>
              <label className=" cursor-pointer text-white">
                <input
                  type="checkbox"
                  name="price"
                  value="250000-500000"
                  className="peer hidden"
                  onChange={handleFilterChange}
                />
                <span className=" text-xs bg-secondary px-2 py-1 border-2  border-secondary rounded-full  peer-checked:bg-white peer-checked:text-secondary peer-checked:border-secondary">
                  Above 2.5L
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1  text-secondary mb-3">
            <div className="text-2xl">Brand :</div>
            <div className="flex flex-col gap-0">
              <label>
                <input
                  type="checkbox"
                  name="brand"
                  value="KTM"
                  onChange={handleFilterChange}
                />
                KTM
              </label>
              <label>
                <input
                  type="checkbox"
                  name="brand"
                  value="TVS"
                  onChange={handleFilterChange}
                />
                TVS
              </label>
              <label>
                <input
                  type="checkbox"
                  name="brand"
                  value="Bajaj"
                  onChange={handleFilterChange}
                />
                Bajaj
              </label>
              <label>
                <input
                  type="checkbox"
                  name="brand"
                  value="Royal Enfield"
                  onChange={handleFilterChange}
                />
                Royal Enfield
              </label>
              <label>
                <input
                  type="checkbox"
                  name="brand"
                  value="Yamaha"
                  onChange={handleFilterChange}
                />
                Yamaha
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-1  text-secondary mb-3">
            <div className="text-2xl">Year Range :</div>
            <div className="flex flex-row flex-wrap gap-2">
              <label className=" cursor-pointer text-white">
                <input
                  type="checkbox"
                  name="year"
                  onChange={handleFilterChange}
                  value="2019-2020"
                  className="peer hidden"
                />
                <span className=" text-xs bg-secondary px-2 py-1 border-2  border-secondary rounded-full  peer-checked:bg-white peer-checked:text-secondary peer-checked:border-secondary">
                  2019-2020
                </span>
              </label>
              <label className=" cursor-pointer text-white">
                <input
                  type="checkbox"
                  name="year"
                  onChange={handleFilterChange}
                  value="2020-2021"
                  className="peer hidden"
                />
                <span className=" text-xs bg-secondary px-2 py-1 border-2  border-secondary rounded-full  peer-checked:bg-white peer-checked:text-secondary peer-checked:border-secondary">
                  2020-2021
                </span>
              </label>
              <label className=" cursor-pointer text-white">
                <input
                  type="checkbox"
                  name="year"
                  onChange={handleFilterChange}
                  value="2021-2022"
                  className="peer hidden"
                />
                <span className=" text-xs bg-secondary px-2 py-1 border-2  border-secondary rounded-full  peer-checked:bg-white peer-checked:text-secondary peer-checked:border-secondary">
                  2021-2022
                </span>
              </label>
              <label className=" cursor-pointer text-white">
                <input
                  type="checkbox"
                  name="year"
                  onChange={handleFilterChange}
                  value="2022-2023"
                  className="peer hidden"
                />
                <span className=" text-xs bg-secondary px-2 py-1 border-2  border-secondary rounded-full  peer-checked:bg-white peer-checked:text-secondary peer-checked:border-secondary">
                  2022-2023
                </span>
              </label>
              <label className=" cursor-pointer text-white">
                <input
                  type="checkbox"
                  name="year"
                  onChange={handleFilterChange}
                  value="2023-2024"
                  className="peer hidden"
                />
                <span className=" text-xs bg-secondary px-2 py-1 border-2  border-secondary rounded-full  peer-checked:bg-white peer-checked:text-secondary peer-checked:border-secondary">
                  2023-2024
                </span>
              </label>
              <label className=" cursor-pointer text-white">
                <input
                  type="checkbox"
                  name="year"
                  onChange={handleFilterChange}
                  value="2024-2025"
                  className="peer hidden"
                />
                <span className=" text-xs bg-secondary px-2 py-1 border-2  border-secondary rounded-full  peer-checked:bg-white peer-checked:text-secondary peer-checked:border-secondary">
                  2024-2025
                </span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-1  text-secondary mb-3">
            <div className="text-2xl">Color :</div>
            <div className="flex flex-col gap-0">
              <label>
                <input type="checkbox" name="color" onChange={handleFilterChange} value="Red" />
                Red
              </label>
              <label>
                <input type="checkbox" name="color" onChange={handleFilterChange} value="Black" />
                Black
              </label>
              <label>
                <input type="checkbox" name="color" onChange={handleFilterChange} value="White" />
                White
              </label>
              <label>
                <input type="checkbox" name="color" onChange={handleFilterChange} value="Grey" />
                Grey
              </label>
              <label>
                <input type="checkbox" name="color" onChange={handleFilterChange} value="Blue" />
                Blue
              </label>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </aside>
    </>
  );
};

export default FilterSection;
