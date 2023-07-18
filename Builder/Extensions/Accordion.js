function Accordion(builder, { name, noshadow = false, style }) {
  const { customElement, customComponent } = builder
  customElement({
    style: {
      display: "block",
    },
    template: {
      name: name,
      attributes: [],
      element: HTMLElement,
      body: "",
    },
  });
  customComponent({
    style: style,
    template: {
      noshadow: noshadow,
      name: name + "-item",
      root: '<style>.accordion{display:flex;justify-content:space-between;align-items:center;cursor:pointer;width:100%;text-align:left;border:none;outline:0;transition:.4s;margin:0}.accordion:after{float:right}.panel{background-color:#f6f6f6;margin-bottom:15px;max-height:0;overflow:hidden;transition:max-height .2s ease-out}</style><style id=pastehere></style><div><button class=accordion></button><div class=panel><slot></slot></div></div>',
    },
    script: {
      onMount: (root) => {
        let showInfo = false;
        root.shadow.querySelector("button").innerText =
          root.getAttribute("head-title");
        const button = root.shadow.querySelector("button");
        const panel = root.shadow.querySelector(".panel");
        button.addEventListener("click", () => {
          showInfo = !showInfo; 
          if (showInfo) {
            button.classList.add("clicked");
            panel.style.maxHeight = panel.scrollHeight + "px";
          } else {
            button.classList.remove("clicked");
            panel.style.maxHeight = 0;
          }
        });
      },
    },
  });
}
