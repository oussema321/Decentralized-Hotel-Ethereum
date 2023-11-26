import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Banner from "../Components/Banner/Banner";
import { RoomContext } from "../Context/Context";
import StyledHero from "../Components/StyledHero/StyledHero";
import "./SingleRoom.css"; 
const SingleRoom = () => {
  const { getRoom } = useContext(RoomContext);
  const { slug } = useParams();
  const room = getRoom(slug);

  const [reservationData, setReservationData] = useState({
    name: "",
    email: "",
    additionalInfo: "",
    numberOfDays: 1, // Default to 1 day
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    // Handle reservation submission logic here
    console.log("Reservation submitted:", reservationData);
    // You can add further logic to handle the reservation, such as sending data to a server
  };

  if (!room) {
    return (
      <div className="error">
        <h3>no such room could be found!</h3>
        <Link to="/rooms" className="btn-primary">
          back to rooms
        </Link>
      </div>
    );
  }

  const {
    name,
    description,
    capacity,
    size,
    price,
    breakfast,
    pets,
    images,
  } = room;

  const [mainImg, ...defaultImg] = images;

  return (
    <>
      <StyledHero img={mainImg || defaultImg[0]}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>

      <section className="single-room">
        <div className="single-room-images">
          {defaultImg.map((item, index) => {
            return <img key={index} src={item} alt={name} />;
          })}
        </div>

        <div className="single-room-info">
          <article className="desc">
            <h3>details:</h3>
            <p>{description}</p>
          </article>

          <article className="info">
            <h3>information:</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQFT</h6>
            <h6>
              max capacity :{" "}
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="reservation-form">
        <h3>Reservation Form</h3>
        <form onSubmit={handleReservationSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={reservationData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={reservationData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfDays">Number of Days to Reserve:</label>
            <input
              type="number"
              id="numberOfDays"
              name="numberOfDays"
              value={reservationData.numberOfDays}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Information:</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={reservationData.additionalInfo}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn-primary">
            Submit Reservation
          </button>
        </form>
      </section>
    </>
    
  );
};

export default SingleRoom;
