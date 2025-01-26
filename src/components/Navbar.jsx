import React, { useContext, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { TransactionContext } from "../context/TransactionContext"; // 引入上下文
import logo from "../../images/logo.png";
import { shortenAddress } from "../utils/shortenAddress"; // 引入 shortenAddress 函数

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer text-lg text-white transition-all duration-300 hover:text-[#ffcc00] ${classprops}`}>
    {title}
  </li>
);

const Navbar = ({ logoSize = "w-16" }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { currentAccount, connectWallet } = useContext(TransactionContext); // 从上下文获取当前账户和连接钱包方法

  return (
    <nav className="w-full flex md:justify-between justify-between items-center p-4 bg-black shadow-lg">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img
          src={logo}
          alt="logo"
          className={`${logoSize} cursor-pointer hover:scale-105 transition-transform duration-300`}
        />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["About", "Blog", "Newsletters", "Docs", "Explorer"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}

        {/* 如果没有连接钱包，显示 Connect Wallet 按钮 */}
        {!currentAccount ? (
          <li
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] transition-all duration-300"
            onClick={connectWallet} // 点击按钮时连接钱包
          >
            Connect Wallet
          </li>
        ) : (
          // 如果已经连接钱包，显示钱包地址
          <li className="text-white bg-[#2952e3] py-2 px-7 mx-4 rounded-full">
            {shortenAddress(currentAccount)}
          </li>
        )}
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer hover:text-[#ffcc00]"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <>
            <AiOutlineClose
              fontSize={28}
              className="text-white md:hidden cursor-pointer hover:text-[#ffcc00]"
              onClick={() => setToggleMenu(false)}
            />
            <ul
              className="z-10 fixed top-0 right-0 p-3 w-[70vw] h-screen bg-black shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end rounded-md text-white animate-slide-in"
            >
              <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
              {["About", "Blog", "Newsletters", "Docs", "Explorer"].map(
                (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
              )}
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
