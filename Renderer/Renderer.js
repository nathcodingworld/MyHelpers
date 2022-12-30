var Renderer = /** @class */ (function () {
    function Renderer(param) {
        if (param === void 0) { param = { media: { xxl: 1400, xl: 1200, lg: 992, md: 768, sm: 576 }, targets: [] }; }
        this.media = param.media;
        this.mediaCollection = param.targets;
    }
    Renderer.prototype.mediaQueries = function (queries) {
        var _this = this;
        queries.forEach(function (query) { return _this.mediaQuery(query); });
    };
    Renderer.prototype.mediaQuery = function (_a) {
        var query = _a.query, run = _a.run;
        var _b = query.split(":"), filter = _b[0], mq = _b[1];
        var windowWidth = window.innerWidth;
        var _c = mq.split("-"), min = _c[0], max = _c[1];
        switch (filter) {
            case "min":
                if (windowWidth >= this.media[mq])
                    run();
                break;
            case "max":
                if (windowWidth < this.media[mq])
                    run();
                break;
            case "between":
                if (windowWidth >= this.media[min] && windowWidth < this.media[max])
                    run();
                break;
            case "around":
                if (windowWidth < this.media[min] || windowWidth >= this.media[max])
                    run();
                break;
            default:
                console.log("not valid query", query);
                break;
        }
        return this;
    };
    Renderer.prototype.tableSpliter = function (_a) {
        var tableid = _a.tableid, tdFrom = _a.tdFrom, tdTo = _a.tdTo;
        var table = document.getElementById(tableid);
        var targetHeadTr = table.querySelector("thead > tr:not(.splitedtable thead tr)");
        var targetBodyTr = table.querySelectorAll("tbody > tr:not(.splitedtable tbody tr)");
        var splitedTh = cutter(targetHeadTr);
        targetBodyTr.forEach(function (tr) {
            var splitedTd = cutter(tr);
            var splitedTr = document.createElement("tr");
            splitedTr.innerHTML = "\n                <td colspan=".concat(tdTo - tdFrom + 1, ">\n                  <table class=\"table splitedtable\">\n                    <thead>\n                        <tr>\n                        ").concat(splitedTh.innerHTML, "\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr>\n                        ").concat(splitedTd.innerHTML, "\n                        </tr>\n                    </tbody>\n                  </table>\n                </td>\n             ");
            tr.insertAdjacentElement("afterend", splitedTr);
        });
        function cutter(tr) {
            var trow = document.createElement("tr");
            if (tr.childElementCount >= tdTo)
                for (var i = tdFrom - 1; i < tdTo; i++) {
                    trow.append(tr.children[tdFrom - 1]);
                }
            return trow;
        }
    };
    Renderer.prototype.displayToggler = function (target) {
        var _a = target.split(":"), selector = _a[0], display = _a[1];
        var element = document.querySelector(selector);
        if (element && display == "toggle") {
            if (element.style.display != "none")
                element.style.display = "none";
            else
                element.style.display = "block";
        }
        else if (element)
            element.style.display = display;
    };
    Renderer.prototype.classToggler = function (target) {
        var _a = target.split(":"), type = _a[0], current = _a[1], change = _a[2], selector = _a[3];
        var element = document.querySelector(selector);
        if (element && type == "toggle") {
            if (element.classList.contains(current)) {
                element.classList.remove(current);
                element.classList.add(change);
            }
            else {
                element.classList.remove(change);
                element.classList.add(current);
            }
        }
        else if (element) {
            element.classList.remove(current);
            element.classList.add(change);
        }
    };
    Renderer.prototype.getElement = function (target, parent) {
        if (parent === void 0) { parent = null; }
        var targetDocument = document;
        if (parent)
            targetDocument = parent;
        var _a = target.split(":"), type = _a[0], selector = _a[1];
        var element;
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
    };
    Renderer.prototype.setElement = function (_a) {
        var target = _a.target, set = _a.set, _b = _a.param, param = _b === void 0 ? {} : _b;
        var _c = target.split(":"), type = _c[0], selector = _c[1];
        var element;
        switch (type) {
            case "ByClass":
                element = document.querySelector("." + selector);
                if (element)
                    set(element, param);
                break;
            case "ById":
                element = document.getElementById(selector);
                if (element)
                    set(element, param);
                break;
            case "sByClass":
                element = document.querySelectorAll("." + selector);
                if (element.length > 0)
                    element.forEach(function (el) {
                        if (el)
                            set(el, param);
                    });
                break;
            case "BySelector":
                element = document.querySelector(selector);
                if (element)
                    set(element, param);
                break;
            case "sBySelector":
                element = document.querySelectorAll(selector);
                if (element.length > 0)
                    element.forEach(function (el) {
                        if (el)
                            set(el, param);
                    });
                break;
            default:
                return null;
        }
        return this;
    };
    Renderer.prototype.childPicker = function (parent, _a) {
        var target = _a.target;
        var childEl = this.getElement(target, parent);
        if (parent && childEl)
            parent.innerHTML = childEl.innerHTML;
    };
    return Renderer;
}());
