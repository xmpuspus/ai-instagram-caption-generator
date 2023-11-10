import React from 'react';
// import './CaptionDisplay.css'; // You would create a separate CSS file for the caption display

function CaptionDisplay({ caption }) {
  return (
    <div className="CaptionDisplay">
      <p>{caption}</p>
    </div>
  );
}

export default CaptionDisplay;