import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ChooseVehicles.css";
const ChooseVehicles = () => {
  const [chooseVehicles, setChooseVehicles] = useState([]);
  useEffect(() => {
    fetch("https://safe-ride-server.vercel.app/chooseVehicles")
      .then((res) => res.json())
      .then((data) => setChooseVehicles(data));
  }, []);
  return (
    <>
      <div className="container flex px-[10%]">
        {chooseVehicles.map((vehicle) => {
          return (
            <div key={vehicle.id}>
              {/* if we click the  below link it will go to the VehiclesDetailsInfo page */}
              <Link to={`/vehicles-details-info/${vehicle.id}`}>
                <div className="travel-items  md:mr-6 lg:mr-10 xl:mr-11 2xl:mr-28">
                  <div className="wrapper ">
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={vehicle.img}
                      alt=""
                    />
                    <h2 className="image-text text-center">{vehicle.name}</h2>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChooseVehicles;
