import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

import HideVehicleModal from "../../components/Admin/HideVehicleModal";
import SoldStatusModal from "../../components/Admin/SoldStatusModal";

const ViewVehicleById = () => {
  const { id } = useParams();

  const url = `${import.meta.env.VITE_API_URL}`;
  const [data, setData] = useState([]);
  const [openHideModal, setOpenHideModal] = useState(false);
  const [openSoldModal, setOpenSoldModal] = useState(false);

  const fetchAllDetails = () => {
    fetch(`${url}/api/inspection/report/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((e) => console.log(e));
  };

  const hideVehicle = () => {
    let payload = new FormData();
    payload.append("id", id);
    payload.append("isVisible", false);

    fetch(`${url}/bike/visibility`, {
      method: "PUT",
      body: payload,
    })
      .then((res) => {
        if (!res.ok) {
          alert("Failed!!! to change the visibility");
          return;
        }
        console.log("hiding the vehicle with id ", id);
        setOpenHideModal(false);
        fetchAllDetails();
      })
      .catch((e) => console.log(e));
  };

  const unHideVehicle = () => {
    let payload = new FormData();
    payload.append("id", id);
    payload.append("isVisible", true);

    fetch(`${url}/bike/visibility`, {
      method: "PUT",
      body: payload,
    })
      .then((res) => {
        if (!res.ok) {
          alert("Failed!!! to change the visibility");
          return;
        }
        console.log("Unhiding the vehicle with id ", id);
        setOpenHideModal(false);
        fetchAllDetails();
      })
      .catch((e) => console.log(e));
  };

  const editVehicle = () => {
    window.location.href = `/admin/editvehicle/${id}`;
  };

  useEffect(() => {
    fetchAllDetails();
  }, []);

  const inspectionFields = [
    {
      label1: "vehicle AirFilter Condition",
      key1: "AirFilter",
      label2: "vehicle Body Condition",
      key2: "Body",
      label3: "vehicle Battery Condition",
      key3: "Battery",
    },
    {
      label1: "vehicle Tyre Condition",
      key1: "Tyre",
      label2: "vehicle Brake Condition",
      key2: "Brake",
      label3: "vehicle Damage Condition",
      key3: "Damage",
    },
    {
      label1: "vehicle Engine Condition",
      key1: "Engine",
      label2: "vehicle Exhaust Condition",
      key2: "Exhaust",
      label3: "vehicle Seat Condition",
      key3: "Seat",
    },
    {
      label1: "vehicle Handle Condition",
      key1: "Handles",
      label2: "vehicle Gear Condition",
      key2: "Gear",
      label3: "vehicle Light Condition",
      key3: "Light",
    },
    {
      label1: "vehicle Modification Condition",
      key1: "Modification",
      label2: "vehicle Seat Condition",
      key2: "Seat",
      label3: "vehicle MeterBoard Condition",
      key3: "MeterBoard",
    },
    {
      label1: "vehicle ShockAbsorber Condition",
      key1: "ShockAbsorber",
      label2: "vehicle Wheel Condition",
      key2: "Wheel",
      label3: "vehicle Overall",
      key3: "OK",
    },
  ];

  const vehicleFields = [
    {
      label1: "vehicl Id",
      key1: "id",
      label2: "vehicle Brand",
      key2: "Brand",
      label3: "vehicle Model",
      key3: "Model",
    },
    {
      label1: "vehicl Colour",
      key1: "Colour",
      label2: "vehicle Model Year",
      key2: "ModelYear",
      label3: "vehicle Owner Type",
      key3: "OwnerType",
    },
    {
      label1: "vehicl Purchased Amount",
      key1: "PurchasedAmount",
      label2: "vehicle Purchased Date",
      key2: "PurchasedDate",
      label3: "vehicle Register Number",
      key3: "RegisterNumber",
    },
    {
      label1: "vehicl Type",
      key1: "Type",
      label2: "vehicle Inspection Branch",
      key2: "inspectionBranch",
      label3: "vehicle Visibility",
      key3: "isVisible",
    },
    {
      label1: "vehicl Mileage",
      key1: "Mileage",
      label2: "vehicle OutLet Price",
      key2: "OutLetPrice",
      label3: "vehicle Availability",
      key3: "Availability",
    },
    {
      label1: "vehicl Documents Given",
      key1: "documentsGiven",
      label2: "vehicle Status",
      key2: "status",
      label3: "vehicle Rating",
      key3: "Rating",
    },
    {
      label1: "vehicl Inspection Branch",
      key1: "inspectionBranch",
      label2: "vehicle Selling Price",
      key2: "SellingPrice",
      label3: "vehicle Sold Date",
      key3: "SoldDate",
    },
  ];

  const formatValue = (value) => {
    if (value == null) return "N/A";

    switch (typeof value) {
      case "boolean":
        return value ? "Yes" : "No";

      case "number":
        return value;

      case "string":
        return value || "N/A";

      default:
        return value;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div>
            <Link
              to="/admin/vehiclelist"
              className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800 transition-colors"
            >
              ← Back
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="bg-indigo-600 px-5 py-4 flex items-center justify-between">
              <h1 className="text-white text-xl font-bold">
                {data?.vehicleId?.Brand}{" "}
                {data?.vehicleId?.Model || "TVS Jupiter"}
              </h1>
              <span className="bg-indigo-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                {data?.vehicleId?.RegisterNumber || "KA 03 AC 4321"}
              </span>
            </div>

            <div className="px-5 py-5 grid grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-indigo-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Customer
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {data?.vehicleId?.customerName || "xyz"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {data?.vehicleId?.customerPhNo || "8787879990"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-indigo-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Scheduled
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {data?.vehicleId?.InspectionDate || "Mar 26, 2026"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Location
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {data?.vehicleId?.branchId || "bengaluru"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                </svg>
              </div>
              <h2 className="text-base font-semibold text-gray-800">
                Vehicle Details
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {vehicleFields.map((field, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {field.label1}
                    </label>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 min-h-[36px]">
                      {formatValue(data?.vehicleId?.[field.key1])}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {field.label2}
                    </label>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 min-h-[36px]">
                      {formatValue(data?.vehicleId?.[field.key2])}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {field.label3}
                    </label>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 min-h-[36px]">
                      {formatValue(data?.vehicleId?.[field.key3])}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                </svg>
              </div>
              <h2 className="text-base font-semibold text-gray-800">
                Vehicle Inspection Report
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {inspectionFields.map((field, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {field.label1}
                    </label>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 min-h-[36px]">
                      {formatValue(data?.[field.key1])}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {field.label2}
                    </label>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 min-h-[36px]">
                      {formatValue(data?.[field.key2])}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {field.label3}
                    </label>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 min-h-[36px]">
                      {formatValue(data?.[field.key3])}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-evenly">
            <button
              type="button"
              onClick={() => {
                editVehicle();
              }}
              className="px-3 bg-yellow-500 hover:bg-yellow-700 active:bg-yellow-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm tracking-wide shadow-sm"
            >
              Edit Vehicle
            </button>

            {data?.vehicleId?.isVisible == true ? (
              <>
                <button
                  type="button"
                  onClick={() => setOpenHideModal(true)}
                  className="px-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm tracking-wide shadow-sm"
                >
                  Hide the Vehicle
                </button>

                <HideVehicleModal
                  isOpen={openHideModal}
                  onClose={() => setOpenHideModal(false)}
                >
                  <div>
                    <div>
                      <p>Hide Vehicle ?</p>
                    </div>
                    <div>
                      <p>
                        Are you sure you want to hide this vehicle on the
                        website?
                      </p>
                    </div>
                    <div className="flex justify-evenly">
                      <button onClick={() => setOpenHideModal(false)}>
                        Close
                      </button>
                      <button onClick={() => hideVehicle()}>Hide</button>
                    </div>
                  </div>
                </HideVehicleModal>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setOpenHideModal(true)}
                  className="px-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm tracking-wide shadow-sm"
                >
                  Unhide the Vehicle
                </button>

                <HideVehicleModal
                  isOpen={openHideModal}
                  onClose={() => setOpenHideModal(false)}
                >
                  <div>
                    <div>
                      <p>Hide Vehicle ?</p>
                    </div>
                    <div>
                      <p>
                        Are you sure you want to hide this vehicle on the
                        website?
                      </p>
                    </div>
                    <div className="flex justify-evenly">
                      <button onClick={() => setOpenHideModal(false)}>
                        Close
                      </button>
                      <button onClick={() => unHideVehicle()}>Unhide</button>
                    </div>
                  </div>
                </HideVehicleModal>
              </>
            )}

            {data?.vehicleId?.Availability == true ? <p>mark sold btn</p> : ""}
            <button
              type="button"
              // onClick={() => {
              //   markAsSold();
              // }}
              onClick={() => setOpenSoldModal(true)}
              className="px-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm tracking-wide shadow-sm"
            >
              Mark As Sold
            </button>

            <SoldStatusModal
              isOpen={openSoldModal}
              onClose={() => setOpenSoldModal(false)}
            >
              <div><p>hii</p></div>
            </SoldStatusModal>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewVehicleById;
