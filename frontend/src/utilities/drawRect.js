export const drawRect = (detections, ctx, video) => { // Add video as a parameter
  // Loop through each prediction
  for (let prediction of detections) {

    // Extract boxes and classes
    const [x, y, width, height] = prediction['bbox']; 
    const text = prediction['class']; 

    // Set styling
    const color = Math.floor(Math.random()*16777215).toString(16);
    ctx.strokeStyle = '#' + color
    ctx.font = '18px Arial';

    // Draw rectangles and text
    ctx.beginPath();   
    ctx.fillStyle = '#' + color
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height); 
    ctx.stroke();

    if (prediction.class == 'apple' || prediction.class == 'banana' || prediction.class == 'peach' || prediction.class == 'pomegranate' || prediction.class == 'strawberry' || prediction.class == 'orange') {
      console.log('fruit detected')
      
      // Capture the current rectangle in the frame as an image
      const image = document.createElement('canvas');
      image.width = width;
      image.height = height;
      image.getContext('2d').drawImage(video, x, y, width, height, 0, 0, width, height);
      return [prediction.class, image]; // Return both the class and the image
    }
  }
  return [null, null]; // Return null values if no cell phone is detected
}