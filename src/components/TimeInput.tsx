import React, { useState } from 'react';
import PenguinClock from "../assets/PenguinClock.png"


interface TimeInputWithImageProps {
    onFormSubmit: (formData: string[]) => void;
  }

const TimeInputWithImage: React.FC<TimeInputWithImageProps> = ({onFormSubmit}) => {
  const [time, setTime] = useState<string>(''); 

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setTime(newTime);
    onFormSubmit([newTime]);
  };




  return (
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
  );
};

export default TimeInputWithImage;
