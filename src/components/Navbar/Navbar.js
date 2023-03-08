import React, { useContext, useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authProvider/AuthProvider";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  let Links = [
    { name: "  Home", link: "/" },
    { name: "Destination", link: "/destination" },
    { name: "  Blog", link: "/blog" },
    { name: "Contact", link: "/contact" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div
      className="shadow-md w-full px-[8%]
      "
    >
      <div className="md:flex items-center justify-between bg-transparent py-4 md:px-10 px-7 relative ">
        <Link to="/">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
            <span className="text-3xl text-black mr-1 ">
              <AiFillCar />
            </span>
            SAF<span style={{ color: "hotPink", marginRight: "10px" }}>E</span>{" "}
            RID
            <span style={{ color: "hotPink" }}>E</span>
          </div>
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <HiX /> : <HiMenu />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:bg-transparent bg-orange-500 md:static  md:z-auto z-10 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li
              key={link.name}
              className="md:ml-8 text-base font-medium md:my-0 my-7"
            >
              <Link to={link.link}>{link.name}</Link>
            </li>
          ))}

          <div className="md:pl-8">
            {user?.uid ? (
              <>
                <Link to="/logout">
                  <span className="text-black font-bold">
                    {user?.displayName}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="inline-block text-base px-4 py-2 leading-none border rounded bg-orange-500 text-white border-orange-500 hover:border-transparent hover:text-gray-200 hover:bg-orange-600 ">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
