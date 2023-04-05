import React, { useState } from "react";
import PhoneNumberInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../App.css"
import { useNavigate, useParams } from "react-router";

const JoinQueueForm = ({ restaurantName }) => {
  const [groupSize, setGroupSize] = useState(1);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreeSMS, setAgreeSMS] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { locationId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted form data:", { groupSize, name, phoneNumber, agreeSMS });
    // Handle form submission here
    console.log(locationId)
    fetch(`${process.env.REACT_APP_API}/api/internal/locations/${locationId}/parties/waitlist`, {
        method: 'POST',
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            source: 'customer',
            customer: {
                name,
                phone: phoneNumber,
                partySize: groupSize,
                accepted: false
            }
        })
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.message !== 'Success') {
            throw new Error(data.message);
          }
          navigate('confirmation')
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(error.message)
        });
  };

  return (
    <div className="join-queue-form">
      <h1>Join the Waitlist</h1>
      <h2>{restaurantName}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Group Size:
          <div className="group-size-buttons">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setGroupSize(size)}
                className={`group-size-button ${groupSize === size ? "selected" : ""}`}
              >
                {size}
              </button>
            ))}
          </div>
        </label>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Phone Number:
          <div className="phone-number-input">
            <PhoneNumberInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              defaultCountry="PE"
            />
          </div>
        </label>
        <label>
          <input
            type="checkbox"
            checked={agreeSMS}
            onChange={(e) => setAgreeSMS(e.target.checked)}
          />
          I agree to receive transactional SMS messages
        </label>
        <button type="submit">Join the Queue</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default JoinQueueForm;
