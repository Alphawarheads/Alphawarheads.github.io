import React from "react";
import logo from "../../images/logo.png";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <img
          src={logo}
          alt="logo"
          className="w-32 hover:scale-110 hover:rotate-3 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        {["Dashboard", "Energy Data", "Rewards", "Settings"].map((item, index) => (
          <p
            key={index}
            className="text-white text-base text-center mx-2 cursor-pointer hover:text-[#ffcc00] transition-colors duration-300 hover:scale-105 hover:underline"
          >
            {item}
          </p>
        ))}
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center italic opacity-80 hover:opacity-100 transition-opacity duration-300">
        Join us in shaping a sustainable future with SolarSave
      </p>
      <p className="text-white text-sm text-center font-medium mt-2 underline hover:text-[#ffcc00] transition-colors duration-300">
        info@solarsave.com
      </p>
    </div>

    <div className="sm:w-[90%] w-full h-[1px] bg-gradient-to-r from-gray-500 to-gray-300 mt-5 animate-pulse" />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs hover:opacity-80 transition-opacity duration-300">
        © 2024 SolarSave
      </p>
      <p className="text-white text-right text-xs hover:opacity-80 transition-opacity duration-300">
        All rights reserved
      </p>
    </div>
  </div>
);

export default Footer;
