import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ImArrowRight } from 'react-icons/im';

import ProfileImageForm from '../components/Profile/ProfileImageForm';
import UserProfile from '../components/Profile/UserProfile';

function UserProfilePage() {
  const user = useSelector((state) => state.generalStore.user);

  const filter = useSelector((state) => state.generalStore.filterSettings);

  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  const handleStart = () => {
    if (images.length < 2) {
      toast.warn('You need to add more images to start');
    } else {
      if (!filter) navigate('/filter');
      navigate('/');
    }
  };

  useEffect(() => {
    if (!user) navigate('/auth');
  }, [navigate, user]);

  useEffect(() => {
    if (user && images.length === 0) setImages(user.images);
  }, [images.length, user]);

  return (
    <div className='profile_container container page'>
      <UserProfile user={user} images={images} setImages={setImages} />
      <div className='set-images'>
        <ProfileImageForm setImages={setImages} images={images} />
        <button onClick={handleStart} className='start-btn'>
          Start Browsing!
          <span>
            <ImArrowRight />
          </span>
        </button>
      </div>

      <ToastContainer position='top-right' />
    </div>
  );
}

export default UserProfilePage;
