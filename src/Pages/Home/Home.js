import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import ChooseVehicles from "../../components/ChooseVehicles/ChooseVehicles";
const Home = () => {
  return (
    <div className="background-img">
      <Navbar />
      <ChooseVehicles />
    </div>
  );
};

export default Home;
