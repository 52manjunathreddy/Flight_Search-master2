import React from "react";
import forwardArrow from "../assets/Forward.svg";
import TicketCard from "./TicketCard";



function Result(props) {
  const {
    originAirPort,
    destinationAirPort,
    isSearchClicked,
    bookReturn,
    returnFilterData,
    passengerCount,
    childrenCount,
    infantsCount,
    departureDate,
    returnDate
  } = props;

  return (
    <div className="card" style={{ height: "100%" }}>
      <div className="card-body">
        {!isSearchClicked  ? (
        null
        ) : (
          <div>
            <div className="mb-4">
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Search Form Details
                <span>
                  <img src={forwardArrow} alt="arrow" className="ml-2" />
                </span>
              </div>
            </div>
            <div>
              {bookReturn && isSearchClicked ? (
                <div className="row">
                  <div className="col">
                    <div style={{ color: "deepskyblue", fontWeight: "bold" }}>
                      One Way
                    </div>
                    <TicketCard
                      originAirPort={originAirPort}
                      destinationAirPort={destinationAirPort}
                      passengerCount={passengerCount}
                      childrenCount={childrenCount}
                      infantsCount={infantsCount}
                      departureDate={departureDate}
                      returnDate={returnDate}
                    />
                  </div>
                  {returnFilterData.length && returnFilterData ? (
                    <div className="col">
                      <div style={{ color: "deepskyblue", fontWeight: "bold" }}>
                       Two Way
                      </div>
                      <TicketCard
                      originAirPort={originAirPort}
                      destinationAirPort={destinationAirPort}
                      passengerCount={passengerCount}
                      childrenCount={childrenCount}
                      infantsCount={infantsCount}
                      departureDate={departureDate}
                      returnDate={returnDate}
                    />
                    </div>
                  ) : null}
                </div>
              ) : (
                <>
                  <div style={{ color: "deepskyblue", fontWeight: "bold" }}>
                    One Way
                  </div>
                  <TicketCard
                      originAirPort={originAirPort}
                      destinationAirPort={destinationAirPort}
                      passengerCount={passengerCount}
                      childrenCount={childrenCount}
                      infantsCount={infantsCount}
                      departureDate={departureDate}
                      returnDate={returnDate}
                    />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
