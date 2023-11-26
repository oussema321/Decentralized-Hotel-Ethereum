import React, { useState } from "react";

import { Link } from "react-router-dom";
import Banner from "../Components/Banner/Banner";
import FeaturedRooms from "../Components/FeaturedRooms/FeaturedRooms";
// imports components
import Hero from "../Components/Hero/Hero";
import Services from "../Components/Services/Services";
import getContract from "../services/contract";
function Home() {

  const [contract, setContract] = useState(getContract())


  const handleLogin = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
        console.log("MetaMask Here!");
        window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((result) => {
                console.log(result);
                setContract(getContract())
            })
            .catch((error) => {
                console.log("Could not detect Account");
            });
    } else {
        console.log("Need to install MetaMask");
    }
};






  React.useEffect(() => {
    handleLogin()
    contract.getAllRooms().then((res)=>console.log(res))
  }, )
  return (
    <>
      <Hero>
        <Banner
          title="luxurious rooms"
          subtitle="deluxe rooms starting at $299"
        >
          <Link to="/rooms" className="btn-primary">
            our rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRooms />
    </>
  );
}

export default Home;
