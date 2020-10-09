import React from 'react';
import './Popup.css';

const Popup = ({ popupText }) => {
    return (
        <div className='popup'>
            <p id='popupText'>{popupText}</p>
      </div>
    )
}

export default Popup;