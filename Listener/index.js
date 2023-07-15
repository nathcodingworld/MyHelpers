const LN = new Listener();

LN.listens([
  {
    element: document.querySelector(".target"),
    instruction: "test:update",
    callback: (e) => {
      e.target.innerText = e.detail.message;
      e.target.style.color = "red";
    },
  },
  {
    instruction: "_test:add:all:.target",
    callback: (e) => {
      const div = document.createElement("div");
      div.style.color = "blue";
      div.innerText = e.detail.message;
      e.target.append(div);
    },
  },
  {
    element: document.getElementById("here"),
    instruction: ":click",
    callback: (e) => {
      LN.trigerEvent("test:update", {
        message: "success, print this",
      });
    },
  },
  {
    element: document.getElementById("add"),
    instruction: ":click",
    callback: (e) => {
      LN.trigerEvent(
        "_test:add",
        {
          message: "success, this is added1",
        },
        1
      );
    },
  },
  {
    element: document.getElementById("add2"),
    instruction: ":click",
    callback: (e) => {
      LN.trigerEvent(
        "_test:add",
        {
          message: "success, this is added",
        },
        0
      );
    },
  },
  {
    element: document.getElementById("add3"),
    instruction: "_gethis:click",
    callback: (e) => {
      LN.trigerEvents([
        ["_test:add", { message: "success, this is added" }, 0],
        ["_test:add", { message: "success, this is added" }, 1],
        ["_test:add", { message: "success, this is added" }, 2],
      ]);
    },
  },
  {
    element: document.getElementById("add4"),
    instruction: "_gethis:click:mouseenter" 
  },
  {
    element: document.getElementById("del"),
    instruction: ":click",
    callback: (e) => {
      LN.ignore("_test:add");
    },
  },
  {
    element: document.getElementById("del2"),
    instruction: ":click",
    callback: (e) => {
      LN.ignore("_test:add", 1);
    },
  },
  {
    element: document.getElementById("del3"),
    instruction: ":click",
    callback: (e) => {
      LN.ignore("_test:add", 2);
    },
  },
]);

// LN.listen('test:update', (e)=> {
//     e.target.innerText = e.detail.message
//     e.target.style.color = 'red'
// }, document.querySelector('.target'))

// LN.listen('test_:add:all:.target', (e)=> {
//     const div = document.createElement('div')
//     div.style.color = 'blue'
//     div.innerText = e.detail.message
//     e.target.append(div)
// })

// LN.listen(':click', (e)=> {
//     LN.trigerEvent('test:update', {
//         message: 'success, print this'
//     })
// }, document.getElementById('here'))

// LN.listen(':click', (e)=> {
//     LN.trigerEvent('test_1:add', {
//         message: 'success, this is added'
//     })
// }, document.getElementById('add'))

// LN.listen(':click', (e)=> {
//     LN.trigerEvent('test_0:add', {
//         message: 'success, this is added'
//     })
// } , document.getElementById('add2'))

// LN.listen(':click', (e)=> {
//     LN.trigerEvent('test_2:add', {
//         message: 'success, this is added'
//     })
// }, document.getElementById('add3'))

const test = {
  $asd_: ["01", "02"],
};
