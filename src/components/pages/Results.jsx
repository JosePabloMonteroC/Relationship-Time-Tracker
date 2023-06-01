import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);

  const searchParams = new URLSearchParams(location.search);
  const formattedDate = searchParams.get('date');

  const selectedDate = new Date(formattedDate);
  const currentDate = new Date();

  const yearsDiff = currentDate.getFullYear() - selectedDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - selectedDate.getMonth();
  const totalMonths = yearsDiff * 12 + monthsDiff;
  const correctYearsDiff = Math.floor(totalMonths / 12);
  const correctMonthsDiff = totalMonths % 12;

  const daysDiff = Math.floor((currentDate - selectedDate) / (1000 * 60 * 60 * 24));
  const hoursDiff = Math.floor((currentDate - selectedDate) / (1000 * 60 * 60));
  const minutesDiff = Math.floor((currentDate - selectedDate) / (1000 * 60));
  const secondsDiff = Math.floor((currentDate - selectedDate) / 1000);

  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const handleReturn = () => {
    navigate('/relationship-time-tracker/');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='card'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='66'
        height='66'
        fill='currentColor'
        className='bi bi-arrow-through-heart-fill'
        viewBox='0 0 16 16'
      >
        <path
          fillRule='evenodd'
          d='M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354l-1.5 1.5ZM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A23.825 23.825 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a8.827 8.827 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5v3Z'
        />
      </svg>
      <h1>Results</h1>
      <p>OMG! You've been together since:</p>
      <h3>{formatDate(formattedDate)}</h3>
      <p>That's {correctYearsDiff} Years & {correctMonthsDiff} Months!</p>
      <p>Meaning you have been together for {totalMonths.toLocaleString()} months!</p>
      <p>{daysDiff.toLocaleString()} days!</p>
      <p>{hoursDiff.toLocaleString()} hours,</p>
      <p>{minutesDiff.toLocaleString()} minutes,</p>
      <p>And {secondsDiff.toLocaleString()} seconds!</p>
      <button className='btn btn-primary' onClick={handleReturn}>
        Return
      </button>
    </div>
  );
};
