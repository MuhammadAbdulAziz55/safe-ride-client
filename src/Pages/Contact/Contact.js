import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
const center = { lat: 23.777176, lng: 90.399452 };

const Contact = () => {
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
        {/* .........Contact info section start......... */}
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

            <div className="bg-pink-500 shadow-lg rounded-lg p-4 w-96 lg:ml-20">
              <h2 className="text-2xl font-medium mb-6 text-center">
                Our Contacts
              </h2>
              <p className="mb-4">
                Give us a call or drop by anytime, we endeavour to answer all
                enquiries within 24 hours on business days. We will be happy to
                answer your questions.
              </p>
              <div className="mb-4">
                OUR ADDRESS:{" "}
                <span>
                  {" "}
                  <p>P-28, Noorjahan Road, Mohammedpur, Dhaka-1207 </p>
                </span>
              </div>
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

export default Contact;
