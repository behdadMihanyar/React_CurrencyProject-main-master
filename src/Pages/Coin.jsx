import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import { GoArrowLeft } from "react-icons/go";
import Sidebar from "../components/Sidebar";

const Coin = () => {
  const { coins } = useCoinContext();
  const [type, setType] = useState("prices");
  const [coin, setCoin] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getCoin = async () => {
      try {
        const response = await fetch(getCoinById(id));
        const data = await response.json();
        setCoin(data[type]);
      } catch (error) {
        console.error("Failed to fetch coin data:", error);
      }
    };
    getCoin();
  }, [id, type]);

  if (!coin) return null;

  const chartData = coin.map(([timestamp, value]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    [type]: value,
  }));

  const filteredCoin = coins.find((coin) => coin.id === id);

  return (
    <div className="overflow-x-scroll scrollbar-hide">
      <div className="w-full">
        <div className="flex flex-col items-center mt-5">
          <p className="text-center mt-5 font-bold text-3xl text-white">
            {filteredCoin?.id.toUpperCase()}
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
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

              <XAxis
                dataKey="date"
                tick={{ fill: "#ffffff", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                domain={["auto", "auto"]}
                tick={{ fill: "#ffffff", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  borderColor: "#3874ff",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#ffffff" }}
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
                stroke="#ffd900"
                strokeWidth={2}
                dot={false}
                activeDot={false}
              />
            </LineChart>
          </ResponsiveContainer>

          <Sidebar filteredCoin={filteredCoin} />

          <Link to="/cryptoPrice">
            <span className="flex items-center gap-2 text-white">
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
