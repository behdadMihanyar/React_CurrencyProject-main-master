import { useState, useEffect, useContext } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { MovieContext } from "../context/FilmContext";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
const Currency = () => {
  //Context
  const { show } = useContext(MovieContext);
  //States
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterCoin, setFilterCoin] = useState([]);
  //Get Data
  useEffect(() => {
    const getData = async () => {
      try {
        const req = await fetch(
          "https://brsapi.ir/Api/Market/Gold_Currency.php?key=FreeOmyTOvQelQcZdcQwNrggWfbKJKTu"
        );
        const res = await req.json();
        setData(res.currency);
        setFilterCoin(res.currency);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    getData();
  }, []);
  //Filtered Data
  useEffect(() => {
    if (filter.length === 0) return setFilterCoin(data);
    setFilterCoin(data.filter((para) => para.name.startsWith(filter)));
  }, [filter, data]);

  return (
    <>
      {!show && (
        <div className="max-sm:mt-10 px-2 py-6">
          {/* Search */}
          <div className="w-full flex justify-center mb-6 relative">
            <input
              type="text"
              placeholder="جست‌وجو..."
              className="w-full max-w-md pl-4 pr-3 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="relative overflow-x-auto rounded-lg shadow-md border border-gray-700">
            <table className="w-full text-sm text-left rtl:text-right text-white">
              <thead className="text-xs uppercase bg-amber-600 text-white">
                <tr>
                  <th className="px-6 py-3">نام</th>
                  <th className="px-6 py-3">قیمت</th>
                  <th className="px-6 py-3">تاریخ</th>
                  <th className="px-6 py-3">ساعت</th>
                </tr>
              </thead>
              <tbody>
                {filterCoin.map((para, index) => (
                  <tr
                    key={para.name}
                    className={`${
                      index % 2 === 0 ? "bg-gray-900/40" : "bg-gray-800"
                    } hover:bg-amber-600 transition-colors duration-200`}
                  >
                    <td className="px-6 py-4 font-bold whitespace-nowrap text-white">
                      {para.name}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      {para.change_percent > 0 ? (
                        <FaLongArrowAltUp className="text-green-400" />
                      ) : (
                        <FaLongArrowAltDown className="text-red-400" />
                      )}
                      <span className="text-white">
                        {`${para.price.toLocaleString()}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">{para.date}</td>
                    <td className="px-6 py-4 text-white">{para.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Currency;
