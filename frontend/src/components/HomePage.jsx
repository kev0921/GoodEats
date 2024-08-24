import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Pic from '../assets/fruit.png' 

function HomePage() {
    const navigate = useNavigate();
  
    const handleOnSubmit = () => {
      navigate("/scan");
    };
  
    return (
      <div className="container">
          <div className="box">
            <header className="safeeats">GoodEats</header>
            <div>
              <div className="subtext">Scan your fruit to determine their freshness</div>
            </div>
            <button type="link" onClick={handleOnSubmit} style={{marginTop: "2%", background: "blue"}}>
              Click to start scanning
            </button>
          </div>

          <div className='picture'>
          <img src={Pic} style={{width: "35%", height: "auto", marginRight: "auto", marginLeft: "auto"}}/>
          </div>
      </div>
    );
  }
  
export default HomePage