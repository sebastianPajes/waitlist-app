import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css"

const WaitList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({});
  const [locationNotFound, setLocationNotFound] = useState(false);
  const navigate = useNavigate();

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
        setLocation(data.data.location)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
        setLocationNotFound(true);
        setIsLoading(false);
      });
  }, [locationId]);

  const handleJoinQueue = () => {
    // Navigate to the JoinQueueForm page with the locationId
    console.log('calling handleJoinQueue')
    navigate('join-queue')
  };

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
    <div className="waitlist-container">
      <h1>Join the Waitlist</h1>
      <h2>{location.name}</h2>
      <p>{location.defaultWaitingTime}min estimated wait</p>
      <button onClick={handleJoinQueue}>Join the Queue</button>
      <div className="hours-container">
        <h2>Restaurant Hours</h2>
        {Object.entries(location.businessHours).map(([day, hours]) => (
          <div key={day} className="hour-item">
            {`${day} ${hours}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaitList;
