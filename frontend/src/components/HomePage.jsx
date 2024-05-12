import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
// import Pic from '../assets/fruit.png'

function HomePage() {
    const navigate = useNavigate();
  
    const handleOnSubmit = () => {
      navigate("/scan");
    };
  
    return (
      <div className="container">
          <div className="box">
            <text className="safeeats">SafeEats</text>
            <div>
              <text className="subtext">Scan food to get started</text>
            </div>
            <button type="link" onClick={handleOnSubmit}>
              Click to get started
            </button>
          </div>

          <div className='picture'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, nulla! Fuga mollitia commodi consectetur aliquam nesciunt, provident non, iste eaque et deleniti, ea in omnis consequuntur fugiat vel aspernatur nam.
          {/* <img src={Pic}/> */}
          </div>
      </div>
    );
  }
  
export default HomePage