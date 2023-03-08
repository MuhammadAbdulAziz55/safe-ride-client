import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/authProvider/AuthProvider";

const Logout = () => {
  const { logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((e) => console.error(e));
  };
  return (
    <>
      <Navbar />
      <div className="flex  justify-center items-center align-middle">
        <button
          onClick={handleLogOut}
          className="inline-block text-base px-4 py-2 leading-none border rounded bg-orange-500 text-white border-orange-500 hover:border-transparent hover:text-gray-200 hover:bg-orange-600  "
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default Logout;
