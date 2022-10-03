import React from 'react';

function TicketCard(props) {
  const { originAirPort,
     destinationAirPort, 
     passengerCount,
     childrenCount,
     infantsCount,
     departureDate,
     returnDate
    } = props;

  return (
    <>
     <div>
        <span style={{margin:'20px'}}>
          <b>Origin AirPort</b>
        </span>
        <span>
         {originAirPort}
        </span>
     </div>
     <div>
        <span style={{margin:'20px'}}>
          <b>Destination AirPort</b>
        </span>
        <span>
         {destinationAirPort}
        </span>
     </div>
     <div>
        <span style={{margin:'20px'}}>
          <b>Number Of Adults</b>
        </span>
        <span>
         {passengerCount}
        </span>
     </div>
     <div>
        <span style={{margin:'20px'}}>
          <b>Number Of Children</b>
        </span>
        <span>
         {childrenCount}
        </span>
     </div>
     <div>
        <span style={{margin:'20px'}}>
          <b>Number Of Infants</b>
        </span>
        <span>
         {infantsCount}
        </span>
     </div>
     <div>
        <span style={{margin:'20px'}}>
          <b>Departure Date</b>
        </span>
        <span>
         {departureDate}
        </span>
     </div>
     {returnDate?(     <div>
        <span style={{margin:'20px'}}>
          <b>Return Date</b>
        </span>
        <span>
         {returnDate}
        </span>
     </div>):null}

    </>
  );
}

export default TicketCard;
