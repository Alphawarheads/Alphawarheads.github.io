import React, { useState } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import Welcome from "./Welcome"; // 引入 Welcome 组件
import SolarTrade from "./SolarTrade";
const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => {
  const [showWelcome, setShowWelcome] = useState(false); // 添加状态控制切换

  const handleGetStarted = () => {
    setShowWelcome(true); // 切换到 Welcome 组件
  };

  if (showWelcome) {
    return <SolarTrade />; // 条件渲染 Welcome 组件
  }

  return (
    <div className="flex w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
            Services that we
            <br />
            continue to enhance
          </h1>
          <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
            The best choice for monitoring and optimizing your solar energy usage,
            with our seamless blockchain-powered services.
          </p>
          <button
            onClick={handleGetStarted} // 添加点击事件
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Get Started
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-start items-center">
          <ServiceCard
            color="bg-[#2952E3]"
            title="Guaranteed Security"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Your energy data is safe. We ensure privacy and security while providing top-quality services."
          />
          <ServiceCard
            color="bg-[#8945F8]"
            title="Real-Time Analytics"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Get insights into your energy production and consumption, empowering you with real-time data."
          />
          <ServiceCard
            color="bg-[#F84550]"
            title="Instant Rewards"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="Earn rewards instantly for efficient energy usage and contribute to a sustainable future."
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
