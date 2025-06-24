import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const Logout = ()=>{
    localStorage.clear();
    navigate('/')
  }

  return (
    <div className="bg-[#001F3F] rounded-xl w-full text-white h-16 flex items-center justify-around px-4 shadow-md">
      <h1 className="text-base tracking-wide sm:text-2xl font-bold text-center">
        Role-Based Access Control (RBAC)
      </h1>
      <div>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300" onClick={Logout} >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;
