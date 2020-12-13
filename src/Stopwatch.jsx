import React, { useState, useEffect } from 'react';
import {
  Container,
} from '@material-ui/core';

const Stopwatch = (props) => {
  const { stopClock } = props;
  const [timerOn, setTimerOn] = useState(false);
  const [timerTime, setTimerTime] = useState(0);
  let timerStart = 0;
  const [timer, setTimer] = useState(null);
  const [count, setCount] = useState(0);

  const timerSetup = () => setInterval(() => {
    setTimerTime(Date.now() - timerStart);
  }, 1000);

  useEffect(() => {
    if (stopClock === false && count === 0) {
      timerStart = Date.now();
      onClick();
      setCount(1);
    } else if (stopClock === true && count === 1) {
      onClick();
      setCount(2);
    }
  })

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
    <Container style={{ backgroundColor: 'goldenrod', color: 'white' }}>
      <div className="Stopwatch-display" style={{ color: 'white' }}>

        {minutes}
        {' '}
        :
        {seconds}
      </div>
    </Container>
  );
};

export default Stopwatch;
