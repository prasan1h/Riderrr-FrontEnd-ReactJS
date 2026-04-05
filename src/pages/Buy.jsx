import { useEffect, useState } from "react";
import BikeCard from "../components/buy/BikeCardBuy";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Buy = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  const [filters, setFilters] = useState({
    brand: [],
    year: [],
    color: [],
    price: [],
  });

  // FETCH DATA
  useEffect(() => {
    fetch("/data/reride_dummy_bikes_80_realistic.json")
      .then((res) => res.json())
      .then((data) => setDataList(data));
  }, []);

  // APPLY ALL LOGIC
  useEffect(() => {
    let result = [...dataList];

    // SEARCH
    if (search !== "") {
      result = result.filter(
        (bike) =>
          bike.vehicle_model.toLowerCase().includes(search.toLowerCase()) ||
          bike.vehicle_brand.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // FILTERS
    result = result.filter((bike) => {
      const brandMatch =
        filters.brand.length === 0 ||
        filters.brand.includes(bike.vehicle_brand);

      const colorMatch =
        filters.color.length === 0 ||
        filters.color.includes(bike.vehicle_colour);

      const priceMatch =
        filters.price.length === 0 ||
        filters.price.some((range) => {
          const [min, max] = range.split("-");
          return (
            bike.vehicle_selling_price >= +min &&
            bike.vehicle_selling_price <= +max
          );
        });

      const yearMatch =
        filters.year.length === 0 ||
        filters.year.some((range) => {
          const [min, max] = range.split("-");
          return (
            bike.vehicle_model_year >= +min && bike.vehicle_model_year <= +max
          );
        });

      return brandMatch && colorMatch && priceMatch && yearMatch;
    });

    // SORTING
    if (sort === "price_low") {
      result.sort((a, b) => a.vehicle_selling_price - b.vehicle_selling_price);
    } else if (sort === "price_high") {
      result.sort((a, b) => b.vehicle_selling_price - a.vehicle_selling_price);
    } else if (sort === "year_low") {
      result.sort((a, b) => a.vehicle_model_year - b.vehicle_model_year);
    } else if (sort === "year_high") {
      result.sort((a, b) => b.vehicle_model_year - a.vehicle_model_year);
    } else if (sort === "rating") {
      result.sort((a, b) => b.vehicle_rating - a.vehicle_rating);
    }

    setFilteredData(result);
  }, [dataList, search, filters, sort]);

  // HANDLE FILTER CHANGE
  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const exists = prev[type].includes(value);
      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    setFilters({ brand: [], year: [], color: [], price: [] });
  };

  return (
    <>
      <Nav />
      <div className="p-5">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search bikes..."
          className="border p-2 w-full mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* SORT */}
        <select
          className="border p-2 mb-4"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="price_low">Price Low → High</option>
          <option value="price_high">Price High → Low</option>
          <option value="year_low">Year Low → High</option>
          <option value="year_high">Year High → Low</option>
          <option value="rating">Rating High → Low</option>
        </select>

        {/* FILTER EXAMPLE */}
        <div className="mb-4">
          <p className="font-bold">Brand</p>
          {["Yamaha", "Honda", "KTM"].map((b) => (
            <label key={b} className="mr-2">
              <input
                type="checkbox"
                onChange={() => handleFilterChange("brand", b)}
              />{" "}
              {b}
            </label>
          ))}
        </div>

        <button
          onClick={clearFilters}
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear Filters
        </button>

        {/* COUNT */}
        <p className="mb-4">
          {filteredData.length} out of {dataList.length} bikes
        </p>

        {/* GRID */}
        <div className="flex flex-wrap">
          {filteredData.slice(0, visibleCount).map((bike, i) => (
            <BikeCard key={i} bike={bike} />
          ))}
        </div>

        {/* LOAD MORE */}
        {visibleCount < filteredData.length && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 9)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Load More
          </button>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Buy;
