class Listener {
  listens(events) {
    events.forEach((event) => this.listen(event));
  }
  listen({ toevent, callback, options = {}, control = false }) {
    const [event, type, selector] = toevent.split(":");

    switch (type) {
      case "all":
        const allElement = document.querySelectorAll(selector);
        if (allElement)
          allElement.forEach((el) => {
            el.addEventListener(event, callback, options);
          });
        break;
      case "one":
        const element = document.querySelector(selector);
        if (element) element.addEventListener(event, callback, options);
        break;
      case "":
        const idelement = document.getElementById(selector);
        if (idelement) idelement.addEventListener(event, callback, options);
        break;
      default:
        console.log("invalid Selector");
        break;
    }
    return this;
  }
  setEvent(element, { event, callback, options = {}, control = false }) {
    element.addEventListener(event, callback, options);
    return this;
  }
}
export default Listener;
