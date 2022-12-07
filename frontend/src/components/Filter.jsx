import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilterSettings } from '../store/generalStore';

function Filter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const genders = ['male', 'female'];

  const cityRef = useRef();

  const [selected, setSelected] = useState(null);
  const [ageValue, setAgeValue] = useState(18);
  const [genderValue, setGenderValue] = useState(null);

  console.log('ageRef.current.value ===', ageValue);
  console.log('genderValue ===', genderValue);

  const handleFilter = () => {
    const settings = {
      filterCity: cityRef.current.value,
      filterGender: genderValue,
      filterAge: ageValue,
    };
    console.log('settings ===', settings);
    dispatch(setFilterSettings(settings));
    navigate('/');
  };

  return (
    <form className='filter-form'>
      <div className='input-container'>
        <label htmlFor='city'>Select City: </label>
        <select ref={cityRef} name='city'>
          <option value='vilnius'>Vilnius</option>
          <option value='kaunas'>Kaunas</option>
          <option value='klaipeda'>Klaipeda</option>
          <option value='siauliai'>Siauliai</option>
        </select>
      </div>
      <div className='input-container'>
        <label htmlFor=''>Select Gender: </label>
        <div className='select-gender'>
          {genders.map((gender, i) => (
            <button
              key={i}
              className={`select-gender-btn ${selected === i ? 'selected-btn' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setSelected(i);
                setGenderValue(gender);
              }}
            >
              {gender}
            </button>
          ))}
        </div>
        <div className='input-container'>
          <label htmlFor='age'>Select Age: </label>

          <div className='range'>
            <div className='range-input'>
              {' '}
              <span>18</span>
              <input
                type='range'
                name='age'
                min='18'
                max='55'
                defaultValue={18}
                onInput={(e) => setAgeValue(e.target.value)}
              />
              <span>55</span>
            </div>
            <span className='range-value'>{ageValue}</span>
          </div>
        </div>
      </div>
      <button
        type='submit'
        onClick={(e) => {
          e.preventDefault();
          handleFilter();
        }}
      >
        SAVE FILTER
      </button>
    </form>
  );
}

export default Filter;
