// import React, { useState } from 'react';

// const Stopwatch = () => {
//   const [timerOn, setTimerOn] = useState(false);
//   const [timerTime, setTimerTime] = useState(0);
//   const [timerStart, setTimerStart] = useState(0);
//   const timer = setInterval(() => {
//     setTimerTime(Date.now() - timerStart);
//   }, 100);

//   const startTimer = () => {
//     setTimerOn(true);
//     setTimerTime(timerTime);
//     setTimerStart(Date.now() - timerTime);
//     //timer();
//   };

//   const stopTimer = () => {
//     setTimerOn(false);
//     clearInterval(timer);
//   };
//   const seconds = (`0${Math.floor(timerTime / 1000) % 60}`).slice(-2);
//   const minutes = (`0${Math.floor(timerTime / 60000) % 60}`).slice(-2);
//   return (
//     <>
//     <div className="Stopwatch-display" style={{ color: 'white' }}>

//       {minutes}
//       {' '}
//       :
//       {seconds}
//     </div>

//     </>
//   );
// };

// export default Stopwatch;
