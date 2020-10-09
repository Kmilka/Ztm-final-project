import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, box }) => {
    return (
        box[0] ?
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='imageinput' src={imageURL} alt='img' width='500px' height='auto'/>
                <div>
                    {Object.entries(box).map((box, index) => {
                        return (
                            <div key={index}
                                className='bounding-box' 
                                style={{
                                    top: box[1].topRow, 
                                    right: box[1].rightCol, 
                                    bottom: box[1].bottomRow, 
                                    left: box[1].leftCol
                                }}
                            ></div>)
                    })}
                </div>
            </div>
        </div> :
        imageURL ?
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='imageinput' src={imageURL} alt='img' width='500px' height='auto'/>
            </div>
        </div> :
        null
    )
}

export default FaceRecognition;