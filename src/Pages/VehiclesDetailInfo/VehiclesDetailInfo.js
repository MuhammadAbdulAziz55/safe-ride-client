import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useLoaderData } from "react-router-dom";
import peopleIcon from "../../assets/icons/peopleicon.png";
const center = { lat: 23.777176, lng: 90.399452 };

const VehiclesDetailInfo = () => {
  const [showResults, setShowResults] = useState(false);
  const [fromSearchTerm, setFromSearchTerm] = useState("");
  const [toSearchTerm, setToSearchTerm] = useState("");
  const [formValues, setFormValues] = useState(null);
  const formRef = useRef(null);

  const handleSearchResult = () => {
    setShowResults(true);
  };

  const handleFromInputChange = (event) => {
    setFromSearchTerm(event.target.value);
  };

  const handleToInputChange = (event) => {
    setToSearchTerm(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    // handle form submission
    setFormValues({
      fromSearchTerm,
      toSearchTerm,
    });
    formRef.current.reset();
  }

  const isDisabled = fromSearchTerm.trim() === "" || toSearchTerm.trim() === "";

  //   vehicle info data
  const selectedInfo = useLoaderData();
  const { infoA, infoB, infoC } = selectedInfo;

  // map functionality  start
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const [directionResponse, setDirectionResponse] = useState(null);
  // const [distance, setDistance] = useState("");

  // const [duration, setDuration] = useState("");

  const pickFromRef = useRef();

  const pickToRef = useRef();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  async function calculateRoute() {
    if (pickFromRef.current.value === "" || pickToRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: pickFromRef.current.value,
      destination: pickToRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(results);
    // setDistance(results.routes[0].legs[0].distance.text);
    // setDuration(results.routes[0].legs[0].duration.text);
  }

  // function clearRoute() {
  //   setDirectionResponse(null);
  //   setDistance("");
  //   setDuration("");
  //   pickFromRef.current.value = "";
  //   pickToRef.current.value = "";
  // }

  // ............  map functionality end..........

  return (
    <>
      <Navbar />
      <div className="mx-[5%] mt-4">
        {/* .........Search destination and Vehicles info section start.........*/}
        <div className="flex md:flex-row lg:flex-row xl:flex-row 2xl:flex-row flex-col">
          <div className=" basis-[18%] mr-20">
            <div className="bg-white shadow-lg rounded-lg p-4 w-72 lg:ml-20">
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-500 text-sm font-bold mb-2">
                    Pick From
                  </label>

                  <input
                    className="booking placeholder: italic placeholder:text-black font-bold border border-gray-100 bg-gray-200 rounded-lg py-1 px-4 w-full "
                    id="destination"
                    type="text"
                    required
                    ref={pickFromRef}
                    value={fromSearchTerm}
                    onChange={handleFromInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-500 font-bold mb-2 text-sm"
                    htmlFor="destination"
                  >
                    Pick To
                  </label>

                  <input
                    className="booking placeholder: italic placeholder:text-black border border-gray-100 bg-gray-200 rounded-lg py-1 px-4 w-full font-bold"
                    type="text"
                    required
                    ref={pickToRef}
                    value={toSearchTerm}
                    onChange={handleToInputChange}
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSearchResult}
                  // onClick={calculateRoute }
                  disabled={isDisabled}
                  className={`bg-btnBooking text-white font-bold py-2 px-4 rounded-lg bg-orange-400 hover:bg-orange-500 w-full cursor-pointer ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  } `}
                >
                  Search
                </button>
              </form>
            </div>

            {/* search result section start */}
            {showResults && (
              <div className="bg-white shadow-lg rounded-lg p-4 w-72 lg:ml-20 mt-4">
                <div className="items-center border border-gray-100 bg-pink-500 rounded-lg py-2 px-4 w-full font-bold">
                  {formValues && (
                    <p>
                      {formValues.fromSearchTerm} to {formValues.toSearchTerm}
                    </p>
                  )}
                </div>

                <div className="booking flex items-center border border-gray-100 bg-gray-200 rounded-lg py-2 px-4 w-full font-semibold text-sm">
                  <img
                    style={{ width: "40px", height: "40px" }}
                    src={infoA.img}
                    alt=""
                    className="mr-3"
                  />
                  <p className="mr-6">{infoA.name}</p>
                  <img
                    alt=""
                    src={peopleIcon}
                    style={{ width: "25px", height: "25px" }}
                  />
                  <p className="mr-6">{infoA.people}</p>
                  <p> $ {infoA.rideCost}</p>
                </div>

                <div className="booking flex items-center border border-gray-100 bg-gray-200 rounded-lg py-2 px-4 w-full font-semibold text-sm">
                  <img
                    style={{ width: "40px", height: "40px" }}
                    src={infoB.img}
                    alt=""
                    className="mr-3"
                  />
                  <p className="mr-6">{infoB.name}</p>
                  <img
                    alt=""
                    src={peopleIcon}
                    style={{ width: "25px", height: "25px" }}
                  />
                  <p className="mr-6">{infoB.people}</p>
                  <p> $ {infoB.rideCost}</p>
                </div>

                <div className="booking flex items-center border border-gray-100 bg-gray-200 rounded-lg py-2 px-4 w-full font-semibold text-sm">
                  <img
                    style={{ width: "40px", height: "40px" }}
                    src={infoC.img}
                    alt=""
                    className="mr-3"
                  />

                  <p className="mr-6 ">{infoC.name}</p>
                  <img
                    alt=""
                    src={peopleIcon}
                    style={{ width: "25px", height: "25px" }}
                  />
                  <p className="mr-6">{infoC.people}</p>
                  <p> $ {infoC.rideCost}</p>
                </div>
              </div>
            )}
            {/* search result section end */}
          </div>

          {/* .........Search destination and Vehicles info section end........ */}

          {/* map section start */}
          <div className="basis-[70%]  ">
            <GoogleMap
              center={center}
              zoom={10}
              mapContainerStyle={{
                width: "90%",
                height: "465px",
                borderRadius: "10px",
              }}
            >
              {directionResponse && (
                <DirectionsRenderer directions={directionResponse} />
              )}
            </GoogleMap>
          </div>
        </div>
        {/* map section end */}
      </div>
    </>
  );
};

export default VehiclesDetailInfo;
