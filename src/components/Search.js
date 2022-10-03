import React, { useEffect, useState } from "react";
import Result from "./Result";
import "react-input-range/lib/css/index.css";


function Search() {
  const [data, setData] = useState([]);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error,setError] = useState(false);
  const [originAirPorts, setOriginAirPorts] = useState([]);
  const [destinationAirPorts, setDestinationAirPorts] = useState([]);

  const [btnType, setbtnType] = useState("oneWay");
  const [passengerCount, setPassengerCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

  const [bookReturn, setBookReturn] = useState(false);
  const [originAirPort, setOriginAirPort] = useState("");
  const [destinationAirPort, setDestinationAirPort] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  
  const session=new Session();
  
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [returnFilterData, setReturnFilterData] = useState([]);

  const requestUrl="https://api-uat-ezycommerce.ezyflight.se/api/v1/Airport/OriginsWithConnections/en-US";
  const tenantId="9d7d6eeb25cd6083e0df323a0fff258e59398a702fac09131275b6b1911e202d";

  const bookType = [
    {
      name: "One way",
      id: "oneWay",
    },
    {
      name: "Return",
      id: "return",
    },
  ];

  useEffect(()=>{
    setDataLoading(true);
     const localData=session.get('MY_LOCAL_DATA');

    if(localData){
      setData(localData);
      setDataLoading(false);
      SetOriginAirPortData();
      SetDestinationAirportData();
    }else{
      fetchData();
      SetOriginAirPortData();
      SetDestinationAirportData();
    }

   

  },[isDataLoading])


let originAirPortOptions=null;
let destionationAirPortOptions=null;

if (originAirPorts) {
  originAirPortOptions = originAirPorts.map((el) => <option key={el}>{el}</option>);
}
if (destinationAirPorts) {
  destionationAirPortOptions = destinationAirPorts.map((el) => <option key={el}>{el}</option>);
}

if(data.length===0){
  const MY_LOCAL_DATA=session.get('MY_LOCAL_DATA');
  if(MY_LOCAL_DATA){
    setData(session.get('MY_LOCAL_DATA'));
  }
}

  const handleBookType = (id) => {
    setbtnType(id);
    if (id === "oneWay") {
      setIsSearchClicked(false);
      setBookReturn(false);
      setReturnDate("");
    } else if (id === "return") {
      setIsSearchClicked(false);
      setBookReturn(true);
    }
  };

  const handleCount = (key) => {
    if (key === "add") {
      setPassengerCount(passengerCount + 1);
    } else if (key === "less") {
      if (passengerCount === 1) {
        return;
      }
      setPassengerCount(passengerCount - 1);
    }
  };

  const handleChildrenCount = (key) => {
    if (key === "add") {
      setChildrenCount(childrenCount + 1);
    } else if (key === "less") {
      if(childrenCount===0){
        return;
      }
      setChildrenCount(childrenCount - 1);
    }
  };

  const handleInfantsCount = (key) => {
    if (key === "add") {
      setInfantsCount(infantsCount + 1);
    } else if (key === "less") {
      if(infantsCount===0){
        return;
      }
      setInfantsCount(infantsCount - 1);
    }
  };

  const handleFocus = (e) => {
    e.currentTarget.type = "date";
  };
  const handleBlur = (e) => {
    e.currentTarget.type = "text";
  };

  const fetchData = async () => {
    try {
      const response = await fetch(requestUrl,{
        headers:{
          'Tenant-Identifier':tenantId
        }
      });
     await response.json().then(
        data=>{
          setDataLoading(false);
          setData(data.airports);
          setDataLoading(false);
          session.set('MY_LOCAL_DATA',JSON.stringify(data.airports));
     });
    } catch (error) {
      setError(true);
      console.log("error", error);
    }
  };
 const SetOriginAirPortData=()=>{
  const values=data?.map(item=>item.name);
  setOriginAirPorts(values);
  setOriginAirPort(values?.[0]);
 }
 const SetDestinationAirportData=()=>{ 
  const destinationData=data?.find(item=>item?.name===originAirPort);
  const destinationConnections=destinationData?.connections;
  const destinationAirPorts=destinationConnections?.map(value=>value.name);
  setDestinationAirPorts(destinationAirPorts);
  setDestinationAirPort(destinationAirPorts?.[0]);
 }
  const handleChange=(e)=>{
    const originAirportName=e.target.value;
    setOriginAirPort(originAirportName);
    const destinationData=data?.find(item=>item?.name===originAirportName);
    const destinationConnections=destinationData?.connections;
    const destinationAirPorts=destinationConnections.map(value=>value.name);
    setDestinationAirPorts(destinationAirPorts);
    setDestinationAirPort(destinationAirPorts?.[0]);
   
  }
  
  const handleDestinationAirPort=(e)=>{
    setDestinationAirPort(e.target.value);
  }

  const handleSearch = () => {
    if (bookReturn && !returnDate) {
      alert("Return date can't be empty!");
    } else if (!originAirPort) {
      alert("Origin AirPort can't be empty!");
    } else if (!destinationAirPort) {
      alert("Destination AirPort can't be empty!");
    } else if (!departureDate) {
      alert("Departure date can't be empty!");
    }
    if (originAirPort && destinationAirPort && departureDate) {
      setIsSearchClicked(true);
      if (bookReturn && returnDate) {
      }
    }
  };

  return (
  
     <div>
      {isDataLoading&&<div>Loading...</div>}
      {error&&<div style={{color:'red'}}>Exception While Fetching Data</div>}
      {!isDataLoading&&
      <div className="row mt-4 ml-5 mr-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="card">
                <div className="card-body">
                  <div className="btn-group d-flex justify-content-center">
                    {bookType.map((type) => {
                      return (
                        <button
                          type="button"
                          className={`btn ${
                            btnType === type.id ? "active_btn" : ""
                          }`}
                          key={type.id}
                          onClick={() => handleBookType(type.id)}
                        >
                          {type.name}
                        </button>
                      );
                    })}
                  </div>
                  <select className="form-control mt-4"
                      onChange={(e) => handleChange(e)}>
                      {originAirPortOptions}
                  </select>
                  <select className="form-control mt-4"
                      onChange={(e) => handleDestinationAirPort(e)}>
                      {destionationAirPortOptions}
                  </select>
                
                  <input
                    type="text"
                    placeholder="Enter departure date"
                    className="form-control mt-2"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                  {btnType === "return" ? (
                    <input
                      type="text"
                      placeholder="Enter return date"
                      className="form-control mt-2"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  ) : null}
                  <div
                    className="d-flex justify-content-center mt-2"
                    style={{ alignItems: "center" }}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary mr-2"
                      onClick={() => handleCount("less")}
                    >
                      -
                    </button>
                    <div className="text-muted">
                      {passengerCount} Adults    
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary ml-2"
                      onClick={() => handleCount("add")}
                    >
                      +
                    </button>
                  </div>
                  
                  <div
                    className="d-flex justify-content-center mt-2"
                    style={{ alignItems: "center" }}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary mr-2"
                      onClick={() => handleChildrenCount("less")}
                    >
                      -
                    </button>
                    <div className="text-muted">
                      {childrenCount} Children
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary ml-2"
                      onClick={() => handleChildrenCount("add")}
                    >
                      +
                    </button>
                  </div>


                  <div
                    className="d-flex justify-content-center mt-2"
                    style={{ alignItems: "center" }}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary mr-2"
                      onClick={() => handleInfantsCount("less")}
                    >
                      -
                    </button>
                    <div className="text-muted">
                      {infantsCount} Infants
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary ml-2"
                      onClick={() => handleInfantsCount("add")}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn search_btn"
                      onClick={handleSearch}
                    >
                      <b>Display Search Form</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isSearchClicked? (
               <div className="col-md-8">
               <Result
                 originAirPort={originAirPort}
                 destinationAirPort={destinationAirPort}
                 isSearchClicked={isSearchClicked}
                 bookReturn={bookReturn}
                 returnFilterData={returnFilterData}
                 passengerCount={passengerCount}
                 childrenCount={childrenCount}
                 infantsCount={infantsCount}
                 departureDate={departureDate}
                 returnDate={returnDate}
               />
               </div>  
                  ) : null}
        
        </div>
}
      </div>
     
  );
        
}

export default Search;


class Session extends Map {
  set(id, value) {
    if (typeof value === 'object') value = JSON.stringify(value);
    sessionStorage.setItem(id, value);
  }

  get(id) {
    const value = sessionStorage.getItem(id);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
}