import React, { useState } from 'react';
import PenguinClock from "../assets/PenguinClock.png"

interface TimeInputWithImageProps {
    submit: () => void; // Define the 'submit' function as a prop
  }

const TimeInputWithImage: React.FC<TimeInputWithImageProps> = ({submit}) => {
  const [time, setTime] = useState<string>(''); // State to hold the selected time

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(event)
    submit(); // Call the submit function passed as a prop
  };


  return (
    <form onSubmit={handleSubmit}>
        <div className="time-input-with-image">
            <label htmlFor="time-input">
            <input 
                type="time" 
                id="time-input" 
                value={time} 
                onChange={handleTimeChange} 
                className='absolute scale-700 w-[30px] h-[30px] outline-2 rounded-4xl translate-x-40 translate-y-45 opacity-0 z-1'
                style={{ display: '' }} 
            >
            </input>
            <img 
                src={PenguinClock}
                alt="Time Picker"
                className="relative -translate-y-0  cursor-pointer z-0" 
            />
            </label>
            <p className='font-[Loker] text-[64px] translate-x-30 -translate-y-130'>{time}</p> 
        </div>
    </form>
  );
};

export default TimeInputWithImage;
