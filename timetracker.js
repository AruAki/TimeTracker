$ (() => {

  let hourCont = $ ( "#hour" );
  let minuteCont = $ ( "#minute" );
  let secondCont = $ ( "#second" );

  let time = 0;

  let startTime = new Date();
  let endTime = new Date();

  function setTime(cont, value) {
    cont.html(`<span>${(value < 10) ? "0" + value : value}</span>`);
  }

  function setTimeBasedOnSeconds(seconds) {
    if(seconds < 60) { //Only seconds
      setTime(secondCont, seconds);
      setTime(minuteCont, 0);
      setTime(hourCont, 0);
    } else { 
      if (seconds < 3600) { //Minutes and Seconds
        let s = seconds % 60;
        let m = Math.floor(seconds / 60);
        setTime(secondCont, s);
        setTime(minuteCont, m);
        setTime(hourCont, 0);
      } else { //Hours, Minutes and Seconds
        let s = seconds % 60;
        let m = Math.floor((seconds / 60) % 60);
        let h = Math.floor((seconds / 60) / 60);
        setTime(secondCont, s);
        setTime(minuteCont, m);
        setTime(hourCont, h);
      }
    }
  }

  //Button Control Functions
  let counterInterval = null;
  let state = -1; //Defines the current state of the timeTracker.
  //State
  //-1: After reset, when the user presses play we should set the startTime to be the current date.
  //0: timeTracker Paused.
  //1: timeTracker Counting.
  function play() {
    //If this is the first time pressing play after a reset, set starttime
    if (state < 1) {
      counterInterval = setInterval( () => {
        time += 1;
        setTimeBasedOnSeconds(time);
      }, 1000 );

      state = 1;
    }
  }

  function pause() {
    if (state > 0) {
      clearInterval( counterInterval );
      endtime = new Date();
      state = 0;
    }
  }

  function reset() {
    clearInterval( counterInterval );
    time = 0;
    setTimeBasedOnSeconds(0);
    state = -1;
  }


  //Button Click Event Listeners
  $ ( "#play" ).on("click", () => {
    play();
  });
  $ ( "#pause" ).on("click", () => {
    pause();
  });
  $ ( "#reset" ).on("click", () => {
    reset();
  });
});