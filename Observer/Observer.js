class Observer {
  clock;
  interval;
  targets = [];
  time;
  constructor({ lookEvery = 1, sleepAt = 4000, targets = [] }) {
    this.interval = lookEvery;
    this.time = lookEvery;
    this.wake(sleepAt);
    this.targets = targets;
  }
  wake(timeout) {
    this.clock = setInterval(() => {
      if (timeout && this.time > timeout) clearInterval(this.clock);
      this._run();
      this.time = this.time + this.interval;
    }, this.interval);
  }
  _sleep() {
    console.log("sleeped");
    clearInterval(this.clock);
  }
  observe({ iftrue, dotask, sleepAt = 4000, lookOnce = false }) {
    this.targets.push({ iftrue, dotask, lookOnce });
    if (!this.clock) this.wake(sleepAt);
    return this;
  }
  _run() {
    try {
      if (this.targets.length > 0)
        this.targets.forEach((tg, i) => {
          if (tg.iftrue()) {
            console.log("hit");
            tg.dotask();
            this.targets.splice(i, 1);
          } 
          if (tg.lookOnce) this.targets.splice(i, 1); 
        });
      else  this._sleep(); 
    } catch (error) {
      this._sleep();
    }
  }
} 
