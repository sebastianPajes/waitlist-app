import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const WaitList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [waitTime, setWaitTime] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [businessHours, setBusinessHours] = useState({});
  const [locationNotFound, setLocationNotFound] = useState(false);

  const { locationId } = useParams();

  useEffect(() => {
    if (!locationId) {
      setLocationNotFound(true);
      setIsLoading(false);
      return;
    }
    fetch(`${process.env.REACT_APP_API}/api/internal/locations/${locationId}`, {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Location not found");
        }
        return response.json();
      })
      .then((data) => {
        setWaitTime("15-20");
        setRestaurantName(data.data.location.name);
        setBusinessHours(data.data.location.businessHours);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
        setLocationNotFound(true);
        setIsLoading(false);
      });
  }, [locationId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (locationNotFound) {
    return (
      <div>
        <h1>Not Found</h1>
        <p>The location you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Join the Waitlist</h1>
      <h2>{restaurantName}</h2>
      <p>{waitTime}min estimated wait</p>
      <button>Join the Queue</button>
      <h2>Restaurant Hours</h2>
      <ul>
        {Object.entries(businessHours).map(([day, hours]) => (
          <li key={day}>{`${day} ${hours}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default WaitList;
