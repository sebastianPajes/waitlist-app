import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../App.css"

const PartyTracker = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [parties, setParties] = useState([]);
  const [waitingTime, setWaitingTime] = useState(0);
  const [currentParty,  setCurrentParty] = useState({});
  const [isDeleted, setDeleted] = useState(false);
  const { partyId, locationId } = useParams();

  useEffect(() => {
    if (!partyId || !locationId) {
      setIsLoading(false);
      return;
    }

    fetch(`${process.env.REACT_APP_API}api/internal/locations/${locationId}/parties/waitlist`, {
      method: 'GET',
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Parties not found');
        }
        return response.json();
      })
      .then((data) => {
        
        const currentParty = data.data.parties.find(party => party.sk === `type#waitlist-id#${partyId}`);

    
        if (!currentParty || currentParty.deleted || currentParty.seated) {
          console.error('Current party not found');
          setIsLoading(false);
          return;
        }
        

        setCurrentParty(currentParty);
        
        const currentPartyCreateDate = new Date(currentParty.createDate);
        const filteredParties = data.data.parties.filter(party => new Date(party.createDate) < currentPartyCreateDate && !party.deleted && !party.seated);
        
        filteredParties.sort((a, b) => {
          const dateA = new Date(a.createDate);
          const dateB = new Date(b.createDate);
          return dateA - dateB;
        });
        
        setParties(filteredParties);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching party data:', error);
        setIsLoading(false);
      });
  }, [partyId]);

  useEffect(() => {
    if (!currentParty) return;

    const calculateWaitingTime = () => {
      const timeDifference = new Date() - new Date(currentParty.createDate);
      setWaitingTime(Math.floor(timeDifference / 60000));
    };
  
    calculateWaitingTime();
    const timer = setInterval(() => {
      calculateWaitingTime();
    }, 60000); // Update every minute
  
    // Clean up the timer when the component is unmounted
    return () => {
      clearInterval(timer);
    };
  }, [currentParty]);

 
  const handleDeleteClick = () => {
    fetch(`${process.env.REACT_APP_API}api/internal/locations/${locationId}/parties/waitlist/${partyId}`, {
      method: "DELETE",
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Parties not found');
          }
          return response.json();
      // handle response
    }).then(data => {
        console.log(data)
        setDeleted(true);
    })
    .catch(error => {
        console.log(error)
      // handle error
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isDeleted) {
    return <div>{`Fuiste eliminado de la lista de espera exitosamente. Gracias por avisar :)`}</div>;
   }


//   if (!parties.length) {
//     return <div>No parties found</div>;
//   }

return (
    <div className="party-tracker-container">
        <h1>Seguimiento</h1>

        {/* Current party info */}
        <h2>Tu grupo</h2>
        <div className="party-info">
            <p>A Nombre de: {currentParty.customer.name}</p>
            <p>Hora añadido: {new Date(currentParty.createDate).toLocaleString()}</p>
            <p>Tiempo estimado de espera: {currentParty.waitingTime} minutes</p>
            <p>Tiempo esperado: {waitingTime} minutos</p>
            <button onClick={handleDeleteClick}>Cancelar</button>
        </div>

        {/* Parties ahead */}
        <h3>Grupos adelante de ti:</h3>
        <div className="parties-container">
            {parties.map((party, index) => (
            <div key={party.sk} className="party-info">
                <h4>{index + 1}. {party.customer.name}</h4>
                <p>Hora añadido: {new Date(party.createDate).toLocaleString()}</p>
                <p>Tiempo de espera estimado: {party.waitingTime} minutes</p>
                <p>Tamañol del grupo: {party.customer.partySize}</p>
            </div>
            ))}
        </div>
    </div>
)

};

export default PartyTracker;
