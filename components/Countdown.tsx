'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface TimerProps {
  time: number;
  label: string;
}

const flipTopVariants: Variants = {
  exit: {
    position: 'absolute',
    zIndex: 10,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
    transformOrigin: 'bottom',
    rotateX: '90deg',
  },
};
const flipBottomVariants: Variants = {
  initial: {
    transformOrigin: 'top',
    rotateX: '90deg',
  },
  animate: {
    zIndex: 10,
    transition: {
      delay: 0.25,
      duration: 0.25,
      ease: 'easeIn',
    },
    rotateX: '0deg',
  },
  exit: {
    position: 'absolute',
    transition: {
      delay: 0.5,
      duration: 0,
    },
    opacity: 0,
  },
};

export function Countdown() {
  const endAt = useRef(new Date(Date.now() + 777_600_000));
  const { days, hours, minutes, seconds } = useCountdown(endAt.current);

  return (
    <div className="grid grid-cols-2 gap-4 xs:grid-cols-4 md:gap-8">
      <Timer time={days} label="days" />
      <Timer time={hours} label="hours" />
      <Timer time={minutes} label="minutes" />
      <Timer time={seconds} label="seconds" />
    </div>
  );
}

const Timer = memo(function Timer({ time, label }: TimerProps) {
  return (
    <div className="flex flex-col gap-3 items-center md:gap-6">
      <div className="w-timer md:w-timer-lg h-timer md:h-timer-lg relative shadow-timer md:shadow-timer-lg flex flex-col rounded-md">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={crypto.randomUUID()}
            variants={flipTopVariants}
            exit="exit"
            className="bg-indigo-800 w-full h-2/4 rounded-md overflow-hidden relative flex justify-center"
          >
            <span className="text-rose-300 font-bold text-4xl md:text-7xl leading-none absolute top-3.5 md:top-[2.125rem]">
              {time.toString().padStart(2, '0')}
            </span>
          </motion.div>
          <motion.div
            key={crypto.randomUUID()}
            variants={flipBottomVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-indigo-700 w-full h-2/4 rounded-md overflow-hidden relative flex justify-center"
          >
            <span className="text-rose-300 font-bold text-4xl md:text-7xl leading-none absolute bottom-3.5 md:bottom-[2.125rem]">
              {time.toString().padStart(2, '0')}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="uppercase text-indigo-400 text-[0.5rem] font-bold tracking-[0.3em] md:text-sm">
        {label}
      </span>
    </div>
  );
});

function useCountdown(endAt: Date) {
  const previousTimeBetweenDates = useRef(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const timeBetweenDates = Math.ceil(
        (endAt.getTime() - currentDate.getTime()) / 1000
      );

      const newSeconds = timeBetweenDates % 60;
      const newMinutes = Math.floor(timeBetweenDates / 60) % 60;
      const newHours = Math.floor(timeBetweenDates / 3600) % 24;
      const newDays = Math.floor(timeBetweenDates / 86400) % 30;

      setDays(newDays);
      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);

      previousTimeBetweenDates.current = timeBetweenDates;
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, [endAt]);

  return {
    seconds,
    minutes,
    hours,
    days,
  };
}
