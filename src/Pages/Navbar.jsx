import image from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
const Navbar = () => {
  const params = useLocation().pathname;
  console.log(params);
  return (
    <>
      <div>
        <nav className="flex h-15 bg-amber-500 text-white justify-between items-center py-10 rounded-b-4xl">
          <div>
            <ul className="flex flex-row float-right pr-10 h-15 font-bold text-center gap-10">
              <li
                className={
                  params === "/currency"
                    ? "hover:text-black leading-15 border-b"
                    : "hover:text-black leading-15 "
                }
              >
                <Link to="/currency">ارز</Link>
              </li>
              <li
                className={
                  params === "/"
                    ? "hover:text-black leading-15 border-b"
                    : "hover:text-black leading-15 "
                }
              >
                <Link to="/">سکه</Link>
              </li>
              <li
                className={
                  params === "/cryptoPrice"
                    ? "hover:text-black leading-15 border-b"
                    : "hover:text-black leading-15 "
                }
              >
                <Link to="/cryptoPrice">ارز دیجیتال</Link>
              </li>
              <li
                className={
                  params === "/cryptoPrice"
                    ? "hover:text-black leading-15 border-b"
                    : "hover:text-black leading-15 "
                }
              >
                <Link to="/films">فیلم</Link>
              </li>
            </ul>
          </div>
          <div className=" pl-10 items-center ">
            <img src={image} className="h-12" />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
