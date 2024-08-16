import React from "react";
import "./Popup.css";

const Popup = ({ showPopup, setShowPopup }) => {
  const handleYesClick = () => {
    // Handle 'Yes' button click
    // You can add your custom logic here
    setShowPopup(false);
  };

  const handleNoClick = () => {
    // Handle 'No' button click
    // You can add your custom logic here
    setShowPopup(false);
  };

  //   if (!showPopup) {
  //     return null;
  //   }

  return (
    <div className="popup">
      <div
        className="popup-content"
        style={{ backgroundColor: "rgb(230, 46, 0)" }}
      >
        <h2>Confirm Selection</h2>
        <p>GPS co-ordinates found in the image </p>
        <p>Do u want to use it? </p>
        <div className="popup-buttons">
          <button onClick={handleYesClick}>Yes</button>
          <button onClick={handleNoClick}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
