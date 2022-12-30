interface RendererParam {
  media: {
    xxl: number;
    xl: number;
    lg: number;
    md: number;
    sm: number;
  };
  targets: string[];
}

class Renderer {
  media;
  mediaCollection;
  constructor(param: RendererParam = { media: { xxl: 1400, xl: 1200, lg: 992, md: 768, sm: 576 }, targets: [] }) {
    this.media = param.media;
    this.mediaCollection = param.targets;
  }
  mediaQueries(queries) {
    queries.forEach((query) => this.mediaQuery(query));
  }
  mediaQuery({ query, run }) {
    const [filter, mq] = query.split(":");
    const windowWidth = window.innerWidth;
    const [min, max] = mq.split("-");
    switch (filter) {
      case "min":
        if (windowWidth >= this.media[mq]) run();
        break;
      case "max":
        if (windowWidth < this.media[mq]) run();
        break;
      case "between":
        if (windowWidth >= this.media[min] && windowWidth < this.media[max]) run();
        break;
      case "around":
        if (windowWidth < this.media[min] || windowWidth >= this.media[max]) run();
        break;
      default:
        console.log("not valid query", query);
        break;
    }
    return this;
  }
  tableSpliter({ tableid, tdFrom, tdTo }) {
    const table = document.getElementById(tableid);
    const targetHeadTr = table.querySelector("thead > tr:not(.splitedtable thead tr)");
    const targetBodyTr = table.querySelectorAll("tbody > tr:not(.splitedtable tbody tr)");
    const splitedTh = cutter(targetHeadTr);
    targetBodyTr.forEach((tr) => {
      const splitedTd = cutter(tr);
      const splitedTr = document.createElement("tr");
      splitedTr.innerHTML = `
                <td colspan=${tdTo - tdFrom + 1}>
                  <table class="table splitedtable">
                    <thead>
                        <tr>
                        ${splitedTh.innerHTML}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        ${splitedTd.innerHTML}
                        </tr>
                    </tbody>
                  </table>
                </td>
             `;
      tr.insertAdjacentElement("afterend", splitedTr);
    });
    function cutter(tr) {
      const trow = document.createElement("tr");
      if (tr.childElementCount >= tdTo)
        for (let i = tdFrom - 1; i < tdTo; i++) {
          trow.append(tr.children[tdFrom - 1]);
        }
      return trow;
    }
  }
  displayToggler(target) {
    const [selector, display] = target.split(":");
    const element = document.querySelector(selector);
    if (element && display == "toggle") {
      if (element.style.display != "none") element.style.display = "none";
      else element.style.display = "block";
    } else if (element) element.style.display = display;
  }
  classToggler(target) {
    const [type, current, change, selector] = target.split(":");
    const element = document.querySelector(selector);
    if (element && type == "toggle") {
      if (element.classList.contains(current)) {
        element.classList.remove(current);
        element.classList.add(change);
      } else {
        element.classList.remove(change);
        element.classList.add(current);
      }
    } else if (element) {
      element.classList.remove(current);
      element.classList.add(change);
    }
  }
  getElement(target, parent = null) {
    let targetDocument = document;
    if (parent) targetDocument = parent;
    const [type, selector] = target.split(":");
    let element;
    switch (type) {
      case "ByClass":
        element = targetDocument.querySelector("." + selector);
        return element;
      case "ById":
        element = targetDocument.getElementById(selector);
        return element;
      case "sByClass":
        element = targetDocument.querySelectorAll("." + selector);
        return element;
      case "BySelector":
        element = targetDocument.querySelector(selector);
        return element;
      case "sBySelector":
        element = targetDocument.querySelectorAll(selector);
        return element;
      default:
        return null;
    }
  }
  setElement({ target, set, param = {} }) {
    const [type, selector] = target.split(":");
    let element;
    switch (type) {
      case "ByClass":
        element = document.querySelector("." + selector);
        if (element) set(element, param);
        break;
      case "ById":
        element = document.getElementById(selector);
        if (element) set(element, param);
        break;
      case "sByClass":
        element = document.querySelectorAll("." + selector);
        if (element.length > 0)
          element.forEach((el) => {
            if (el) set(el, param);
          });
        break;
      case "BySelector":
        element = document.querySelector(selector);
        if (element) set(element, param);
        break;
      case "sBySelector":
        element = document.querySelectorAll(selector);
        if (element.length > 0)
          element.forEach((el) => {
            if (el) set(el, param);
          });
        break;
      default:
        return null;
    }
    return this;
  }
  childPicker(parent, { target }) {
    const childEl = this.getElement(target, parent);
    if (parent && childEl) parent.innerHTML = childEl.innerHTML;
  }
}
