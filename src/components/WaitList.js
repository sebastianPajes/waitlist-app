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

  const daysOfWeek = {
    "Monday": "Lunes",
    "Tuesday": "Martes",
    "Wednesday": "Miércoles",
    "Thursday": "Jueves",
    "Friday": "Viernes",
    "Saturday": "Sábado",
    "Sunday": "Domingo"
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (locationNotFound) {
    return (
      <div>
        <h1>No encontrado</h1>
        <p>La ubicación que busca no existe.</p>
      </div>
    );
  }

  return (
  <div className="waitlist-container">
    <h1>Unirse a la lista de espera</h1>
    <h2>{location.name}</h2>
    <p>Tiempo estimado de espera: {location.defaultWaitingTime} minutos</p>
    <button onClick={handleJoinQueue}>Unirse a la cola</button>
    <div className="hours-container">
      <h2>Horario del restaurante</h2>
      {Object.entries(location.businessHours)
        .sort(([day1], [day2]) => {
          const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
          return days.indexOf(day1) - days.indexOf(day2);
        })
        .map(([day, hours]) => (
          <div key={day} className="hour-item">
            {`${daysOfWeek[day]}: ${hours}`}
          </div>
        ))}
    </div>

  </div>
  );
};

export default WaitList;
