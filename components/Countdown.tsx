'use client';

import { useEffect, useRef } from 'react';

interface TimerProps {
  initialTime: string;
  attr: string;
  label: string;
}

export function Countdown() {
  const countToDate = useRef(new Date().setHours(new Date().getHours() + 216));
  const previousTimeBetweenDates = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const timeBetweenDates = Math.ceil(
        (countToDate.current - currentDate.getTime()) / 1000
      );
      flipAllCards(timeBetweenDates);

      previousTimeBetweenDates.current = timeBetweenDates;
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 xs:grid-cols-4 md:gap-8">
      <Timer initialTime="8" attr="days" label="days" />
      <Timer initialTime="23" attr="hours" label="hours" />
      <Timer initialTime="55" attr="minutes" label="minutes" />
      <Timer initialTime="41" attr="seconds" label="seconds" />
    </div>
  );
}

function Timer({ initialTime, attr, label }: TimerProps) {
  return (
    <div className="flex flex-col gap-3 items-center md:gap-6">
      <div className="flip-card" data-timer={attr}>
        <span className="top">{initialTime.padStart(2, '0')}</span>
        <span className="bottom">{initialTime.padStart(2, '0')}</span>
      </div>
      <span className="uppercase text-indigo-400 text-[0.5rem] font-bold tracking-[0.3em] md:text-sm">
        {label}
      </span>
    </div>
  );
}

function flipAllCards(time: number) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600) % 24;
  const days = Math.floor(time / 86400) % 30;

  flip(document.querySelector('[data-timer="days"]')!, days);
  flip(document.querySelector('[data-timer="hours"]')!, hours);
  flip(document.querySelector('[data-timer="minutes"]')!, minutes);
  flip(document.querySelector('[data-timer="seconds"]')!, seconds);
}

function flip(flipCard: HTMLElement, newNumber: number) {
  const topHalf = flipCard.querySelector('.top')!;
  const startNumber = parseInt(topHalf.textContent!);
  if (newNumber === startNumber) return;

  const bottomHalf = flipCard.querySelector('.bottom')!;
  const topFlip = document.createElement('div');
  topFlip.classList.add('top-flip');
  const bottomFlip = document.createElement('div');
  bottomFlip.classList.add('bottom-flip');

  topHalf.textContent = startNumber.toString().padStart(2, '0');
  bottomHalf.textContent = startNumber.toString().padStart(2, '0');
  topFlip.textContent = startNumber.toString().padStart(2, '0');
  bottomFlip.textContent = newNumber.toString().padStart(2, '0');

  topFlip.addEventListener('animationstart', e => {
    topHalf.textContent = newNumber.toString().padStart(2, '0');
  });
  topFlip.addEventListener('animationend', e => {
    topFlip.remove();
  });
  bottomFlip.addEventListener('animationend', e => {
    bottomHalf.textContent = newNumber.toString().padStart(2, '0');
    bottomFlip.remove();
  });
  flipCard.append(topFlip, bottomFlip);
}
