import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd"
import Webcam from "react-webcam";
import "./ScanPage.css";
import { drawRect } from "../utilities/drawRect";
import { flexbox } from "@chakra-ui/react";

function ScanPage() {
  console.log('ScanPage is rendering')
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detectedImage, setDetectedImage] = useState(null); 
  const [responseData, setResponseData] = useState(null); 

  const rescan = () => {
    setDetectedImage(null);  // Clear the detected image
    setResponseData(null);  // Clear the response data
    clearInterval(intervalId);
    runCoco();  // Restart the object detection
  };

  let intervalId; // Declare intervalId at the top level of your component

  // Main function
  const runCoco = async () => {
    // Load network 
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

        // Make Detections
        const obj = await net.detect(video);
        console.log(obj);

        // Draw mesh
        const ctx = canvasRef.current.getContext("2d");

        // Update drawing utility
        const [detectedClass, detectedImage] = drawRect(obj, ctx, video); // Pass video to drawRect and destructure the return value
        if (detectedClass === 'peach' || detectedClass === 'pomegranate' || detectedClass === 'strawberry' || detectedClass === 'apple' || detectedClass === 'banana' || detectedClass === 'orange') {
          clearInterval(intervalId);  // Stops the interval running the object detection
          const dataUrl = detectedImage.toDataURL();  // Converts the image of the detected fruit to a data URL
          setDetectedImage(dataUrl); // Convert the canvas to a data URL and save it in state
          // Send an http request to the python backend
          const fruit = detectedClass;
          let blob = await fetch(dataUrl).then(r => r.blob());  // Turn the image into a Blob object

          let formData = new FormData();
          formData.append("image", blob);  // Append the image to the FormData object to be sent to backend as a POST request

          fetch(`http://127.0.0.1:5000/predict/${fruit}`, {  // Send a POST request to the backend
            method: 'POST',
            body: formData
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {  // Save the response data in state so we can display it to the frontend
            setResponseData(data);
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        } 
      }
    } catch (error) {
      console.error("Error in detect function: ", error);
    }
  };

  useEffect(()=>{runCoco()},[]);  // run the object detection model when the component first renders

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
          marginTop: "60%",
          }}/>} {/* Display the image when it's available */}

      {responseData && <div 
        style={{position: "absolute",
          display: flexbox,
          zIndex: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "40%",
          marginBottom: "0%",
          paddingTop: "0%",
          paddingLeft: "auto",
          paddingRight: "auto",
          color: "white",
          }}>{responseData.result} 
        </div>} {/* Display the response data when it's available */}

      {responseData && <button 
            style={{
              position: "absolute",
              display: flexbox,
              zIndex: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "80%",
              marginBottom: "0%",
              paddingLeft: "auto",
              paddingRight: "auto",
            }}
            onClick={rescan}
          >
          Rescan
        </button>} {/* Display the response data when it's available */}
      </header>
    </div>
  );
}

export default ScanPage;