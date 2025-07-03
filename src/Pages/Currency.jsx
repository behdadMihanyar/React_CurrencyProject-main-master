import { useState, useEffect } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
const Currency = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterCoin, setFilterCoin] = useState([]);
  useEffect(() => {
    try {
      const getData = async () => {
        const req = await fetch(
          "https://brsapi.ir/Api/Market/Gold_Currency.php?key=FreeOmyTOvQelQcZdcQwNrggWfbKJKTu"
        );
        const res = await req.json();
        setData(res.currency);
        setFilterCoin(res.currency);
      };
      getData();
    } catch (error) {
      console.log("error fetching data", error.message);
    }
  }, []);

  console.log(filterCoin);

  useEffect(() => {
    if (filter.length === 0) return setFilterCoin(data);
    setFilterCoin(data.filter((para) => para.name.startsWith(filter)));
  }, [filter]);
  return (
    <div className="bg-none max-sm:mt-15">
      <div className="w-full flex justify-center mb-2 text-amber-50 relative">
        <input
          type="text"
          placeholder="جست و جو ..."
          className="m-2 border max-sm:w-90 placeholder-white pr-10 mt-5 text-sm rounded-lg block w-96 p-2.5 border-gray-600  focus:text-white"
          onChange={(e) => setFilter(e.target.value)}
        />
        <span className="content-center translate-x-42 translate-y-8 absolute max-sm:translate-x-39">
          <FaMagnifyingGlass />
        </span>
      </div>

      <div className="relative overflow-x-auto sm:w-full ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-300 ">
          <tbody>
            {filterCoin.map((para) => (
              <tr className="hover:bg-cyan-900" key={para.name}>
                <th
                  scope="row"
                  className="sm:gap-0 px-6 py-4 font-bold whitespace-nowrap text-white"
                >
                  {para.name}
                </th>
                <td className="px-1 py-4 flex  gap-2">
                  <p>
                    {para.change_percent > 0 ? (
                      <FaLongArrowAltUp color="green" fontSize="20px" />
                    ) : (
                      <FaLongArrowAltDown color="red" fontSize="20px" />
                    )}
                  </p>
                  <p> {` ${para.price.toLocaleString()}  `}</p>
                </td>
                <td className="px-6 py-4">{para.date}</td>
                <td className="px-6 py-4">{para.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Currency;
