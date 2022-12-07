import React from 'react';

function ImagesPreview({ images }) {
  return (
    <div className='preview-container'>
      {images.length > 0 && images.map((img, i) => <img src={img} alt='img preview' key={i} className='preview-img' />)}
    </div>
  );
}

export default ImagesPreview;
