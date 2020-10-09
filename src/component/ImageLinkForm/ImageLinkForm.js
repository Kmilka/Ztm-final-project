import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit, onReset }) => {
    return (
        <div>
            <p className='f4'>
                {'This magic brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='form pa4 br3 shadow-5'>
                    <input id='imageURL' className='f4 pa2 w-70 center' type='text' onChange={onInputChange} placeholder='put image URL here'  />
                    <button className='w-20 grow f4 link pv2 dib' onClick={onReset}>Clear</button>
                    <button className='w-20 grow f4 link pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;