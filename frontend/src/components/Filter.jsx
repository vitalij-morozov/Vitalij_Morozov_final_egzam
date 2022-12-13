import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterSettings } from '../store/generalStore';

function Filter() {
  const dispatch = useDispatch();

  const genders = ['male', 'female'];

  const cityRef = useRef();

  const [selected, setSelected] = useState(null);
  const [ageValue, setAgeValue] = useState(18);
  const [genderValue, setGenderValue] = useState(null);

  const handleFilter = () => {
    const settings = {
      filterCity: cityRef.current.value,
      filterGender: genderValue,
      filterAge: ageValue,
    };
    dispatch(setFilterSettings(settings));
    window.sessionStorage.removeItem('filterSettings');
    window.sessionStorage.setItem('filterSettings', JSON.stringify(settings));
  };

  return (
    <form className='filter-form'>
      <h2 className='form-title'>Filter</h2>
      <div className='input-container'>
        <label htmlFor='filter-city'>Select City: </label>
        <select ref={cityRef} name='city' id='filter-city'>
          <option value='vilnius'>Vilnius</option>
          <option value='kaunas'>Kaunas</option>
          <option value='klaipeda'>Klaipeda</option>
          <option value='siauliai'>Siauliai</option>
        </select>
      </div>
      <div className='input-container'>
        <label htmlFor='filter-gender'>Select Gender: </label>
        <div className='select-gender' id='filter-gender'>
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
        className='filter-btn'
      >
        SAVE FILTER
      </button>
    </form>
  );
}

export default Filter;
