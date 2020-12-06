import React, { useEffect, useState } from 'react';
import {
  BottomNavigation,
  Button,
} from '@material-ui/core';

const Stopwatch = () => {
  const [timerOn, setTimerOn] = useState(false);
  const [timerTime, setTimerTime] = useState(0);
  let timerStart = 0;
  const [timer, setTimer] = useState(null);

  const timerSetup = () => setInterval(() => {
    setTimerTime(Date.now() - timerStart);
  }, 1000);
  useEffect(() => {
    timerStart = Date.now();
  });
  const onClick = () => {
    if (timerOn === false) {
      setTimer(timerSetup());
      setTimerOn(true);
    } else {
      clearInterval(timer);
      setTimerOn(false);
    }
  };

  const seconds = (`0${Math.floor(timerTime / 1000) % 60}`).slice(-2);
  const minutes = (`0${Math.floor(timerTime / 60000) % 60}`).slice(-2);
  return (
    <div style={{ backgroundColor: 'goldenrod', color: 'white' }}>
      <div className="Stopwatch-display" style={{ color: 'white' }}>

        {minutes}
        {' '}
        :
        {seconds}
      </div>
      <Button onClick={onClick} style={{ color: 'black' }}>
        start/stop
      </Button>
    </div>
  );
};

export default Stopwatch;

