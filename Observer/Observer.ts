class Observer {
  clock;
  interval;
  targets = [];
  time;
  constructor({ lookEvery = 1, sleepAt = 4000, targets = [] }) {
    this.interval = lookEvery;
    this.time = lookEvery;
    this.wake(sleepAt);
    if (targets.length > 0) this.targets = targets;
  }
  wake(timeout) {
    this.clock = setInterval(() => {
      this._run();
      if (timeout && this.time > timeout) this._sleep();
      this.time = this.time + this.interval;
    }, this.interval);
  }
  _sleep() {
    clearInterval(this.clock);
    this.clock = null;
    console.log("sleeped");
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
          } else if (tg.lookOnce) this.targets.splice(i, 1);
          else console.log("not hit");
        });
      else {
        this._sleep();
      }
    } catch (error) {
      this._sleep();
    }
  }
}

export default Observer;
