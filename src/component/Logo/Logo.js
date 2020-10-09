import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.svg';
 


const Logo = () => {
    return (
        <Tilt className="Tilt br2 shadow-2 resize" options={{ max : 55 }} >
            <div className="Tilt-inner pa3"> <img style={{paddingTop: '5px'}} src={brain} alt='brain' /> </div>
        </Tilt>
    )
}

export default Logo;