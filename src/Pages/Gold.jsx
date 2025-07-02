/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

const Gold = () => {
  const [filterCoin, setFilterCoin] = useState([]);
  const [id, setId] = useState(0);
  useEffect(() => {
    let newArray = {};
    try {
      const getData = async () => {
        const req = await fetch(
          "https://brsapi.ir/Api/Market/Gold_Currency.php?key=FreeOmyTOvQelQcZdcQwNrggWfbKJKTu"
        );
        const res = await req.json();
        newArray = res.gold.reverse().map((item, index) => ({
          ...item,
          id: index,
        }));
        setFilterCoin(newArray);
      };
      getData();
    } catch (error) {
      console.log("error fetching data", error.message);
    }
  }, []);
  return (
    <div>
      <div className="mt-15 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {filterCoin.map((para) => (
          <div
            key={para.name}
            className="flex flex-row justify-between border border-white p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out text-white hover:scale-105"
          >
            <div>
              <div className=" flex gap-3 flex-col">
                <h2 className="text-xl font-semibold text-white">
                  {para.name}
                </h2>
                <p className="text-lg flex flex-row content-center">
                  تومان {para.price.toLocaleString()}
                  <FaLongArrowAltUp color="green" fontSize="20px" />
                </p>
                <p className="text-sm text-white">
                  {para.time} {para.date}
                </p>
              </div>
            </div>
            <div>
              <div className="w-25 h-25 flex items-center justify-center">
                {para.id === 0 ? (
                  <img src="../img/bahar.png" className="w-25 h-25" />
                ) : para.id === 1 ? (
                  <img src="../img/emami.png" className="w-18 h-18" />
                ) : para.id === 2 ? (
                  <img src="../img/nim.png" />
                ) : para.id === 3 ? (
                  <img src="../img/rob.png" />
                ) : para.id === 4 ? (
                  <img src="../img/1g.png" />
                ) : para.id === 5 ? (
                  <img src="../img/ons.png" />
                ) : para.id === 6 ? (
                  <img src="../img/abshode.png" />
                ) : para.id === 7 ? (
                  <img src="../img/24.png" />
                ) : para.id === 8 ? (
                  <img src="../img/18.png" />
                ) : (
                  <img src="../img/24.png" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gold;
