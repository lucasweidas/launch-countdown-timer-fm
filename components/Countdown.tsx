'use client';

import { useState } from 'react';

interface TimerBoxProps {
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
      <TimerBox time={days} label="days" />
      <TimerBox time={hours} label="hours" />
      <TimerBox time={minutes} label="minutes" />
      <TimerBox time={seconds} label="seconds" />
    </div>
  );
}

function TimerBox({ time, label }: TimerBoxProps) {
  return (
    <div className="flex flex-col gap-3 items-center md:gap-6">
      <div className="flex items-center justify-center w-[4.25rem] h-16 bg-indigo-700 rounded-md md:w-[9.25rem] md:h-[8.75rem]">
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
