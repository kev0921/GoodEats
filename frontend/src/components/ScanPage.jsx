// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import * as cocossd from "@tensorflow-models/coco-ssd"
import Webcam from "react-webcam";
import "./ScanPage.css";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
// import { drawRect } from "./utilities";
import { drawRect } from "../utilities/drawRect";
import { flexbox } from "@chakra-ui/react";

function ScanPage() {
  console.log('ScanPage is rendering')
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detectedImage, setDetectedImage] = useState(null); // Add this line


  let intervalId; // Declare intervalId at the top level of your component

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    const net = await cocossd.load();

    console.log("Handpose model loaded.");
    
    // Save the interval ID so it can be cleared later
    intervalId = setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    try {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        console.log('detect function is running')
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Set canvas height and width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // 4. TODO - Make Detections
        // e.g. const obj = await net.detect(video);
        const obj = await net.detect(video);
        console.log(obj);

        // Draw mesh
        const ctx = canvasRef.current.getContext("2d");

        // 5. TODO - Update drawing utility
        // drawSomething(obj, ctx)
        const [detectedClass, detectedImage] = drawRect(obj, ctx, video); // Pass video to drawRect and destructure the return value
        if (detectedClass === 'cell phone') {
          clearInterval(intervalId);
          setDetectedImage(detectedImage.toDataURL()); // Convert the canvas to a data URL and save it in state
        }
      }
    } catch (error) {
      console.error("Error in detect function: ", error);
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "0%",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "0%",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />

      {detectedImage && <img src={detectedImage} alt="Detected object" 
        style={{
          position: "absolute",
          display: flexbox,
          zIndex: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "60%",
          marginBottom: "0%",
          paddingTop: "0%",
          paddingLeft: "auto",
          paddingRight: "auto",
          }}/>} {/* Display the image when it's available */}
      </header>
    </div>
  );
}

export default ScanPage;