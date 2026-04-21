import React from "react";
import {Link} from 'react-router'
import {
  FaUser,
  FaClipboardList,
  FaWrench,
  FaBicycle,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

function StaffNav() {
  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-[#e6ded3] flex flex-col justify-between border-r">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="p-5 border-b border-orange-400">
          <h1 className="text-xl font-bold text-orange-600">Riderr</h1>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 p-5 border-b border-orange-400">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <FaUser className="text-gray-700" />
          </div>

          <div>
            <p className="font-medium">Welcome staff</p>
            <p className="text-sm text-orange-600">STAFF</p>
          </div>
        </div>

        {/* Menu */}
        <div className="p-5 space-y-6">

          <Link to="#" className="flex items-center gap-3 cursor-pointer hover:text-orange-600">
            <FaClipboardList />
            <span>Requests</span>
          </Link>

          <Link to="" className="flex items-center gap-3 cursor-pointer hover:text-orange-600">
            <FaWrench />
            <span>Inspect</span>
          </Link>

          <Link to="" className="flex items-center gap-3 cursor-pointer hover:text-orange-600">
            <FaBicycle />
            <span>Test Ride Requests</span>
          </Link>

          <Link to="/addvehicle" className="flex items-center gap-3 cursor-pointer hover:text-orange-600">
            <FaPlus />
            <span>Add Vehicle</span>
          </Link>
        </div>
      </div>

      {/* Logout */}
      <div className="p-5 border-t border-orange-400">
        <Link to="" className="flex items-center gap-3 cursor-pointer text-orange-600 hover:text-orange-800">
          <FaSignOutAlt />
          <span>Log Out</span>
        </Link>
      </div>
    </div>
  );
}

export default StaffNav;
