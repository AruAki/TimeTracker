$ (() => {

  let hourCont = $ ( "#hour" );
  let minuteCont = $ ( "#minute" );
  let secondCont = $ ( "#second" );

  let startCont = $ ( "#startDate" );
  let endCont = $ ( "#endDate" );
  let hoursCont = $ ( "#hours" );
  let earnedCont = $ ( "#earned");
  startCont.val("");
  endCont.val("");
  hoursCont.val("");
  earnedCont.val("");

  let time = 0;

  let startTime = new Date();
  let endTime = new Date();

  function setTime(cont, value) {
    cont.html(`<span>${(value < 10) ? "0" + value : value}</span>`);
  }
  
  function setTitle(value) {
    document.title = value;
  }

  function setTimeBasedOnSeconds(seconds) {
    if(seconds < 60) { //Only seconds
      setTime(secondCont, seconds);
      setTime(minuteCont, 0);
      setTime(hourCont, 0);
      setTitle(`Time Tracker - 0h 0m ${seconds}s`);
    } else { 
      if (seconds < 3600) { //Minutes and Seconds
        let s = seconds % 60;
        let m = Math.floor(seconds / 60);
        setTime(secondCont, s);
        setTime(minuteCont, m);
        setTime(hourCont, 0);
        setTitle(`Time Tracker - 0h ${m}m ${s}s`);
      } else { //Hours, Minutes and Seconds
        let s = seconds % 60;
        let m = Math.floor((seconds / 60) % 60);
        let h = Math.floor((seconds / 60) / 60);
        setTime(secondCont, s);
        setTime(minuteCont, m);
        setTime(hourCont, h);
        setTitle(`Time Tracker - ${h}h ${m}m ${s}s`);
      }
    }
  }

  function displayTime(date, type) {
    let time = "";

    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    if (h > 12) {
      h -= 12;
      time = " PM";
    } else {
      time = " AM";
    }
    if (m < 10) {
      m = `0${m}`;
    }
    if (s < 10) {
      s = `0${s}`;
    }
    time = `${h}:${m}:${s}` + time;

    let mon = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    time += ` ${mon}/${day}/${year}`;
    
    if (type == "start") {
      startCont.val(time);
    } else if (type == "end") {
      endCont.val(time);
    } else if (type == "clear") {
      startCont.val("");
      endCont.val("");
    } else {
      console.error("Invalid type defined.");
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
    if (state === -1) {
      startTime = new Date();
      displayTime(startTime, "start");
    }

    if (state < 1) {
      counterInterval = setInterval( () => {
        time += 1;
        setTimeBasedOnSeconds(time);
        let hours = (time / 3600).toFixed(5);
        hoursCont.val(`${hours} Hours`);
        earnedCont.val(`$${(hours * 30).toFixed(4)}`);
      }, 1000 );

      state = 1;
    }
  }

  function pause() {
    if (state > 0) {
      clearInterval( counterInterval );
      endtime = new Date();
      displayTime(endtime, "end");
      state = 0;
    }
  }

  function reset() {
    clearInterval( counterInterval );
    time = 0;
    setTimeBasedOnSeconds(0);
    displayTime(new Date(), "clear");
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