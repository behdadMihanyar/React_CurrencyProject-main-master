/* eslint-disable react/prop-types */
const Sidebar = ({ filteredCoin: coin }) => {
  return (
    <div className=" bg-gray-800 w-full p-3 rounded-3xl mt-3 mb-3 cursor-default max-sm:hidden">
      <div className="flex flex-row text-[18px] text-white justify-between text-center px-3">
        <div>
          <p className="font-bold text-amber-300">رتبه</p>
          <p>{coin.market_cap_rank}</p>
        </div>
        <div>
          <p className="font-bold text-amber-300">حجم بازار</p>
          <p>$ {coin.market_cap.toLocaleString()}</p>
        </div>
        <div>
          <p className="font-bold text-amber-300">تغییر قیمت </p>
          <p>$ {coin.price_change_24h.toLocaleString()}</p>
        </div>
        <div>
          <p className="font-bold text-amber-300">قیمت</p>
          <p>$ {coin.current_price.toLocaleString()}</p>
        </div>
        <div>
          <p className="font-bold text-amber-300">نام</p>
          <p>{coin.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
