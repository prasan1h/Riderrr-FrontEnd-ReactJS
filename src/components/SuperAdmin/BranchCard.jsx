import { FiMail, FiUser, FiMapPin, FiPhone, FiEdit, FiTrash2 } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaCity } from "react-icons/fa6";

const BranchCard = ({branch , onEdit , onDelete}) => {

  
  return (
    <div className="flex justify-between items-center bg-gray-100 p-6 rounded-xl shadow-sm mb-4">
      
      {/* LEFT SIDE */}
      <div className="flex gap-4">
        <LuBuilding2 className="text-blue-500 text-3xl mt-1" />

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {branch.name}
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Branch ID: {branch.id}
          </p>

          <div className="space-y-3 text-gray-600 text-md">
            <p className="flex items-center gap-2">
              <FiMail /> {branch.email}
            </p>
            <p className="flex items-center gap-2">
              <FaCity /> {branch.city}
            </p>
            <p className="flex items-center gap-2">
              <FiMapPin /> {branch.location}
            </p>
            <p className="flex items-center gap-2">
              <FiPhone /> {branch.phone}
            </p>
          </div>
        </div>
      </div>

    
      {/* RIGHT SIDE BUTTONS */}
<div className="flex flex-col sm:flex-col gap-2 sm:gap-3 w-full sm:w-auto mt-4 sm:mt-0">
  
  <Link
    to={`/branches/${branch.id}`}
    className="flex items-center justify-center gap-1 sm:gap-2 
    bg-orange-500 hover:bg-orange-600 text-white 
    px-2 py-1.5 sm:px-4 sm:py-2 
    text-sm sm:text-base 
    rounded-lg shadow w-full sm:w-auto"
  >
    <FiUser className="text-sm sm:text-base" /> Manage Users
  </Link>

  <button
    onClick={() => onEdit(branch)}
    className="flex items-center justify-center gap-1 sm:gap-2 
    bg-blue-600 hover:bg-blue-700 text-white 
    px-2 py-1.5 sm:px-4 sm:py-2 
    text-sm sm:text-base 
    rounded-lg shadow w-full sm:w-auto"
  >
    <FiEdit className="text-sm sm:text-base" /> Edit Branch Details
  </button>

  <button
    onClick={() => onDelete(branch.id)}
    className="flex items-center justify-center gap-1 sm:gap-2 
    bg-red-500 hover:bg-red-600 text-white 
    px-2 py-1.5 sm:px-4 sm:py-2 
    text-sm sm:text-base 
    rounded-lg shadow w-full sm:w-auto"
  >
    <FiTrash2 className="text-sm sm:text-base" /> Delete Branch
  </button>

</div>
    </div>
  );
};

export default BranchCard;