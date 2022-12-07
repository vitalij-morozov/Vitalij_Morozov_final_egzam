import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/Profile/UserProfile';

function UserProfilePage() {
  const user = useSelector((state) => state.generalStore.user);

  const filter = useSelector((state) => state.generalStore.filterSettings);

  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  const handleStart = () => {
    if (images.length < 2) {
      alert('You need to add more images to start');
    } else {
    }
  };

  useEffect(() => {
    if (user && images.length === 0) setImages(user.images);
  }, [images.length, user]);
  console.log('images ===', images);

  useEffect(() => {
    if (user && user.images.length >= 2) {
      if (filter) {
        navigate('/');
      }
      // navigate('/filter');
    }
  }, []);
  console.log('profile ===', user);
  return (
    <div className='profile_container container page'>
      <UserProfile user={user} images={images} setImages={setImages} />
      <button onClick={handleStart}>Start Browsing!</button>
    </div>
  );
}

export default UserProfilePage;
