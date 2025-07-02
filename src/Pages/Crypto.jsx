/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useCoinContext } from "../context/CoinContext";
const Crypto = () => {
  const { coins, setCoins } = useCoinContext();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("دلار");
  const [f, setF] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(currency === "دلار");
  useEffect(() => {
    const fetChData = async () => {
      const req = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${
          currency === "دلار" ? "usd" : "eur"
        }&per_page=10&page=${page}&x_cg_demo_api_key=CG-BHBgZZ2Gm7hqeseDH8ZWiGbX`
      );
      const res = await req.json();
      setCoins(res);
      setF(res);
      setLoading(false);
      console.log("run second");
    };
    fetChData();
  }, [currency, page]);

  useEffect(() => {
    if (!search) {
      console.log("run first");
      console.log(coins);
      setF(coins);
    } else {
      setF(
        coins.filter((e) =>
          e.name.toLowerCase().startsWith(search.toLowerCase())
        )
      );
    }
  }, [search]);
  const prevHandler = () => {
    setLoading(true);
    if (page <= 1) return setLoading(false);
    setPage((prev) => prev - 1);
  };
  const nextHandler = () => {
    setLoading(true);
    if (page >= 10) return setLoading(false);
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="flex justify-center gap-3 items-center mt-20 mb-3 ">
        <input
          type="text"
          placeholder="جستجو ..."
          className="mr-3 border border-white text-gray-900 text-sm rounded-lg focus:text-white block w-96 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="ml-3 text-amber-50 focus:bg-black"
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
        >
          <option className="">دلار</option>
          <option>یورو</option>
        </select>
      </div>
      {loading ? (
        <div className=" text-center mt-35">
          <ClipLoader color="orange" size={100} />
        </div>
      ) : (
        <TableCoin
          f={f}
          setF={setF}
          currency={currency}
          setCurrency={setCurrency}
        />
      )}
      <br />
      {!loading && (
        <div className="flex gap-3 items-center mt-3 justify-center my-14 text-white">
          <button
            onClick={prevHandler}
            className="bg-amber-600 rounded-md p-2 text-white hover:bg-amber-700 cursor-pointer"
          >
            قبلی
          </button>
          <p className={page === 1 ? "text-amber-700 font-bold txt-lg" : null}>
            1
          </p>
          <p className={page === 2 ? "text-amber-700 font-bold txt-lg" : null}>
            2
          </p>

          {page > 2 && page <= 8 && (
            <>
              <span>...</span>
              <p className="text-amber-700 font-bold">{page}</p>
            </>
          )}
          <span>...</span>
          <p className={page === 9 ? "text-amber-700 font-bold txt-lg" : null}>
            9
          </p>
          <p className={page === 10 ? "text-amber-700 font-bold txt-lg" : null}>
            10
          </p>
          <button
            onClick={nextHandler}
            className="bg-amber-600 rounded-md p-2 text-white hover:bg-amber-700 cursor-pointer"
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
};
export default Crypto;

const TableCoin = ({ f, setF, currency, setCurrency }) => {
  const navigate = useNavigate();
  const coinHandler = (coin) => {
    navigate(`/coin/${coin.id}`);
  };
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-white">
        <thead className="text-xs text-white uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3 ">
              نام
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              قیمت
            </th>
            <th scope="col" className="px-6 py-3">
              بروزرسانی
            </th>
            <th scope="col" className="px-6 py-3 max-sm:hidden">
              سمبل
            </th>
          </tr>
        </thead>
        <tbody>
          {f.map((coin) => (
            <tr
              className="border-b dark:border-gray-700 border-gray-200  hover:bg-cyan-900 transition ease-in-out duration-300"
              key={coin.id}
            >
              <th
                onClick={() => coinHandler(coin)}
                scope="row"
                className="pl-3 py-4 font-medium text-white whitespace-nowrap"
              >
                <div className="flex cursor-pointer gap-3 items-center">
                  <img src={coin.image} className="w-7 mr-2" />
                  <p>{coin.name}</p>
                </div>
              </th>
              <td className="px-6 py-4 text-center">
                <span className="font-bold">
                  {currency === "دلار" ? "$" : "€"}
                </span>
                {coin.current_price.toLocaleString()}
              </td>
              <td className="px-6 py-4">
                {coin.last_updated.slice(".", -5).split("T").slice(1)}
              </td>
              <td className="px-6 py-4 max-sm:hidden">{coin.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
