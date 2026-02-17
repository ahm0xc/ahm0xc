"use client";

import * as React from "react";

const Clock: React.FC = () => {
  function checkTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hoursAngle = hours * (360 / 12);
    const minutesAngle = minutes * 6;
    const secondsAngle = seconds * 6;

    const hoursHand = document.getElementById("clock-hours-hand");
    const minutesHand = document.getElementById("clock-minutes-hand");
    const secondsHand = document.getElementById("clock-seconds-hand");

    if (hoursHand && minutesHand && secondsHand) {
      hoursHand.style.transform = `rotate(${hoursAngle}deg)`;
      minutesHand.style.transform = `rotate(${minutesAngle}deg)`;
      secondsHand.style.transform = `rotate(${secondsAngle}deg)`;
    }
  }

  React.useEffect(() => {
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <svg
        width="25"
        height="25"
        viewBox="-15 -15 30 30"
        xmlns="http://www.w3.org/2000/svg"
        className="clock"
      >
        <circle
          cx="0"
          cy="0"
          r="14"
          className="fill-none stroke-foreground stroke-1"
          id="clock-frame"
        />
        <path
          d="M 0 0 L 0 -12 Z"
          className="fill-none stroke-foreground/50 stroke-[0.75px]"
          id="clock-seconds-hand"
        />
        <path
          d="M 0 0 L 0 -8 Z"
          className="fill-none stroke-foreground/80 stroke-1"
          id="clock-minutes-hand"
        />
        <path
          d="M 0 0 L 0 -6 Z"
          className="fill-none stroke-foreground stroke-1"
          id="clock-hours-hand"
        />
      </svg>
    </div>
  );
};

export default Clock;
