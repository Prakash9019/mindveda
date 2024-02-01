import React, { useState } from 'react';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="popup-container">
        <p>
            Helllllo
        </p>
      <button onClick={togglePopup}>Open Pop-up</button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Pop-up Content</h2>
            <p>This is the content of the pop-up box.</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
