import { useState, useEffect } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
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
    <div className="bg-none">
      <div className="w-full flex justify-center mb-2">
        <input
          type="text"
          placeholder="جست و جو ..."
          className="m-2 border  mt-5 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="relative overflow-x-auto sm:w-full ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
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
