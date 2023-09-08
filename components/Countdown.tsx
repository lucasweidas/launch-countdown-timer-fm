'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface TimerProps {
  time: number;
  label: string;
}

const flipTopVariants: Variants = {
  initial: {
    zIndex: -10,
  },
  animate: {
    zIndex: 0,
  },
  exit: {
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
    transition: {
      delay: 0.55,
      duration: 0,
    },
    opacity: 0,
  },
};

const END_DATE = getEndDate();

export function Countdown() {
  const { days, hours, minutes, seconds, isRunning } = useCountdown(END_DATE);

  return (
    <>
      {isRunning ? (
        <div className="grid grid-cols-2 gap-4 xs:grid-cols-4 md:gap-8">
          <Timer time={days} label="days" />
          <Timer time={hours} label="hours" />
          <Timer time={minutes} label="minutes" />
          <Timer time={seconds} label="seconds" />
        </div>
      ) : (
        <EmbedVideo />
      )}
    </>
  );
}

const Timer = memo(function Timer({ time, label }: TimerProps) {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-6">
      <div className="relative isolate flex h-timer w-timer flex-col rounded-sm shadow-timer md:h-timer-lg md:w-timer-lg md:rounded-md md:shadow-timer-lg">
        <AnimatePresence initial={false}>
          <motion.div
            key={crypto.randomUUID()}
            variants={flipTopVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute left-0 top-0 flex h-2/4 w-full justify-center overflow-hidden rounded-t-sm bg-corner-t bg-corner-size bg-no-repeat md:rounded-t-md md:bg-corner-t-md"
          >
            <span className="absolute top-3.5 text-4xl font-bold leading-none text-rose-300 md:top-[2.125rem] md:text-7xl">
              {time.toString().padStart(2, '0')}
            </span>
          </motion.div>
          <motion.div
            key={crypto.randomUUID()}
            variants={flipBottomVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute bottom-0 left-0 flex h-2/4 w-full justify-center overflow-hidden rounded-b-sm bg-corner-b bg-corner-size bg-no-repeat md:rounded-b-md md:bg-corner-b-md"
          >
            <span className="absolute bottom-3.5 text-4xl font-bold leading-none text-rose-300 md:bottom-[2.125rem] md:text-7xl">
              {time.toString().padStart(2, '0')}
            </span>
          </motion.div>
        </AnimatePresence>
        <span className="w-[calc(100%-8px) absolute left-[6px] top-2/4 z-20 h-[1px] -translate-y-2/4 bg-indigo-800/40 md:w-[calc(100%-12px)]" />
      </div>
      <span className="text-[0.5rem] font-bold uppercase tracking-[0.3em] text-indigo-400 md:text-sm">
        {label}
      </span>
    </div>
  );
});

function EmbedVideo() {
  return (
    <div className="aspect-video w-full max-w-[700px] overflow-hidden">
      <iframe
        className="h-full w-full"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=r1Jxs4EYnOrAllnj?&autoplay=1"
        title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function useCountdown(endAt: Date) {
  const endDate = useRef(endAt);
  const previousTimeBetweenDates = useRef(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const localEndDate = getLocalEndDate();
    const timeDifference = localEndDate.getTime() - Date.now();

    endDate.current = localEndDate && timeDifference > 0 ? localEndDate : endAt;
    setLocalEndDate(endDate.current);

    const interval = setInterval(() => {
      const currentDate = new Date();
      const timeBetweenDates = Math.ceil(
        (endDate.current.getTime() - currentDate.getTime()) / 1000,
      );

      if (timeBetweenDates <= 0) {
        setIsRunning(false);
        clearInterval(interval);
        return;
      }

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
    isRunning,
  };
}

function getEndDate() {
  return new Date(Date.now() + 777_600_000);
}

function getLocalEndDate() {
  const endDate = localStorage.getItem('endDate');
  return endDate ? new Date(+endDate) : getEndDate();
}

function setLocalEndDate(endDate: Date) {
  localStorage.setItem('endDate', JSON.stringify(endDate.getTime()));
}
