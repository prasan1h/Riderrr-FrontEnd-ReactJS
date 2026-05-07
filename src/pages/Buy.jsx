
// import { useEffect, useState } from "react";
// import Nav from "../components/Nav";
// import Footer from "../components/Footer";

// import BikeCard from "../components/buy/BikeCardBuy";
// import FilterSection from "../components/buy/FilterSection";
// import SearchSection from "../components/buy/SearchSection";
// import SortSection from "../components/buy/SortSection";

// const Buy = () => {
//   const url = `${import.meta.env.VITE_API_URL}`;

//   const [dataList, setDataList] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");
//   const [visibleCount, setVisibleCount] = useState(9);
//   const [filters, setFilters] = useState({
//     brand: [],
//     year: [],
//     color: [],
//     price: [],
//   });

//   useEffect(() => {
//     fetch(`${url}/bike/findAtBuy`)
//       .then((res) => res.json())
//       .then((data) => {
//         setDataList(data);
//         setFilteredData(data);
//         console.log(data);
//       });
//   }, []);

//   // useEffect(() => {
//   //   console.log(dataList);
//   // },[]);

//   useEffect(() => {
//     let result = [...dataList];

//     if (search !== "") {
//       result = result.filter(
//         (bike) =>
//           bike.model.toLowerCase().includes(search.toLowerCase()) ||
//           bike.brand.toLowerCase().includes(search.toLowerCase()),
//       );
//     }

//     result = result.filter((bike) => {
//       const brandMatch =
//         filters.brand?.length === 0 ||
//         filters.brand?.includes(bike.brand.toLowerCase());

//       const colorMatch =
//         filters.color?.length === 0 ||
//         filters.color?.includes(bike.color.toLowerCase());

//       const priceMatch =
//         filters.price?.length === 0 ||
//         filters.price?.some((range) => {
//           const [min, max] = range.split("-");
//           return (
//             bike.outLetPrice >= +min &&
//             bike.outLetPrice <= +max
//           );
//         });

//       const yearMatch =
//         filters.year?.length === 0 ||
//         filters.year?.some((range) => {
//           const [min, max] = range.split("-");
//           return (
//             bike.modelYear >= +min && bike.modelYear <= +max
//           );
//         });

//       return brandMatch && colorMatch && priceMatch && yearMatch;
//     });

//     if (sort === "vehicle_selling_price_lth") {
//       result = [...result].sort(
//         (a, b) => a.outLetPrice - b.outLetPrice,
//       );
//     } else if (sort === "vehicle_selling_price_htl") {
//       result = [...result].sort(
//         (a, b) => b.outLetPrice - a.outLetPrice,
//       );
//     } else if (sort === "vehicle_model_year_lth") {
//       result = [...result].sort(
//         (a, b) => a.modelYear - b.modelYear,
//       );
//     } else if (sort === "vehicle_model_year_htl") {
//       result = [...result].sort(
//         (a, b) => b.modelYear - a.modelYear,
//       );
//     } else if (sort === "rating_htl") {
//       result = [...result].sort((a, b) => b.Rating - a.Rating);
//     }

//     setFilteredData(result);
//   }, [dataList, search, filters, sort]);

//   return (
//     <>
//       <Nav />
//       <div>
//         <SearchSection search={search} setSearch={setSearch} />

//         <section className="flex">
//           <FilterSection filters={filters} setFilters={setFilters} />

//           <div className="flex flex-col w-full bg-primary">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center p-5">
//                 <p className="">
//                   {filteredData.length} out of {dataList.length} bikes
//                 </p>
//               </div>
//               <div>
//                 <SortSection sort={sort} setSort={setSort} />
//               </div>
//             </div>

//             <div className="p-5 bg-primary">
//               <div className="flex justify-center flex-wrap">
//                 {filteredData.slice(0, visibleCount).map((bike, i) => (
//                   <BikeCard key={i} bike={bike} />
//                 ))}
//               </div>

//               <div className="flex justify-center">
//                 {visibleCount < filteredData.length && (
//                   <button
//                     onClick={() => setVisibleCount((prev) => prev + 9)}
//                     className="mt-4 px-4 py-2 bg-white text-secondary border-2 border-secondary rounded-md"
//                   >
//                     Load More
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Buy;



import { useEffect, useState, useCallback } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import BikeCard from "../components/buy/BikeCardBuy";
import FilterSection from "../components/buy/FilterSection";
import SearchSection from "../components/buy/SearchSection";
import SortSection from "../components/buy/SortSection";

const Buy = () => {
  const url = `${import.meta.env.VITE_API_URL}`;

  const [dataList, setDataList] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState({
    brand: [],
    year: [],
    color: [],
    price: [],
  });

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (sort)   params.append("sortBy", sort);

    filters.brand.forEach((b) => params.append("brand", b));
    filters.color.forEach((c) => params.append("color", c));
    filters.price.forEach((p) => params.append("price", p));
    filters.year.forEach((y)  => params.append("year", y));

    params.append("page", currentPage);
    params.append("size", 9);

    return params.toString();
  };

  const fetchBikes = useCallback((append = false) => {
    const query = buildQueryParams();
    fetch(`${url}/bike/findAtBuyPage?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setDataList((prev) => append ? [...prev, ...data.content] : data.content);
        setTotalElements(data.totalElements);
        setTotalPages(data.totalPages);
        setIsLast(data.isLast);
      });
  }, [search, sort, filters, currentPage]);

  // Reset page and fetch fresh on filter/search/sort change
  useEffect(() => {
    setCurrentPage(0);
    setDataList([]);
  }, [search, sort, filters]);

  // Fetch when currentPage changes (including reset to 0)
  useEffect(() => {
    fetchBikes(currentPage > 0);
  }, [currentPage, search, sort, filters]);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <Nav />
      <div>
        <SearchSection search={search} setSearch={setSearch} />

        <section className="flex">
          <FilterSection filters={filters} setFilters={setFilters} />

          <div className="flex flex-col w-full bg-primary">
            <div className="flex justify-between items-center">
              <div className="flex items-center p-5">
                <p>{dataList?.length} out of {totalElements} bikes</p>
              </div>
              <div>
                <SortSection sort={sort} setSort={setSort} />
              </div>
            </div>

            <div className="p-5 bg-primary">
              <div className="flex justify-center flex-wrap">
                {dataList?.map((bike, i) => (
                  <BikeCard key={i} bike={bike} />
                ))}
              </div>

              <div className="flex justify-center">
                {!isLast && (
                  <button
                    onClick={handleLoadMore}
                    className="mt-4 px-4 py-2 bg-white text-secondary border-2 border-secondary rounded-md"
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

export default Buy;
