import image from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div>
        {!show && (
          <button
            className="p-3 absolute top-4 left-0 z-50"
            onClick={() => setShow(true)}
          >
            <CiMenuBurger color="white" size={30} />
          </button>
        )}

        <div
          className={`fixed top-0 left-0 w-full h-screen bg-sky-950 z-40 flex items-center justify-center transform transition-all duration-500 ease-in-out ${
            show
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col items-center justify-center space-y-4 text-2xl text-white">
            <li>
              <Link to="/currency" onClick={() => setShow((prev) => !prev)}>
                ارز
              </Link>
            </li>
            <li>
              <Link to="/gold" onClick={() => setShow((prev) => !prev)}>
                سکه
              </Link>
            </li>
            <li>
              <Link to="/cryptoPrice" onClick={() => setShow((prev) => !prev)}>
                ارز دیجیتال
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => setShow((prev) => !prev)}>
                فیلم
              </Link>
            </li>
            <li
              className="mt-3 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              <IoArrowBack size={28} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
