import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({
  latitude,
  longitude,
  batteryTemp,
  dcPower,
  acPower,
  updatedAt,
  createdAt,
  owner,
  message,
  price,
  url,
  keyword,
}) => {
  const gifUrl = useFetch({ keyword });
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  return (
    <div
      className="glassmorphism-card p-5 m-4 flex flex-col items-start justify-between w-[300px] h-[450px] rounded-lg shadow-xl cursor-pointer transform transition-transform hover:scale-105"
    >
      <img
        src={gifUrl || url}
        alt="solar panel"
        className="w-full h-40 object-cover rounded-md shadow-lg"
      />
      <div className="text-white mt-4 w-full">
        <p className="font-semibold text-lg mb-2">Price: {price} ETH</p>
        <p className="text-sm">Latitude: {latitude}</p>
        <p className="text-sm">Longitude: {longitude}</p>
        <p className="text-sm">Battery Temp: {batteryTemp}°C</p>
        <p className="text-sm">DC Power: {dcPower} W</p>
        <p className="text-sm">AC Power: {acPower} W</p>
        <p className="text-sm">Updated At: {updatedAt}</p>
        <p className="text-sm">Created At: {createdAt}</p>
        <p className="text-sm">Owner: {shortenAddress(owner)}</p>

        {/* Collapsible Message */}
        {message && (
          <div className="mt-4">
            <button
              className="text-blue-400 hover:text-blue-300 flex items-center"
              onClick={() => setIsMessageVisible(!isMessageVisible)}
            >
              <span className={`mr-2 transform transition-transform ${isMessageVisible ? "rotate-90" : ""}`}>
                ▶
              </span>
              {isMessageVisible ? "Hide Message" : "Show Message"}
            </button>
            {isMessageVisible && <p className="text-sm mt-2">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const currentTransactions = [...dummyData, ...transactions].reverse().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil([...dummyData, ...transactions].length / itemsPerPage);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions py-12">
      <div className="flex flex-col md:p-12 px-4 w-full max-w-[1200px]">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-4">
            Solar Panel Store
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-4">
            Connect your account to browse solar panels
          </h3>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {currentTransactions.map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-gray-700 text-white py-2 px-4 rounded-md mx-2 hover:bg-gray-600 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span className="text-white font-semibold py-2 px-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-gray-700 text-white py-2 px-4 rounded-md mx-2 hover:bg-gray-600 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
