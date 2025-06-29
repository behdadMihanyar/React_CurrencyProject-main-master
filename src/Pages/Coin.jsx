import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoinById } from "../services/CryptoApi";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Sidebar from "../components/Sidebar";

const Coin = () => {
  const { coins, setCoins } = useCoinContext();
  const [type, setType] = useState("prices");
  const [coin, setCoin] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getCoin = async () => {
      const req = await fetch(getCoinById(id));
      const res = await req.json();
      console.log(res);
      setCoin(res[type]);
    };
    getCoin();
  }, [id]);
  if (!coin) return null;
  const chart = coin.map((item) => {
    return {
      date: new Date(item[0]).toLocaleDateString(),
      [type]: item[1],
    };
  });
  const [filteredCoin] = coins.filter((coin) => coin.id === id);
  console.log(coin);
  return (
    <div className=" overflow-x-scroll scrollbar-hide">
      <div className="w-full">
        <div className="flex justify-center items-center flex-col mt-5">
          <p className="text-center mt-5 font-bold text-3xl text-blue-700">
            {filteredCoin.id.toUpperCase()}
          </p>
        </div>

        <div
          style={{
            width: "1000px",
            height: "400px",
            margin: "100px auto",
            direction: "ltr",
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chart}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

              <XAxis
                dataKey="date"
                tick={{ fill: "#8884d8", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                domain={["auto", "auto"]}
                tick={{ fill: "#8884d8", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  borderColor: "#3874ff",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#3874ff" }}
                formatter={(value) => {
                  if (value >= 1_000_000)
                    return `$${(value / 1_000_000).toFixed(2)}M`;
                  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
                  return `$${value.toFixed(2)}`;
                }}
              />

              <Legend
                verticalAlign="top"
                wrapperStyle={{ color: "#fff", fontSize: 12 }}
              />

              <Line
                type="monotone"
                dataKey={type}
                stroke="#3874ff"
                strokeWidth={2}
                dot={{ r: 3, stroke: "#3874ff", fill: "#fff" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <Sidebar filteredCoin={filteredCoin} />

          <Link to="/cryptoPrice">
            <span className="flex items-center gap-2 text-blue-600 hover:font-bold hover:txt-blue-800">
              <GoArrowLeft />
              صفحه قبل
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Coin;
