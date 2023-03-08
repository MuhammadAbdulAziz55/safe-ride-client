import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
const center = { lat: 23.777176, lng: 90.399452 };

const Destination = () => {
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
  return (
    <>
      <Navbar />
      <div className="mx-[5%] mt-10">
        {/* .........hotel info section start......... */}
        <div className="flex">
          <div className=" basis-[25%] mr-20">
            {/* image part */}
            {/* {hotels.map((hotel) => {
            return (
              <div className="flex mb-8">
                <div className="mr-4">
                  <img className="w-60" src={hotel.img} alt="hotel" />
                </div>
                <div>
                  <div className="text-lg font-semibold pb-2">
                    {hotel.room_title}
                  </div>
                  <p className="text-sm text-gray-600">{hotel.room_Info}</p>
                </div>
              </div>
            );
          })} */}

            <div className="bg-white shadow-lg rounded-lg p-4 w-96 lg:ml-20">
              <h2 className="text-2xl font-medium mb-6 text-center">
                Find Your Destination
              </h2>
              <div className="mb-4">
                <label className="block text-gray-500 text-sm font-bold mb-2">
                  Pick From
                </label>
                <Autocomplete>
                  <input
                    className="booking placeholder: italic placeholder:text-black font-bold border border-gray-100 bg-gray-200 rounded-lg py-2 px-4 w-full "
                    id="destination"
                    type="text"
                    required
                    ref={pickFromRef}
                  />
                </Autocomplete>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-500 font-bold mb-2 text-sm"
                  htmlFor="destination"
                >
                  Pick To
                </label>
                <Autocomplete>
                  <input
                    className="booking placeholder: italic placeholder:text-black border border-gray-100 bg-gray-200 rounded-lg py-2 px-4 w-full font-bold"
                    type="text"
                    required
                    ref={pickToRef}
                  />
                </Autocomplete>
              </div>

              <button
                onClick={calculateRoute}
                className="bg-btnBooking text-white font-bold py-2 px-4 rounded-lg bg-orange-400 hover:bg-orange-500 w-full cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
          {/* .........hotel info section end......... */}

          {/* map section start */}
          <div className="basis-[73%] ">
            <GoogleMap
              center={center}
              zoom={10}
              mapContainerStyle={{
                width: "600px",
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

export default Destination;
