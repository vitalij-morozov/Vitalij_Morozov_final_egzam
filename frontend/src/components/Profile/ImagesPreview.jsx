import React from 'react';

function ImagesPreview({ images }) {
  return (
    <div className='preview-container'>
      {images.length > 0 ? (
        images.map((img, i) => <img src={img} alt='img preview' key={i} className='preview-img' />)
      ) : (
        <img src='https://img.freepik.com/free-icon/man_318-677829.jpg?w=2000' alt='default img' />
      )}
    </div>
  );
}

export default ImagesPreview;
