import React from 'react';
import {Link} from  "react-router-dom";

function Navbar() {
    return (
            <nav style={{position: 'absolute', top: 0, right: 0}}>
                <Link to="/signin" className=' black f4 underline pa3 pointer'>Sign In</Link>                        
                <Link to="/register" className= ' black f4 underline pa3 pointer'>Register</Link>
            </nav>
    )
}

export default Navbar;