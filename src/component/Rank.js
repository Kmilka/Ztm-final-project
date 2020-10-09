import React from 'react';

const Rank = ({ name, currentRank }) => {
    return (
        <div>
            <div className='white f3'>
                {`${name}, your current rank is `}
            </div>
            <div className='white f1'>
                {currentRank}
            </div>
        </div>
    )
}

export default Rank;