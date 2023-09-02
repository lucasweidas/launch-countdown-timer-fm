'use client';

import { useState } from 'react';

interface TimerProps {
  time: number;
  label: string;
}

export function Countdown() {
  const [days, setDays] = useState(8);
  const [hours, setHours] = useState(23);
  const [minutes, setMinutes] = useState(55);
  const [seconds, setSeconds] = useState(41);

  return (
    <div className="grid grid-cols-2 gap-4 xs:grid-cols-4 md:gap-8">
      <Timer time={days} label="days" />
      <Timer time={hours} label="hours" />
      <Timer time={minutes} label="minutes" />
      <Timer time={seconds} label="seconds" />
    </div>
  );
}

function Timer({ time, label }: TimerProps) {
  return (
    <div className="flex flex-col gap-3 items-center md:gap-6">
      <div className="flex items-center justify-center w-timer h-timer bg-indigo-700 rounded-md md:w-timer-lg md:h-timer-lg shadow-timer md:shadow-timer-lg">
        <span className="font-bold text-rose-300 text-3xl md:text-7xl">
          {time.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="uppercase text-indigo-400 text-[0.5rem] font-bold tracking-[0.3em] md:text-sm">
        {label}
      </span>
    </div>
  );
}
